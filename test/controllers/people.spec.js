const request = require('supertest');

const {
  mockPeopleResponse,
  requestPromiseMock,
  mockFailedRequest,
  mockPersonResponse
} = require('../mocks/request');
const { successDecode, failDecode } = require('../mocks/jwt');
const cache = require('../mocks/cache');
const app = require('../../app.js');

describe('People controller', () => {
  describe('GET /people', () => {
    describe('Successfully cases', () => {
      describe('Get people successfully', () => {
        let response = {};
        beforeAll(() => {
          mockPeopleResponse({ count: 9, limit: 3 });
          successDecode({ type: 'REGULAR' });
          return request(app)
            .get('/people')
            .set('authorization', 'token')
            .then(res => {
              response = res;
            });
        });
        afterAll(() => {
          jest.resetAllMocks();
          return new Promise(resolve => setTimeout(() => resolve(), 0));
        });
        it('The response status code must be 200', () => {
          expect(response.status).toBe(200);
        });
        it('The response body must be contain 9 elements', () => {
          expect(response.body.length).toBe(9);
        });
        it('The response body must be contain only id and name', () => {
          response.body.forEach(result => {
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('name');
          });
        });
        it('Request promise have been called 3 times', () => {
          expect(requestPromiseMock).toHaveBeenCalledTimes(3);
        });
      });
    });
    describe('Failure cases', () => {
      describe('Failure for token expired', () => {
        beforeAll(() => {
          jest.resetAllMocks();
          failDecode('jwt expired');
          return request(app)
            .get('/people')
            .set('authorization', 'token')
            .then(res => {
              response = res;
            });
        });
        afterAll(() => {
          jest.resetAllMocks();
          return new Promise(resolve => setTimeout(() => resolve(), 0));
        });
        it('The response status code must be 400', () => {
          expect(response.statusCode).toBe(400);
        });
        it('The response internal_code must be bad_token', () => {
          expect(response.body.internal_code).toBe('bad_token');
        });
        it('The response message must be token expired', () => {
          expect(response.body.message).toBe('jwt expired');
        });
      });
      describe('Failure because swapi is down', () => {
        beforeAll(() => {
          mockFailedRequest({ message: 'swapi is down' });
          successDecode({ type: 'REGULAR' });
          return request(app)
            .get('/people')
            .set('authorization', 'token')
            .then(res => {
              response = res;
            });
        });
        afterAll(() => {
          jest.resetAllMocks();
          return new Promise(resolve => setTimeout(() => resolve(), 0));
        });
        it('The response status code must be 500', () => {
          expect(response.statusCode).toBe(500);
        });
        it('The response internal_code must be swapi_default_error', () => {
          expect(response.body.internal_code).toBe('swapi_default_error');
        });
        it('The response message must be Internal server error from swapi', () => {
          expect(response.body.message).toBe('Internal server error from swapi');
        });
      });
    });
  });
  describe('GET /people/:id', () => {
    describe('Successfully cases', () => {
      beforeAll(() => {
        mockPersonResponse();
        successDecode({ type: 'ADMIN' });
        return request(app)
          .get('/people/1')
          .set('authorization', 'token')
          .then(res => {
            response = res;
          });
      });
      afterAll(() => {
        jest.resetAllMocks();
        return new Promise(resolve => setTimeout(() => resolve(), 0));
      });
      it('The response status code must be 200', () => {
        expect(response.statusCode).toBe(200);
      });
      it('The response body nested data must be contain only id and name', () => {
        expect(response.body['films'][0]).toHaveProperty('id');
        expect(response.body['films'][0]).toHaveProperty('name');
        expect(response.body['species'][0]).toHaveProperty('id');
        expect(response.body['species'][0]).toHaveProperty('name');
        expect(response.body['vehicles'][0]).toHaveProperty('id');
        expect(response.body['vehicles'][0]).toHaveProperty('name');
        expect(response.body['starships'][0]).toHaveProperty('id');
        expect(response.body['starships'][0]).toHaveProperty('name');
        expect(response.body['homeworld']).toHaveProperty('id');
        expect(response.body['homeworld']).toHaveProperty('name');
      });
      it('Request promise have been called 6 times', () => {
        expect(requestPromiseMock).toHaveBeenCalledTimes(6);
      });
    });
    describe('Failure cases', () => {
      describe('Failure for token expired', () => {
        beforeAll(() => {
          jest.resetAllMocks();
          failDecode('jwt expired');
          return request(app)
            .get('/people/1')
            .set('authorization', 'token')
            .then(res => {
              response = res;
            });
        });
        afterAll(() => {
          jest.resetAllMocks();
          return new Promise(resolve => setTimeout(() => resolve(), 0));
        });
        it('The response status code must be 400', () => {
          expect(response.statusCode).toBe(400);
        });
        it('The response internal_code must be bad_token', () => {
          expect(response.body.internal_code).toBe('bad_token');
        });
        it('The response message must be token expired', () => {
          expect(response.body.message).toBe('jwt expired');
        });
      });
      describe('Failure because swapi is down', () => {
        beforeAll(() => {
          mockFailedRequest({ message: 'swapi is down' });
          successDecode({ type: 'ADMIN' });
          return request(app)
            .get('/people/1')
            .set('authorization', 'token')
            .then(res => {
              response = res;
            });
        });
        afterAll(() => {
          jest.resetAllMocks();
          return new Promise(resolve => setTimeout(() => resolve(), 0));
        });
        it('The response status code must be 500', () => {
          expect(response.statusCode).toBe(500);
        });
        it('The response internal_code must be swapi_default_error', () => {
          expect(response.body.internal_code).toBe('swapi_default_error');
        });
        it('The response message must be Internal server error from swapi', () => {
          expect(response.body.message).toBe('Internal server error from swapi');
        });
      });
      describe('Failure because user is not authorized', () => {
        beforeAll(() => {
          successDecode({ type: 'REGULAR' });
          return request(app)
            .get('/people/1')
            .set('authorization', 'token')
            .then(res => {
              response = res;
            });
        });
        afterAll(() => {
          jest.resetAllMocks();
          return new Promise(resolve => setTimeout(() => resolve(), 0));
        });
        it('The response status code must be 401', () => {
          expect(response.statusCode).toBe(401);
        });
        it('The response internal_code must be unauthorized', () => {
          expect(response.body.internal_code).toBe('unauthorized');
        });
        it('The response message must be unauthorized', () => {
          expect(response.body.message).toBe('The user is not authorized');
        });
      });
      describe('Failure because person does not exist', () => {
        beforeAll(() => {
          mockFailedRequest({ message: 'not found', statusCode: 404 });
          successDecode({ type: 'ADMIN' });
          return request(app)
            .get('/people/1')
            .set('authorization', 'token')
            .then(res => {
              response = res;
            });
        });
        afterAll(() => {
          jest.resetAllMocks();
          return new Promise(resolve => setTimeout(() => resolve(), 0));
        });
        it('The response status code must be 404', () => {
          expect(response.statusCode).toBe(404);
        });
        it('The response internal_code must be not_found', () => {
          expect(response.body.internal_code).toBe('not_found');
        });
        it('The response message must be The resource does not exist', () => {
          expect(response.body.message).toBe('The resource does not exist');
        });
      });
    });
  });
});
