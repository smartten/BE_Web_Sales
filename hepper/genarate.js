const moment = require('moment')

const generateCodeByTime = () => {
    const hour = moment().format('H')
    const time = moment().format('L').replaceAll('/' ,'')
    return +(hour+time)
}

module.exports = { generateCodeByTime }