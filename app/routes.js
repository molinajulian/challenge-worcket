const { getAllPersons, getPerson } = require('./controllers/people');
const { login } = require('../app/controllers/users');
const { validateSchema } = require('../app/middlewares/schena_validator');
const { loginSchema } = require('../app/schemas/users');
const { verifyToken, verifyPermissions } = require('../app/middlewares/authentication');

exports.init = app => {
  app.get('/people', [verifyToken, verifyPermissions], getAllPersons);
  app.get('/people/:id', [verifyToken, verifyPermissions], getPerson);
  app.post('/login', validateSchema(loginSchema), login);
};
