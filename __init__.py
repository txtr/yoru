# -*- coding: utf-8 -*-
"""This module contains a template MindMeld application"""
from yoru.root import app
import yoru.greeting_handler
__all__ = ['app']


@app.handle(default=True)
def default(request, responder):
    """This is a default handler."""
    responder.reply('DEFAULT HANDLER REACHED.')
