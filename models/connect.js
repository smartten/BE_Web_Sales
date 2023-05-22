const mongoose = require('mongoose')
mongoose.set('useFindAndModify' , false)

function connect() {

    const urlConnect = 'mongodb+srv://khanh3108:khanh3108@cluster0.95ndzff.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(urlConnect , {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })

    console.log("Connect mongodb success!");
    mongoose.connection.on('error', error => console.log('error connect db', error))
    mongoose.connection.once('open', () => console.log(`Connect to saving DB successfully!!!`))
}

module.exports = {
    connect
}