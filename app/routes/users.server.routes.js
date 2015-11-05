var users = require('../../app/controllers/users.server.controller');

// RESTful API best practice, call route users
// sending HTTP post request to the base users route

module.exports = function(app){
    app.route('/users')
        .post(users.create)
        .get(users.list);
    
    // add users.read() method from controller witha request path containing userId  
    // by adding a colon before a substring in a route definition, you are signalling that this sustring as a request parameter  

    app.route('/users/:userId')
        .get(users.read);

    // to handle the population of teh req.user object, use the app.param method before any other middleware that uses that params 
    app.param('userId', users.userByID);
};

