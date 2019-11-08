const { port } = require('../../config').api;
const schemas = require('./schemas');
const parameters = require('./parameters');
const responses = require('./responses');

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'challenge-worcket',
    description: 'Challenge did by Julian Molina'
  },
  servers: [
    {
      url: `http://localhost:${port}/`,
      description: 'Local server'
    }
  ],
  security: [],
  tags: [
    { name: 'People', description: 'Endpoint for people' },
    { name: 'Users', description: 'Endpoint for users' }
  ],
  paths: {
    '/users/login': {
      post: {
        tags: ['Users'],
        summary: 'Login',
        operationId: 'userLogin',
        security: [{ bearer: [] }],
        parameters: [{ $ref: '#/components/parameters/loginBody' }],
        responses: {
          200: {
            $ref: '#/components/responses/getLogin'
          },
          422: {
            $ref: '#/components/responses/schemaError'
          },
          500: {
            $ref: '#/components/responses/defaultError'
          }
        }
      }
    },
    '/people': {
      get: {
        tags: ['People'],
        summary: 'Get people',
        operationId: 'getPeople',
        security: [{ bearer: [] }],
        responses: {
          200: {
            $ref: '#/components/responses/getPeople'
          },
          500: {
            $ref: '#/components/responses/defaultError'
          }
        }
      }
    },
    '/people/:id': {
      get: {
        tags: ['People'],
        summary: 'Get specific person',
        operationId: 'getPerson',
        security: [{ bearer: [] }],
        parameters: [{ $ref: '#/components/parameters/pathPersonId' }],
        responses: {
          200: {
            $ref: '#/components/responses/getPerson'
          },
          404: {
            $ref: '#/components/responses/notFoundError'
          },
          500: {
            $ref: '#/components/responses/defaultError'
          }
        }
      }
    }
  },
  components: {
    schemas,
    parameters,
    responses,
    securitySchemes: {
      bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
