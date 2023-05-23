const Account = require('../Entities/account.entities');
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage

async function getAllAccount(query) {
    const q = query.q
    if (q) {
        const account = await Account.find({
            $or: [
                { userName: { $regex: new RegExp(q, "i") } },
                { email: { $regex: new RegExp(q, "i") } }
            ]
        });
        return account
    }
    return Account.find()
}

async function createAccount(payload) {
    const newAccount = new Account(payload)
    const create = await newAccount.save();
    return create;
}

async function updateAccount(payload) {
    try {
        const newAccount = await Account.findOne({ _id: payload._id });
        if (!newAccount) throw new Error('user not found')
        const { _id, ...data } = payload
        newAccount.set(data)
        const update = await newAccount.save();
        return update;
    } catch (err) {
        throw new Error("update fail" + JSON.stringify(err))
    }
}

async function deleteAccount({ id }) {
    try {
        await Account.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllAccount, createAccount, updateAccount, deleteAccount }