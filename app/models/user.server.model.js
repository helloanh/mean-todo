var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        validate: [

            function(password) {
                return password.length >= 6;
            },
            'Password should be longer'
        ]
    },
    created: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    }
    website: {
        type: String,
        set: function(url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {}
                return url;
            }
        }
    },
});

// using post middleware, this executes after the operation happens
UserSchema.post('save', function(next) {
    if (this.isNew) {
        console.log('A new user was created.');
    } else {
        console.log('A user updated is details.');
    }
});


// create post schema to illustrate DBRef support  
var PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content {
		type: String,
		required: true
	},
	author {
		type: Schema.ObjectId,
		// ref property tells mongoose that the author field
		// will use the User model to populate the value
		ref: 'User'
	}
});

mongoose.model('User', UserSchema);