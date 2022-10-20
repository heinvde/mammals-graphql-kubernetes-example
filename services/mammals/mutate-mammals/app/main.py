from flask import Flask, request, make_response
from libs.exceptions import NotFoundException
from libs.config import Config
import os
import libs.mutations as mutations

app = Flask(__name__)

# Set up config
env = os.environ['ENVIRONMENT']
config = Config(env)
config.setup(app)

# Routes

@app.route('/ping')
def ping():
    response = make_response({ 'message': 'Pong!' }, 200)
    response.mimetype = "application/json"
    return response

@app.route('/mammals', methods = [ 'POST' ])
def create_mammal():
    payload = request.json
    created_mammal = mutations.create_mammal(app, payload)

    response = make_response(created_mammal, 201)
    response.mimetype = "application/json"
    return response

@app.route('/mammals/<mammal_id>', methods = [ 'PUT' ])
def update_mammal(mammal_id):
    payload = request.json
    updated_mammal = mutations.update_mammal(app, mammal_id, payload)

    if updated_mammal == None:
        raise NotFoundException()

    response = make_response(updated_mammal, 200)
    response.mimetype = "application/json"
    return response

# Errors
@app.errorhandler(NotFoundException)
def handle_bad_request(e):
    response = make_response('Not Found', 404)
    response.mimetype = "text/plain"
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0')