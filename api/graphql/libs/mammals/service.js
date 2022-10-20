module.exports = {
  // Queries

  /**
   * @param {import('../utils/context').Context} context
   */
  async getMammal(context, { id }) {
    const { request, config } = context;

    const apiUrl = config.QUERY_MAMMALS_SERVICE_HOST;
    const endpoint = `${apiUrl}/mammals/${id}`;
    const result = await request.get(endpoint);

    return result;
  },

  /**
   * @param {import('../utils/context').Context} context
   */
  async getMammals(context, params) {
    const { request, config } = context;

    const apiUrl = config.QUERY_MAMMALS_SERVICE_HOST;
    const endpoint = `${apiUrl}/mammals`;

    const result = await request.get(endpoint);

    return result;
  },

  // Mutations

  /**
   * @param {import('../utils/context').Context} context
   */
  async createMammal(context, { mammal }) {
    const { request, config } = context;

    const apiUrl = config.MUTATE_MAMMALS_SERVICE_HOST;
    const endpoint = `${apiUrl}/mammals`;

    const result = await request.post(endpoint, mammal);

    return result;
  },

  /**
   * @param {import('../utils/context').Context} context
   */
  async updateMammal(context, { id, mammal }) {
    const { request, config } = context;

    const apiUrl = config.MUTATE_MAMMALS_SERVICE_HOST;
    const endpoint = `${apiUrl}/mammals/${id}`;

    const result = await request.put(endpoint, mammal);

    return result;
  }
};
