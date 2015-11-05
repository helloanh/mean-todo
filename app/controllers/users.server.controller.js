// controller needs the User model from mongoose db
var User = require('mongoose').model('User');

// controller method create() 
exports.create = function(req, res, next){
    // create new user instance which is populated
    // using the request body
    var user = new User(req.body);
    
    // save new instance
    user.save(function(err){
        // err passed to the next middleware
        if (err) {
            return next(err);
        } else {
        // saves and output user object
            res.json(user);
        }
    })
};

// user controller method list()
// list() usese find.() method to retrive an array of all the documents in the users collection 

exports.list = function(req, res, next){
    User.find({}, function(err, users){
        if (err){
            return next(err);
        } else {
            res.json(users);
        }
    });
};

