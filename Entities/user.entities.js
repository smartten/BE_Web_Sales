const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
// var validateEmail = function (email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

const user = new Schema({
    phone : { type: String, required: true , index : {unique : true} },
    username : { type: String, required: true },
    password: { type: String, required: true },
    activeCode : { type: Number },
    grade : { type: String},
    role : { type: String , default : 'user'},
    active : { type : Boolean , default : false }
})

// user.plugin(require('mongoose-beautiful-unique-validation'));

const User = mongoose.model('User', user)

module.exports = User