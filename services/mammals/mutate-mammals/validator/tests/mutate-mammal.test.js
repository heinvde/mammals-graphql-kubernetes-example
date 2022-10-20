const supertest = require('supertest')
const { createApp } = require('../libs/app');

let app, request;

const config = {
  VALIDATOR_PORT: 5000,
  APP_HOST: 'localhost',
  APP_PORT: 5001
};

beforeAll(async () => {
  app = await createApp({ config });
  request = supertest(app);
});

describe('GET /ping', () => {
  test('successfully-sends-and-receives-request', async done => {
    const response = await request.get('/ping?my=param')

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ message: 'Pong!' });

    done();
  });
});

describe('POST /mammals', () => {
  test('successfully-validates-creating-invalid-mammal', async done => {
    const payload = {};
    const response = await request.post('/mammals').send(payload);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      commonName: [
        'commonName must be present',
        'commonName must be a non empty string'
      ],
      scientificName: [
        'scientificName must be present',
        'scientificName must be a non empty string'
      ],
      status: [
        'status must be present',
        'status must be a non empty string'
      ],
      lastSeen: [
        'lastSeen must be present',
        'lastSeen must be a non empty string'
      ],
      count: [
        'count must be present',
        'count must be a integer larger or equal to 0'
      ]
    });

    done();
  });

  test('successfully-validates-creating-valid-mammal', async done => {
    const payload = {
      'commonName': 'Vervet Monkey',
      'scientificName': 'Chlorocebus pygerythrus',
      'status': 'Least Concern',
      'lastSeen': '2022-10-18',
      'count': 5000
    };

    const response = await request.post('/mammals').send(payload);
    expect(response.statusCode).toEqual(201);

    done();
  });
});

describe('PUT /mammals', () => {
  test('successfully-validates-updating-invalid-mammal-1', async done => {
    const payload = {
      'commonName': '',
      'scientificName': '',
      'status': '',
      'lastSeen': '',
      'count': 'invalid'
    };

    const response = await request.put('/mammals/id-0001').send(payload);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      commonName: [
        'commonName must be a non empty'
      ],
      scientificName: [
        'scientificName must be a non empty'
      ],
      status: [
        'status must be a non empty'
      ],
      lastSeen: [
        'lastSeen must be a non empty'
      ],
      count: [
        'count must be a integer greater than or equal to 0'
      ]
    });

    done();
  });

  test('successfully-validates-updating-invalid-mammal-2', async done => {
    const payload = {
      'commonName': 1,
      'scientificName': 2,
      'status': 3,
      'lastSeen': 4,
      'count': -1
    };

    const response = await request.put('/mammals/id-0001').send(payload);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      commonName: [
        'commonName must be a string'
      ],
      scientificName: [
        'scientificName must be a string'
      ],
      status: [
        'status must be a string'
      ],
      lastSeen: [
        'lastSeen must be a string'
      ],
      count: [
        'count must be a integer greater than or equal to 0'
      ]
    });

    done();
  });

  test('successfully-validates-updating-valid-mammal', async done => {
    const payload = {
      'commonName': 'Vervet Monkey',
      'scientificName': 'Chlorocebus pygerythrus',
      'status': 'Least Concern',
      'lastSeen': '2022-10-18',
      'count': 5000
    };

    const response = await request.put('/mammals/id-0001').send(payload);
    expect(response.statusCode).toEqual(200);

    done();
  });

  test('fail-validates-updating-valid-mammal-that-does-not-exist', async done => {
    const payload = {
      'commonName': 'Vervet Monkey',
      'scientificName': 'Chlorocebus pygerythrus',
      'status': 'Least Concern',
      'lastSeen': '2022-10-18',
      'count': 5000
    };

    const response = await request.put('/mammals/doesnotexist').send(payload);
    expect(response.statusCode).toEqual(404);

    done();
  });
});