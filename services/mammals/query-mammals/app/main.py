from flask import Flask
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
    return { 'message': 'Pong!' }

@app.route("/mammals")
def get_mammals():
    mammals = queries.get_mammals(app)
    return json.dumps(mammals)

@app.route("/mammals/<mammal_id>")
def get_mammal_by_id(mammal_id):
    mammal = queries.get_mammal_by_id(app, mammal_id)
    if(mammal == None):
        raise NotFoundException("Mammal not found")

    return json.dumps(mammal)

# Errors
@app.errorhandler(NotFoundException)
def handle_bad_request(e):
    return 'Not Found', 404

if __name__ == "__main__":
    app.run(host='0.0.0.0')