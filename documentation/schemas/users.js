module.exports = {
  mail: {
    type: 'string',
    example: 'fake@domain.com'
  },
  loginSuccessfully: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        example:
          'eyJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoiZmFrZUBkb21haW4uY29tIiwidHlwZSI6IlJFR1VMQVIifQ.-h-lthELk3KOtPKUuKqNrzygBUueLye6fo9xICEUq-A'
      }
    }
  }
};
