import requests
import json
import random

class API():

    def __init__(self):
        items = [
            {
                "name":"Kitchen",
                "floor": 1,
                "available": 1,
                "total": 1,
                "description" : "Checkout, Make food, Clean up!, Checkin"
            },
            {
                "name": "Den TV",
                "floor": 3,
                "available": 1,
                "total": 1,
                "description" : "Checkout, Use the TV , Checkin"
            },
            {
                "name": "Washer",
                "floor": 6,
                "available": 2,
                "total": 2,
                "description" : "Checkout, Wash clothes, Checkin"
            },
            {
                "name": "Dryer",
                "floor": 6,
                "available": 2,
                "total": 2,
                "description" : "Checkout, Dry clothes, Checkin"
            }
        ]
        self.items_file = "items.json"

        with open(self.items_file, 'w') as f:
            json.dump(items, f)



    def get_items(self):
        with open(self.items_file) as f:
            return json.load(f)
        
    
    def checkin(self, item):

        items = []
        for each in self.get_items():
            if each["name"] == item:        
                assert each["available"] < each["total"], "Cant checkin more of this item"
                each["available"] +=1
            items.append(each)
        with open(self.items_file, 'w') as f:
            json.dump(items, f)

    def checkout(self, item):

        
        items = []
        for each in self.get_items():

            if each["name"] == item:        
                assert each["available"] > 0, "Cant checkout more of this item"
                each["available"] -=1

            items.append(each)

        with open(self.items_file, 'w') as f:
            json.dump(items, f)
        
