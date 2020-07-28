# -*- coding: utf-8 -*-
"""This module contains the dialogue states for the 'greeting' domain
in the MindMeld home assistant blueprint application
"""
from .root import app

@app.dialogue_flow(domain='greeting', intent='greet')
def welcome(request, responder):
    try:
        name = responder.slots['name']
        response = 'Hello, '+ name +'. Its me Yoru. How can I help you?'
    except KeyError:
        responder.reply('Hello. Welcome aboard Oceanic Symphony, I am your assistant YORU. What can i call you?')
        responder.listen()
        responder.params.target_dialogue_state = 'get_user_name'
    responder.listen()

@app.handle(targeted_only=True)
def get_user_name(request, responder):
    try:
        name = response.context['name']
    except KeyError:
        name = request.text
    responder.slots['name'] = name
    responder.reply('Nice to meet you,  {name}. How can I help you?')



@app.handle(intent='exit')
def say_bye(request, responder):
    try:
        name = responder.slots['name']
    except:
        name = ''
    responder.reply('Good Bye.', 'See ya.', 'Bye '+ name +', have a good day.', 'Bye bye!', 'See you soon.', 'Untill next time!', 'It was nice seeing you')
