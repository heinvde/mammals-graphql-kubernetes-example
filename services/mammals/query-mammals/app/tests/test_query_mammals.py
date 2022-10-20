import pytest, requests

def get_endpoint(path):
    host = 'localhost'
    port = '5000'
    return f'http://{host}:{port}/{path}'

def test_happy_path_get_mammals():
    # Execution
    endpoint = get_endpoint('mammals')
    response = requests.get(endpoint)
    assert response.status_code == 200
    mammals = response.json()
    assert len(mammals) > 0

def test_happy_path_get_mammal_by_id():
    # Execution
    endpoint = get_endpoint('mammals/id-0001')
    response = requests.get(endpoint)
    assert response.status_code == 200
    mammal = response.json()
    assert mammal != None
