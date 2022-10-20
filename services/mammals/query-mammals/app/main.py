from flask import Flask, make_response
from libs.exceptions import NotFoundException
from libs.config import Config
import json, os
import libs.queries as queries

app = Flask(__name__)

# Set up config
env = os.environ['ENVIRONMENT']
config = Config(env)
config.setup(app)

# Routes

@app.route("/")
def ping():
    response = make_response({ 'message': 'Pong!' }, 200)
    response.mimetype = "application/json"
    return response

@app.route("/mammals")
def get_mammals():
    mammals = queries.get_mammals(app)
    response = make_response(mammals, 200)
    response.mimetype = "application/json"
    return response

@app.route("/mammals/<mammal_id>")
def get_mammal_by_id(mammal_id):
    mammal = queries.get_mammal_by_id(app, mammal_id)
    if(mammal == None):
        raise NotFoundException("Mammal not found")

    response = make_response(mammal, 200)
    response.mimetype = "application/json"
    return response

# Errors
@app.errorhandler(NotFoundException)
def handle_bad_request(e):
    response = make_response('Not Found', 404)
    response.mimetype = "text/plain"
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0')