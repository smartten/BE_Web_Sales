const mongoose = require('mongoose')
const Schema = mongoose.Schema

const title = new Schema({
    title: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    image: {
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

const Title = mongoose.model('Title', title)

module.exports = Title