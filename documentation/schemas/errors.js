module.exports = {
  schemaError: {
    type: 'object',
    properties: {
      message: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                msg: {
                  type: 'string',
                  example: 'The mail is incorrect'
                },
                location: {
                  type: 'string',
                  example: 'Body'
                },
                param: {
                  type: 'string',
                  example: 'mail'
                }
              }
            }
          }
        }
      },
      internal_code: {
        type: 'string',
        example: 'specific_internal_code'
      }
    }
  },
  error: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'An error has ocurred'
      },
      internal_code: {
        type: 'string',
        example: 'specific_internal_code'
      }
    }
  }
};
