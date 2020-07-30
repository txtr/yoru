# -*- coding: utf-8 -*-
"""This module contains the dialogue states for the 'greeting' domain
in the MindMeld home assistant blueprint application
"""
from .root import app

@app.handle(intent='greet')
def welcome(request, responder):
    if request.frame.get('name') == None:
        responder.reply('Hello. Welcome aboard Oceanic Symphony, I am your assistant YORU. What can i call you?')
        responder.params.target_dialogue_state = 'get_user_name'
    else:
        responder.slots['name'] = request.frame.get('name')
        responder.reply('Hello, {name}. Its me Yoru. How can I help you?')
    responder.listen()

@app.handle(targeted_only=True)
def get_user_name(request, responder):
    responder.slots['name'] = request.text
    responder.frame['name'] = responder.slots['name']
    responder.reply('Nice to meet you, {name}. How can I help you?')


@app.handle(intent='exit')
def say_bye(request, responder):
    if request.frame.get('name') == None:
        responder.slots['name'] = ''
    else:
        responder.slots['name'] = request.frame.get('name')
    responder.reply('Bye {name}, have a good day.')
    # responder.reply('Good Bye.', 'See ya.', 'Bye '+ name +', have a good day.', 'Bye bye!', 'See you soon.', 'Untill next time!', 'It was nice seeing you')
