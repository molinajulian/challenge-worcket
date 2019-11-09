module.exports = {
  schemaError: {
    description: 'Schema error',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/schemaError'
        }
      }
    }
  },
  defaultError: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/error'
        }
      }
    }
  },
  notFoundError: {
    description: 'Not found Error',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/error'
        }
      }
    }
  }
};
