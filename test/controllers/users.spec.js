const request = require('supertest');

const { failSignIn, successSignIn } = require('../mocks/jwt');
const app = require('../../app.js');
const { email } = require('../helpers/faker');

describe('Users controller', () => {
  describe('POST /users/login', () => {
    const fakeMail = email();
    describe('Successfully cases', () => {
      describe('Login successfully', () => {
        let response = {};
        beforeAll(() => {
          successSignIn('I am a token');
          return request(app)
            .post('/users/login')
            .send({ mail: fakeMail })
            .then(res => {
              response = res;
            });
        });
        afterAll(() => new Promise(resolve => setTimeout(() => resolve(), 0)));
        it('The response status code must be 200', () => {
          expect(response.status).toBe(200);
        });
        it('Token must be correct', () => {
          expect(response.body.token).toStrictEqual('I am a token');
        });
      });
    });
    describe('Failure cases', () => {
      describe('Failure for schema error', () => {
        beforeAll(() =>
          request(app)
            .post('/users/login')
            .then(res => {
              response = res;
            })
        );
        afterAll(() => new Promise(resolve => setTimeout(() => resolve(), 0)));
        it('The response status code must be 422', () => {
          expect(response.statusCode).toBe(422);
        });
        it('The response body internal_code must be schema_error', () => {
          expect(response.body.internal_code).toBe('schema_error');
        });
        it('The response body message must be correct', () => {
          expect(response.body.message.errors[0].msg).toBe('The key mail must be a valid email');
          expect(response.body.message.errors[1].msg).toBe('The key must not be empty');
        });
      });
      describe('Failure for jsonwebtoken is down', () => {
        beforeAll(() => {
          failSignIn('Unexpected error');
          return request(app)
            .post('/users/login')
            .send({ mail: fakeMail })
            .then(res => {
              response = res;
            });
        });
        afterAll(() => new Promise(resolve => setTimeout(() => resolve(), 0)));
        it('The response status code must be 500', () => {
          expect(response.statusCode).toBe(500);
        });
        it('The response internal_code must be internal_server_error', () => {
          expect(response.body.internal_code).toStrictEqual('internal_server_error');
        });
        it('The response message must be Unexpected error', () => {
          expect(response.body.message).toStrictEqual('Unexpected error');
        });
      });
    });
  });
});
