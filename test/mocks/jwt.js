jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

exports.successDecode = value => jwt.verify.mockReturnValueOnce(value);
exports.successSignIn = value => jwt.sign.mockReturnValueOnce(value);
exports.failDecode = value =>
  jwt.verify.mockImplementationOnce(() => {
    throw new Error(value);
  });
exports.failSignIn = value => jwt.sign.mockRejectedValueOnce({ message: value });
