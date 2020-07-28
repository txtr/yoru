# -*- coding: utf-8 -*-
"""This module contains the dialogue states for the 'greeting' domain
in the MindMeld home assistant blueprint application
"""
from .root import app

@app.dialogue_flow(domain='greeting', intent='greet')
def welcome(request, responder):
    try:
        name = responder.slots['name']
        responder.reply('Hello, { name }. Its me Yoru. How can I help you?')
    except KeyError:
        responder.reply('Hello. Welcome aboard Oceanic Symphony, I am your assistant YORU. What can i call you?')
        responder.params.target_dialogue_state = 'get_user_name'
    responder.listen()

@app.handle(targeted_only=True)
def get_user_name(request, responder):
    try:
        responder.slots['name'] = responder.context['name']
    except KeyError:
        responder.slots['name'] = request.text
    responder.reply('Nice to meet you,  {name}. How can I help you?')


@app.handle(intent='exit')
def say_bye(request, responder):
    try:
        name = responder.slots['name']
    except:
        name = ''
    responder.reply('Bye '+ name +', have a good day.')
    # responder.reply('Good Bye.', 'See ya.', 'Bye '+ name +', have a good day.', 'Bye bye!', 'See you soon.', 'Untill next time!', 'It was nice seeing you')
