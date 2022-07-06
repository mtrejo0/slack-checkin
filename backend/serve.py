from flask import Flask, jsonify, request
from flask_cors import CORS
from api import API
api = API()

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():

    response = {
        "message": "API works!"
    }
    return jsonify(response)

@app.route('/items', methods =['GET'])
def items():
    try:
        response = {
            "message": "Items",
            "data": api.get_items(),
        }
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify({"error": 'Failed'}), 400

@app.route('/checkin/<item>', methods =['GET'])
def checkin(item):
    try:
        api.checkin(item)

        response = {
            "message": "Checked in {}!".format(item),
            "items": api.get_items(),
        }
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify({"error": 'Failed', "items": api.get_items()}), 400


@app.route('/checkout/<item>', methods =['GET'])
def checkout(item):
    try:
        api.checkout(item)
        response = {
            "message": "Checked out {}!".format(item),
            "items": api.get_items(),
        }
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify({"error": 'Failed', "items": api.get_items()}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)