# -*- coding: utf-8 -*-
"""
This module contains the dialogue states for the 'greeting' domain
in the MindMeld home assistant blueprint application
"""
from .root import app

def clean_cb_frame(responder):
    frame_keys = ['cabin_tier', 'deck_side_pref']
    for frame_key in frame_keys:
        del responder.frame[frame_key]
    return responder

@app.handle(domain='cabin_booking', intent='book_cabin')
def cb_book_cabin(request, responder):
    if request.frame.get('cabin_tier'):
        responder.slots['cabin_tier'] = request.frame.get('cabin_tier')
        if request.frame.get('deck_side_pref'):
            responder.slots['deck_side_pref'] = request.frame.get('deck_side_pref')
            responder.reply('Looking for availability in {cabin_tier} tier and with {deck_side_pref} deck side.')
            # TODO check for availability in knowledge base
            cabin_availability = True
            if cabin_availability == True:
                responder.reply('Yes, the room with {cabin_tier} tier and with {deck_side_pref} deck side is available.'
                'You can make your payment and confirm your booking at Passenger Assistance Booth near Sunshine Casino.'
                'Thank You.')
                responder = clean_cb_frame(responder)
            else:
                responder.reply('Sorry, the room with {cabin_tier} tier and with {deck_side_pref} deck side is not available. But you can try again some time later.')
                responder = clean_cb_frame(responder)
        else:
            responder.reply('Which deck would you prefer in {cabin_tier} tier?')
            responder.listen() # Might be better to use dynamic gazateer with dialogue flow
    else:
        responder.reply('Sure, which cabin tier would you like to book?')
        responder.listen()

@app.handle(domain='cabin_booking', intent='start_over')
def cb_start_over(request, responder):
    responder = clean_cb_frame(responder)
    responder.reply('Okay, lets start again. What is your cabin and deck preference?')
    responder.listen()


@app.handle(domain='cabin_booking', intent='list_cabin_tiers')
def cb_list_cabin_tiers(request, responder):
    cabin_tier_names = app.question_answerer.get(index='cabin_tiers')
    reply = 'Here you go, these are all tier types of cabin:'
    index = 1
    for cabin_tier_name in cabin_tier_names:
        reply = reply + '\n'+ index + '. ' + cabin_tier_name
    responder.reply(reply)
    responder.listen()


@app.handle(domain='cabin_booking', intent='list_cabin_tiers')
def cb_list_cabin_tiers(request, responder):
    cabin_tier_names = app.question_answerer.get(index='cabin_tiers')
    reply = 'Here you go, these are all tier types of cabin:'
    index = 1
    for cabin_tier_name in cabin_tier_names:
        reply = reply + '\n'+ index + '. ' + cabin_tier_name
    responder.reply(reply)
    responder.listen()

@app.handle(domain='cabin_booking', intent='list_deck_side_pref')
def cb_list_cabin_tiers(request, responder):
    cabin_tier_names = app.question_answerer.get(index='cabin_tiers')
    reply = ['Deck preferences are Port ie. Left Side and Star ie. Right Side.']
    responder.reply(reply)
    responder.listen()
