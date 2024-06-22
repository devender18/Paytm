const zod = require('zod');

const signup = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string().min(8)

})

const signin = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

const updateUser = zod.object({
    password : zod.string().optional(), 
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

const searchUser = zod.object({
    firstName : zod.optional(),
    lastName : zod.optional()
})

module.exports = ({
    signup,
    signin,
    updateUser,
    // searchUser
})