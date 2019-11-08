const { getAllPersons, getPerson } = require('./controllers/people');

exports.init = app => {
  app.get('/people', getAllPersons);
  app.get('/people/:id', getPerson);
};
