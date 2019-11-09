module.exports = {
  getLogin: {
    description: 'Login successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/loginSuccessfully'
        }
      }
    }
  }
};
