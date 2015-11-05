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
    // find() can take 4 params
    // Query - mongodb query object
    // [Fields] = optional string obj to represent doc fields return
    // [Options] = this is an optional options obj
    // {Callback} = this is an optional callback function

    // for example, to paginate through the users collection and retrieve
    // only a subset of your users colelction  
    // use the skip and limit options as follows:
    /*
    User.find({},'username email', {
        skip: 10,
        limit: 10
    }, function(err, users) {
        ...
    });

    */
    User.find({}, function(err, users){
        if (err){
            return next(err);
        } else {
            res.json(users);
        }
    });
};

// user controller method findOne() 
exports.read = function(req, res){
    res.json(res.user);
};

// reading a single user document 
// userById method is responsible for populating the req.user object,  use it as a middleware to deal with single documents manipulation for read, delete, update operations  

exports.userByID = function(req,res,next,id){
    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            return next(err);
        } else {
            res.user = user;
            next();
        }
    });
};

// update() method by using findByIdAndUpdate() 
exports.update = function(req, res, next){
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
        if (err){
            return next(err);
        } else {
            res.json(user);
        }
    });
};

//  controller remove() method using findByIdAndRemove()
exports.delete = function(req, res, next){
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(res.user);
        }
    });
}
