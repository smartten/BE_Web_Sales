const mongoose = require('mongoose')
const Schema = mongoose.Schema

const news = new Schema({
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

const News = mongoose.model('News', news)

module.exports = News