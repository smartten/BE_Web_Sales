const mongoose = require('mongoose')
const Schema = mongoose.Schema

const category = new Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    location: {
        type: String, required: true
    },
    hide : {
        type : Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Category = mongoose.model('Category', category)

module.exports = Category