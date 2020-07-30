# -*- coding: utf-8 -*-
"""This module contains the dialogue states for the 'greeting' domain
in the MindMeld home assistant blueprint application
"""
from .root import app

@app.handle(domain='day_planning', intent='start_planning')
def start_planning(request, responder):
    if responder.frame['day_planning'] == None:
        # Initialise domain frame if uninitialised
        responder.frame['day_planning'] == {}
    else:
        try:
            responder.slots['day'] = request.context.get('day', 'today')