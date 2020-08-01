from mindmeld.components import QuestionAnswerer
qa = QuestionAnswerer('.')
qa.load_kb('yoru', 'menu_items', './yoru/data/menu_items.json')
qa.load_kb('yoru', 'restaurants', './yoru/data/restaurants.json')
qa.load_kb('yoru', 'cabins', './yoru/data/cabins.json')
qa.load_kb('yoru', 'cabin_tiers', './yoru/data/cabin_tiers.json')
qa.load_kb('yoru', 'events', './yoru/data/events.json')