const fetch = require('node-fetch');

class Request {
  constructor() {}

  async get(url) {
    const response = await fetch(url);
    return await response.json();
  }

  async post(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    });

    return await response.json();
  }

  async put(url, body) {
    console.log(body);
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    });

    return await response.json();
  }
}

module.exports = { Request };
