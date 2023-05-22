const User = require('../Entities/user.entities');
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage


const login = (data) => {
    let query = { "phone": data.phone, "password": data.password };

    return User.findOne(query)
}

async function register(payload) {
    console.log('b');
    console.log('payload', payload);

    // const OTP = Math.floor(100000 + Math.random() * 900000)
    // const newUser = new User({
    //     ...payload,
    //     activeCode: OTP
    // });
    // console.log('newUser', newUser);
    const newUser = new User(payload)
    const createUser = await newUser.save();
    delete createUser.activeCode
    return createUser;
};

async function getAllUser() {
    return User.find({ role: 'user' }).select('-password')
}

function getUser(id = null) {
    const query = id ? { "_id": id } : {};

    const userById = User.findOne(query).select('-password', '-activeCode')

    return userById;
}

async function updateUser(payload) {
    try {
        const newUser = await User.findOne({ _id: payload._id });
        if (!newUser) throw new Error('user not found')
        const { _id, ...data } = payload
        newUser.set(data)
        const createUser = await newUser.save();
        return createUser;
    } catch (err) {
        console.log(err, 'asdfasf')
        throw new Error("update fail" + JSON.stringify(err))
    }
};

async function updatePassword(payload) {
    try {
        const { _id, password , newPassword } = payload
        const newUser = await User.findOne({ _id });
        if (!newUser) throw new Error('user not found')
        console.log(newUser);
        if (password !== newUser.password) {
            throw new Error('password wrong!!!')
        }
        else {
            console.log("aaa");
            
            newUser.set({password : newPassword})
            const createUser = await newUser.save();
            return createUser;
        }
    } catch (err) {
        console.log(err, 'asdfasf')
        throw new Error("update fail" + JSON.stringify(err))
    }
};

async function update(useId, payload) {
    try {
        const newUser = await User.findOne({ _id: useId });
        if (!newUser) return new Error('user not found')
        console.log(newUser.activeCode, payload.activeCode);
        if (newUser.activeCode == +payload.activeCode) {
            newUser.set({
                active: true
            });
            const createUser = await newUser.save();
            return createUser;
        }
        else {
            return new Error('Mã kích hoạt không chính xác')
        }
    } catch (err) {
        console.log(err, 'asdfasf')
        throw new Error("update fail" + JSON.stringify(err))
    }
};

async function updateActiveCode(payload) {
    try {
        const newUser = await User.findOne({ _id: payload.id });
        if (!newUser) return new Error('user not found')
        newUser.set({
            activeCode: generateCodeByTime()
        })
        await newUser.save();
        return { msg: 'done' };
    } catch (err) {
        console.log(err, 'asdfasf')
        throw new Error("update fail" + JSON.stringify(err))
    }
};

async function updateActiveAccount(payload) {
    try {
        const newUser = await User.findOne({ _id: payload.id });
        if (!newUser) throw new Error('user not found')
        if (payload.activeCode == generateCodeByTime()) {
            const user = await User.findByIdAndUpdate(payload.id, {
                active: true
            }, {
                new: true
            })
            return user
        }
        else {
            throw new Error(JSON.stringify("Mã kích hoạt không chính xác"))
        }
    } catch (err) {
        throw new Error("update fail" + JSON.stringify(err))
    }
}

module.exports = { login, register, getAllUser, getUser, update, updateActiveCode, updateActiveAccount, updateUser, updatePassword }