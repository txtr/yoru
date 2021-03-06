# -*- coding: utf-8 -*-
"""
This module contains the dialogue states for the 'greeting' domain
in the MindMeld home assistant blueprint application
"""
from .root import app

def clean_cb_frame(responder):
    frame_keys = ['cabin_tier', 'deck_id']
    for frame_key in frame_keys:
        del responder.frame[frame_key]
    return responder

def get_availability(cabin_tier, deck_pref):
    print(cabin_tier, deck_pref)
    cabins = app.question_answerer.get(index='cabins', available="True")
    print(cabins)
    available_cabins = []
    for cabin in cabins:
        if cabin["cabin_type"]["name"] == cabin_tier and cabin["deck_side"] == deck_pref:
            print(cabin)
            available_cabins.append(cabin)
    return available_cabins

@app.dialogue_flow(domain='cabin_booking', intent='book_cabin')
def cb_book_cabin(request, responder):
    cabin_tier_entity = next((e for e in request.entities if e['type'] == 'cabin_tier'), None)
    if cabin_tier_entity:
        try:
            cabin_tiers = app.question_answerer.get(index='cabin_tiers', id=cabin_tier_entity['value']['id'])
        except TypeError:
            # failed to resolve entity
            cabin_tiers = app.question_answerer.get(index='cabin_tiers', name=cabin_tier_entity['text'])
        try:
            cabin_tier = cabin_tiers[0]
            responder.frame['cabin_tier'] = cabin_tier
        except:
            cabin_tier = None
            pass
    elif 'cabin_tier' in responder.frame:
        cabin_tier = responder.frame['cabin_tier']
    else:
        cabin_tier = None

    deck_entity = next((e for e in request.entities if e['type'] == 'deck'), None)
    if deck_entity:
        try:
            deck_id = deck_entity['value'][0]['id']
            if deck_id == 1:
                responder.slots['deck_pref'] = 'Starboard'
            elif deck_id == 2:
                responder.slots['deck_pref'] = 'Portside'
            responder.frame['deck_id'] = deck_id
        except Exception as e:
            deck_id = None
    elif 'deck_id' in responder.frame:
        deck_id = responder.frame['deck_id']
    else:
        deck_id = None

    if cabin_tier and deck_id:
        responder.slots['cabin_tier'] = cabin_tier['name']
        reply = 'Looking for availability in {cabin_tier} tier and with {deck_pref} deck side'
        available_cabins = get_availability(responder.slots['cabin_tier'], responder.slots['deck_pref'])
        print(available_cabins)
        if (available_cabins):
            reply += '\nYes, {cabin_tier} cabin and with {deck_pref} deck side is available.'
            reply += '\nHeres the list of available cabins that suit your preference:'
            index = 1
            for cabin in available_cabins:
                reply += '\n'+str(index) + '. ' + cabin['cabin_no'] + '\n'+cabin['image']
                index = index + 1
            reply += '\nYou can book your preferred cabin from the Passenger Assistance Booth near Casino'
            responder.reply(reply)
            responder.frame['destination_loc'] = 'Casino Royale'
        else:
            responder.reply('Sorry, {cabin_tier} cabin and with {deck_pref} deck side is not available')
        clean_cb_frame(responder)
        responder.exit_flow()
    elif cabin_tier:
        responder.reply('Please specify your prefered deck side. Deck preferences are Port ie. Left Side and Star ie. Right Side.')
    elif deck_id:
        responder.reply('Please specify if you would like to book? Say "List all cabin iters" to get list of tiers.')
    else:
        responder.reply('Please specify if you would like to book? Say "List all cabin iters" to get list of tiers.')
    responder.listen()


@cb_book_cabin.handle(intent='book_cabin')
def cb_book_cabin_via_flow(request, responder):
    cb_book_cabin(request, responder)

@cb_book_cabin.handle(intent='list_cabin_tiers')
def cb_list_cabin_tiers_via_flow(request, responder):
    cb_list_cabin_tiers(request, responder)

@cb_book_cabin.handle(intent='list_deck')
def cb_list_deck_via_flow(request, responder):
    cb_list_deck(request, responder)

@cb_book_cabin.handle(default=True)
def cb_book_cabin_via_flow_default(request, responder):
    try:
        responder.frame['count'] += 1
    except:
        responder.frame['count'] = 0
    if responder.frame['count'] <= 2:
        responder.reply('Sorry, I did not get you. You can try saying "book ticket", if you want to try again.')
        responder.listen()
    else:
        responder.reply('Sorry I dont know what you meant there. Please try "list cabin types" or "list deck preferences". You can say "exit" ')
        clean_cb_frame(responder)
        responder.exit_flow()

@app.handle(domain='cabin_booking', intent='list_cabin_tiers')
def cb_list_cabin_tiers(request, responder):
    cabin_tier_names = [x['name'] for x in app.question_answerer.get(index='cabin_tiers')]
    reply = 'Here you go, these are all tier types of cabin:'
    index = 1
    for cabin_tier_name in cabin_tier_names:
        reply = reply + '\n'+ str(index) + '. ' + cabin_tier_name
        index = index + 1
    responder.reply(reply)
    responder.listen()

@app.handle(domain='cabin_booking', intent='list_deck')
def cb_list_deck(request, responder):
    cabin_tier_names = app.question_answerer.get(index='cabin_tiers')
    reply = ['Deck preferences are Port ie. Left Side and Star ie. Right Side.']
    responder.reply(reply)
    responder.listen()
