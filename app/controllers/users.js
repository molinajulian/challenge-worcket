const { signIn } = require('../services/jwt');
const { ADMIN, REGULAR } = require('../constants');

exports.login = ({ body: { mail } }, res, next) => {
  const payload = { mail, type: (mail.includes('@worcket') && ADMIN) || REGULAR };
  return signIn(payload)
    .then(token => res.send({ token }))
    .catch(next);
};
