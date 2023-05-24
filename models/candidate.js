const Candidate = require('../Entities/candidate.entities');
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage

async function getAllCandidate(query) {
    const q = query.q
    if (q) {
        const candidate = await Candidate.find({
            $or: [
                { userName: { $regex: new RegExp(q, "i") } },
                { email: { $regex: new RegExp(q, "i") } }
            ]
        });
        return candidate
    }
    return Candidate.find()
}

async function createCandidate(payload) {
    const newCandidate = new Candidate(payload)
    const create = await newCandidate.save();
    return create;
}

async function updateCandidate(payload) {
    try {
        const newCandidate = await Candidate.findOne({ _id: payload._id });
        if (!newCandidate) throw new Error('user not found')
        const { _id, ...data } = payload
        newCandidate.set(data)
        const update = await newCandidate.save();
        return update;
    } catch (err) {
        console.log(err, 'asdfasf')
        throw new Error("update fail" + JSON.stringify(err))
    }
}

async function deleteCandidate({ id }) {
    try {
        await Candidate.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllCandidate, createCandidate, updateCandidate, deleteCandidate }