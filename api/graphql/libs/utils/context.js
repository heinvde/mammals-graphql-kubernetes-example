class Context {
  constructor({ request, logger, config }) {
    this.logger = logger;
    this.request = request;
    this.config = config;
  }
}

function fromContext(context) {
  const { request, logger, config } = context
  return new Context({
    request, logger, config
  })
}

module.exports = { Context, fromContext };
