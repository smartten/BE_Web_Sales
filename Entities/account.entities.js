const mongoose = require('mongoose')
const Schema = mongoose.Schema

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const account = new Schema({
    userName: {
        type: String, required: true
    },
    email: {
        email: {
            type: String,
            trim: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
    },
    location: {
        type: String, required: true
    },
    hide: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Account = mongoose.model('Account', account)

module.exports = Account