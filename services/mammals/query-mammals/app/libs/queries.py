from libs.exceptions import NotFoundException
from pymongo import MongoClient

def format_mongo_mammal(mammal):
    return {
        'id': mammal['id'],
        'commonName': mammal['commonName'],
        'scientificName': mammal['scientificName'],
        'status': mammal['status'],
        'lastSeen': mammal['lastSeen'],
        'count': mammal['count']
    }

def get_mammals(app):
    conn_string = app.config['MONGO_CONN_STRING']
    client = MongoClient(conn_string)
    cursor = client['test']['mammals'].find()
    return list(map(format_mongo_mammal, list(cursor)))

def get_mammal_by_id(app, mammal_id):
    conn_string = app.config['MONGO_CONN_STRING']
    client = MongoClient(conn_string)
    cursor = client['test']['mammals'].find_one({ 'id': mammal_id })

    if cursor == None:
        return None

    return format_mongo_mammal(cursor)
