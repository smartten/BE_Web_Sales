const FeedBack = require('../Entities/feedback.entities');
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage

async function getAllFeedBack(query) {
    const q = query.q
    if (q) {
        const feedBack = await FeedBack.find({
            $or: [
                { username: { $regex: new RegExp(q, "i") } },
                { email: { $regex: new RegExp(q, "i") } }
            ]
        });
        return feedBack
    }
    return FeedBack.find()
}

async function createFeedBack(payload) {
    const newFeedBack = new FeedBack(payload)
    const create = await newFeedBack.save();
    return create;
}

async function updateFeedBack(payload) {
    try {
        const newFeedBack = await FeedBack.findOne({ _id: payload._id });
        if (!newFeedBack) throw new Error('user not found')
        const { _id, ...data } = payload
        newFeedBack.set(data)
        const update = await newFeedBack.save();
        return update;
    } catch (err) {
        console.log(err, 'asdfasf')
        throw new Error("update fail" + JSON.stringify(err))
    }
}

async function deleteFeedBack({ id }) {
    try {
        await FeedBack.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllFeedBack, createFeedBack, updateFeedBack, deleteFeedBack }