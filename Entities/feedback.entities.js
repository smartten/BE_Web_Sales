const mongoose = require('mongoose')
const Schema = mongoose.Schema

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const feedback = new Schema({
    username: {
        type: String, required: true
    },
    email: {
        type: String,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    phone : {
        type: String, required: true
    },
    description : {
        type: String, required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Feedback = mongoose.model('Feedback', feedback)

module.exports = Feedback