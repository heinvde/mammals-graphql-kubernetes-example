const service = require('./service');

class Mammal {
  constructor({ id, commonName, scientificName, status, lastSeen, count }) {
    this.id = id;
    this.commonName = commonName;
    this.scientificName = scientificName;
    this.status = status;
    this.lastSeen = lastSeen;
    this.count = count;
  }
}

const schema = {
  // Queries

  mammal: async ({ id }, context) => {
    const result = await service.getMammal(context, { id });
    return new Mammal(result);
  },

  mammals: async (_, context) => {
    const results = await service.getMammals(context, {});
    return results.map(mammal => new Mammal(mammal));
  },

  // Mutations

  createMammal: async ({ input }, context) => {
    const result = await service.createMammal(context, { mammal: input });
    return new Mammal(result);
  },

  updateMammal: async ({ id, input }, context) => {
    const result = await service.updateMammal(context, { id, mammal: input });
    return new Mammal(result);
  }
};

module.exports = schema;
