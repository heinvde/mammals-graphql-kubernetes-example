const fetch = require('node-fetch');

class Request {
  constructor() {}

  async get(url, headers={}) {
    const response = await fetch(url, {
        ...headers
    });
    return await response.json();
  }

  async post(url, body, headers={}) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        ...headers
      }
    });

    return await response.json();
  }

  async put(url, body, headers={}) {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        ...headers
      }
    });

    return await response.json();
  }
}

module.exports = { Request };
