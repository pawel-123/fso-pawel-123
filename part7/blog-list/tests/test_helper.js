const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const userInDb = async (username) => {
    const user = await User.findOne({ username: username })
    return user.toJSON()
}

module.exports = { usersInDb }