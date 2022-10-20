const express = require('express');
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');
const validators = require('./validators');
const { forwardRequest } = require('./forward-request')
const app = express();

// Wrapper function to handle request errors
const formatErrors = errorResult =>
  errorResult.array().reduce((errors, error) => {
    if(!errors[error.param])
      errors[error.param] = [error.msg];
    else
      errors[error.param].push(error.msg);

    return errors;
  }, {});

module.exports = {
  createApp: async ({ config }) => {
    const context = { config };

    app.use(bodyParser.json());

    // Health check
    app.get('/ping', (req, res, next) => next());

    // Mutation calls
    app.post('/mammals', validators.createMammal, (req, res, next) => next());
    app.put('/mammals/:id', validators.updateMammal, (req, res, next) => next());

    // Error handling
    app.use((req, res, next) => {
      errorResult = validationResult(req);

      if (!errorResult.isEmpty()) {
        const errors = formatErrors(errorResult);
        return res.status(400).json(errors);
      }

      next();
    });

    // Call and respond with application
    app.use(async (req, res) => {
      return await forwardRequest(context, req, res);
    });

    return app;
  }
}
