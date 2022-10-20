const fetch = require('node-fetch');

function getPath(context, req) {
  const { config } = context;
  const host = config['APP_HOST'];
  const port = config['APP_PORT'];
  const path = req.url;

  return `http://${host}:${port}${path}`;
}

async function forwardRequest(context, req, res) {
  const config = {
    method: req.method
  };

  if(req.body && req.method !== 'GET' && req.method !== 'HEAD') {
    config.body = JSON.stringify(req.body);
    config.headers = { 'Content-type': 'application/json' };
  }

  const path = getPath(context, req);
  const response = await fetch(path, config);
  const status = response.status;
  const contentType = response.headers.get('content-type');
  const data = contentType == 'application/json' ? await response.json() : await response.text();

  return res.status(status).type(contentType).json(data);
}

module.exports = { forwardRequest };