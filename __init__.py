# -*- coding: utf-8 -*-
"""This module contains a template MindMeld application"""
from yoru.root import app
import yoru.greeting_handler
import yoru.food_ordering_handler
import yoru.cabin_booking_handler
# import yoru.day_planner_handler
__all__ = ['app']


# @app.handle(default=True)
# def default(request, responder):
#     """This is a default handler."""
#     responder.reply('GLOBAL DEFAULT HANDLER REACHED.')
