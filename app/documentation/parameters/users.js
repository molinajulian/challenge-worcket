module.exports = {
  loginBody: {
    name: 'mail',
    in: 'body',
    schema: {
      $ref: '#/components/schemas/mail'
    },
    required: true
  },
  pathPersonId: {
    name: 'id',
    in: 'path',
    schema: {
      $ref: '#/components/schemas/id'
    }
  }
};
