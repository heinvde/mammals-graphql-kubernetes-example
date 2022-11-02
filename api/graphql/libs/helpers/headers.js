module.exports = {
  addCorrelationId(context, headers={}) {
    return {
      ...headers,
      correlationId: context.config['correlationId']
    }
  }
}