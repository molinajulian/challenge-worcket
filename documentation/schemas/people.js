module.exports = {
  getPeople: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 1
        },
        name: {
          type: 'string',
          example: 'Cosme fulanito'
        }
      }
    }
  },
  id: {
    type: 'integer',
    example: 1
  },
  pathPersonId: {
    type: 'integer',
    example: 1
  },
  getPerson: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      name: {
        type: 'string',
        name: 'Leia Organa'
      },
      height: {
        type: 'string',
        example: '175'
      },
      mass: {
        type: 'string',
        example: '44'
      },
      hair_color: {
        type: 'string',
        example: 'blue'
      },
      skin_color: {
        type: 'string',
        example: 'fair'
      },
      eye_color: {
        type: 'string',
        example: 'red'
      },
      birth_year: {
        type: 'string',
        example: '19BBY'
      },
      gender: {
        type: 'string',
        example: 'female'
      },
      homeworld: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          name: {
            type: 'string',
            example: 'Alderaan'
          }
        }
      },
      films: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Revenge of the Sith'
            }
          }
        }
      },
      species: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Toong'
            }
          }
        }
      },
      vehicles: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'AT-ST'
            }
          }
        }
      },
      starships: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'X-wing'
            }
          }
        }
      }
    }
  }
};
