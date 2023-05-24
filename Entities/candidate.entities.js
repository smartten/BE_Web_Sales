const mongoose = require('mongoose')
const Schema = mongoose.Schema

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const candidate = new Schema({
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
    department: {
        type: String, required: true
    },
    vacancies: {
        type: String, required: true
    },
    status : {
        type : String , default : 'Unread'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Candidate = mongoose.model('Candidate', candidate)

module.exports = Candidate