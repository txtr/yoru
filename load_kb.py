from mindmeld.components import QuestionAnswerer
qa = QuestionAnswerer('.')
qa.load_kb('yoru', 'menu_items', './data/menu_items.json')
qa.load_kb('yoru', 'restaurants', './data/restaurants.json')
qa.load_kb('yoru', 'events', './data/events.json')
qa.load_kb('yoru', 'cabin_tiers', './data/cabin_tiers.json')
qa.load_kb('yoru', 'cabins', './data/cabins.json')