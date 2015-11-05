var users = require('../../app/controllers/users.server.controller');

// RESTful API best practice, call route users
// sending HTTP post request to the base users route

module.exports = function(app){
    app.route('/users')
        .post(users.create)
        .get(users.list);
};


