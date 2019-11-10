exports.loginSchema = {
  mail: {
    in: ['body'],
    isEmail: {
      errorMessage: 'The key mail must be a valid email'
    },
    isEmpty: {
      negated: true,
      errorMessage: 'The key must not be empty'
    }
  }
};
