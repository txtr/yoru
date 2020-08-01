# -*- coding: utf-8 -*-
from .root import app
import json


@app.handle(domain='locations', intent='navigation', has_entity='location')
def navigation(request, responder):
    location_entities = [e for e in request.entities if e['type'] == 'location']
    for location_entity in location_entities:
        if(location_entity['role'] == 'source'):
            try:
                responder.frame['source_loc'] = location_entity['value'][0].get('cname')
            except IndexError:
                responder.frame['source_loc'] = location_entity['text']
                responder.reply("Sorry couldn't find location {source_loc}")
                responder.listen()
                return
        if(location_entity['role'] == 'destination'):
            try:
                responder.frame['destination_loc'] = location_entity['value'][0].get('cname')
            except:
                responder.frame['destination_loc'] = location_entity['text']
                responder.reply("Sorry couldn't find location {destination_loc}")
                responder.listen()
                return
    
    if(not responder.frame.get('destination_loc') and request.frame.get('destination_loc')):
        responder.frame['destination_loc'] = request.frame.get('destination_loc')

    if(not responder.frame.get('source_loc') and request.frame.get('source_loc')):
        responder.frame['source_loc'] = request.frame.get('source_loc')

    if(responder.frame.get('source_loc') and responder.frame.get('destination_loc')):
        responder.slots['source'] = responder.frame.get('source_loc')
        responder.slots['destination'] = responder.frame.get('destination_loc')
        responder.reply(getRouteString(responder.slots['source'],responder.slots['destination']))
        del responder.frame['source_loc']
        del responder.frame['destination_loc']

    elif(responder.frame.get('source_loc')):
        responder.slots['source_loc'] = responder.frame.get('source_loc')
        responder.reply("Where do you want to go from {source_loc}?")

    elif(responder.frame.get('destination_loc')):
        responder.slots['destination'] = responder.frame.get('destination_loc')
        responder.reply("Your destination is {destination}.\nWhere are you right now?")
 

def getRouteString(sourceLocation, destinationLocation):
    print(sourceLocation, destinationLocation)
    with open('./yoru/map_data/location.json') as f:
        location = json.load(f)
    with open('./yoru/map_data/route.json') as f:
        route = json.load(f)
    try:
        sourceLobby = location[sourceLocation]["lobby"]
        destinationLobby = location[destinationLocation]["lobby"]
    except:
        return "please select from available locations" + _get_all_location(location)
    if sourceLocation == destinationLocation :
        return "You are already at desired location"
    elif (sourceLobby == destinationLobby):
        return "Use " + sourceLobby + " to get to " + destinationLocation
    else:
        if len(route[sourceLobby][destinationLobby]) == 0:
            return "Using " + sourceLobby + " get to " + destinationLobby + " to find " + destinationLocation
        if len(route[sourceLobby][destinationLobby]) == 1:
            return "Using " + sourceLobby + " get to " + route[sourceLobby][destinationLobby][0] +" and then go through " + destinationLobby + " to find " + destinationLocation
        if len(route[sourceLobby][destinationLobby]) == 2:
            return "First get into " + sourceLobby + "\nthen move Forward towards " + route[sourceLobby][destinationLobby][0] + "\nthen use " + route[sourceLobby][destinationLobby][1] + "\nand " + destinationLobby + "\nto find " + destinationLocation
        else:
            return "please select from available locations" + _get_all_location(location)


def _get_all_location(location):
    if not location:
        with open('./yoru/map_data/location.json') as f:
            location = json.load(f)
    all_location = []
    for (typ, lobby) in location.items():
        if typ not in all_location:
            all_location.append(typ)
    return '\n'.join([loc for loc in all_location])
