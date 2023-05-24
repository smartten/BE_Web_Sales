const Recruit = require('../Entities/recruit.entities');
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage

async function getAllRecruit(query) {
    const q = query.q
    if (q) {
        const recruit = await Recruit.find({ department: { $regex: new RegExp(q, "i") } });
        return recruit
    }
    return Recruit.find()
}

async function createRecruit(payload) {
    const newRecruit = new Recruit(payload)
    const create = await newRecruit.save();
    return create;
}

async function updateRecruit(payload) {
    try {
        const newRecruit = await Recruit.findOne({ _id: payload._id });
        if (!newRecruit) throw new Error('user not found')
        const { _id, ...data } = payload
        newRecruit.set(data)
        const update = await newRecruit.save();
        return update;
    } catch (err) {
        console.log(err, 'asdfasf')
        throw new Error("update fail" + JSON.stringify(err))
    }
}

async function deleteRecruit({ id }) {
    try {
        await Recruit.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllRecruit, createRecruit, updateRecruit , deleteRecruit }