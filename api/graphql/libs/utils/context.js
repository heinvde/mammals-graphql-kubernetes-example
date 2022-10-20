class Context {
  constructor({ request, logger, config }) {
    this.logger = logger;
    this.request = request;
    this.config = config;
  }
}

module.exports = { Context };
