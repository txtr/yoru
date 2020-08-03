from mindmeld.components import QuestionAnswerer
qa = QuestionAnswerer('.')
qa.load_kb('yoru', 'menu_items', './data/menu_items.json', clean=True)
qa.load_kb('yoru', 'restaurants', './data/restaurants.json', clean=True)
qa.load_kb('yoru', 'cabins', './data/cabins.json', clean=True)
qa.load_kb('yoru', 'cabin_tiers', './data/cabin_tiers.json', clean=True)
qa.load_kb('yoru', 'events', './data/events.json', clean=True)
print('Loaded kb')
