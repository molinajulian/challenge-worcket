module.exports = {
  getPeople: {
    description: 'Get people successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/getPeople'
        }
      }
    }
  },
  getPerson: {
    description: 'Get specific person successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/getPerson'
        }
      }
    }
  }
};
