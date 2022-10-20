from libs.exceptions import NotFoundException
from pymongo import MongoClient
import uuid

def format_mongo_mammal(mammal):
    return {
        'id': mammal['id'],
        'commonName': mammal['commonName'],
        'scientificName': mammal['scientificName'],
        'status': mammal['status'],
        'lastSeen': mammal['lastSeen'],
        'count': mammal['count']
    }

def create_mammal(app, mammal):
    # Create mongo client
    conn_string = app.config['MONGO_CONN_STRING']
    client = MongoClient(conn_string)
    # Set id of new mammal
    mammal['id'] = str(uuid.uuid4())
    # Insert record
    client['test']['mammals'].insert_one(mammal)
    # Respond with the new object
    return format_mongo_mammal(mammal)

def update_mammal(app, mammal_id, mammal):
    # Create mongo client
    conn_string = app.config['MONGO_CONN_STRING']
    client = MongoClient(conn_string)
    # Insert record
    result = client['test']['mammals'].update_one({ 'id': mammal_id }, { '$set': mammal })
    if result.matched_count == 0:
        return None
    # Get new record
    updated_mammal = client['test']['mammals'].find_one({ 'id': mammal_id })
    # Respond with the new object
    return format_mongo_mammal(updated_mammal)
