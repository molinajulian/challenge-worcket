const { getAllPersons } = require('./controllers/people');

exports.init = app => {
  app.get('/people', getAllPersons);
};
