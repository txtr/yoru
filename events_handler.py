from .root import app

@app.handle(domain='events',intent='events_show')
def events_show(request, responder):
    reply = 'Heres the list of events:'
    events = app.question_answerer.get(index='events')
    event_names = set([event['name'] for event in events])
    index=1
    for event_name in event_names:
        reply += '\n' + str(index) + '. ' + event_name
        index = index + 1 
    responder.reply(reply)
    responder.listen()

@app.handle(domain='events', intent='event_details')
def event_details(request, responder):
    selected_event = request.frame.get('event')
    event_entity = next((e for e in request.entities if e['type'] == 'event'), None)

    if(event_entity):
        if len(event_entity['value']) > 0:
            selected_event = _kb_fetch('events', event_entity['value'][0]['id'])
            responder.frame['event'] = selected_event
            responder.frame['location'] = selected_event['venue']
        else:
            responder.slots['event_name'] = restaurant_entity['text']
            responder.reply("Sorry, I could not find a event called {event_name}. type show events to see all events")
            return
    if selected_event:
        responder.slots['event_details'] = selected_event['details']
        responder.slots['event_name'] = selected_event['name']
        responder.reply("Here are details of {event_name}:\n{event_details}")
        responder.listen()
        return
    responder.reply("Can't understand can you be more specific about which event")
    

@app.handle(domain='events', intent='events_timings')
def events_timings(request, responder):
    selected_event = request.frame.get('event')
    event_entity = next((e for e in request.entities if e['type'] == 'event'), None)

    if(event_entity):
        if len(event_entity['value']) > 0:
            selected_event = _kb_fetch('events', event_entity['value'][0]['id'])
            responder.frame['event'] = selected_event
            responder.frame['location'] = selected_event['venue']
        else:
            responder.slots['event_name'] = restaurant_entity['text']
            responder.reply("Sorry, I could not find a event called {event_name}. type show events to see all events")
            return
    if selected_event:
        responder.slots['event_time'] = selected_event['time']
        responder.slots['event_date'] = selected_event['date']
        responder.slots['event_name'] = selected_event['name']
        responder.reply("Here is the timing of {event_name}:\n{event_time}\n{event_date}")
        return
    responder.reply("Can't understand can you be more specific about which event")

def _kb_fetch(kb_index, kb_id):
    return app.question_answerer.get(index=kb_index, id=kb_id)[0]
        
