import requests, json

def get_endpoint(path):
    host = 'localhost'
    port = '4001'
    return f'http://{host}:{port}/{path}'

def test_happy_path_create_mammal():
    # Execution
    endpoint = get_endpoint('mammals')
    response = requests.post(
        endpoint,
        headers={
            'Content-type': 'application/json',
            'Correlation-Id': 'corr-1234'
        },
        data=json.dumps({
            'commonName': 'Vervet Monkey',
            'scientificName': 'Chlorocebus pygerythrus',
            'status': 'Least Concern',
            'lastSeen': '2022-10-18',
            'count': 5000
        })
    )
    assert response.status_code == 201
    mammal = response.json()
    assert mammal != None
    assert mammal['id'] != None

def test_happy_path_update_mammal():
    # Execution
    endpoint = get_endpoint('mammals/id-0001')
    response = requests.put(
        endpoint,
        headers={
            'Content-type': 'application/json',
            'Correlation-Id': 'corr-1234'
        },
        data=json.dumps({
            'status': 'Vulnerable'
        })
    )
    assert response.status_code == 200
    mammal = response.json()
    assert mammal != None
    assert mammal['status'] == 'Vulnerable'

def test_fail_update_mammal_not_found():
    # Execution
    endpoint = get_endpoint('mammals/not-valid')
    response = requests.put(
        endpoint,
        headers={
            'Content-type': 'application/json',
            'Correlation-Id': 'corr-1234'
        },
        data=json.dumps({
            'status': 'Vulnerable'
        })
    )
    assert response.status_code == 404