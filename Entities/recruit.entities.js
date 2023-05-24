const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recruit = new Schema({
    department: {
        type: String, required: true
    },
    vacancies: {
        type: String, required: true
    },
    work_place: {
        type: String, required: true
    },
    details: {
        type: String, required: true
    },
    require: {
        type: String, required: true
    },
    benefit: {
        type: String, required: true
    },
    endDate: {
        type: Date, required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Recruit = mongoose.model('Recruit', recruit)

module.exports = Recruit