const UserTwo = require("../models/userModel")
const jwt = require('jsonwebtoken')

const userAuthenticate = (req,res,next) => 
{
    const token = req.header("Authorization").split(" ") [1]
    let data
    try{
        const user = jwt.verify(token,"app2")
        // console.log(user)
        req.user = user
        next()
    }
    catch(e)
    {
        res.json(e)
    }
}

module.exports = userAuthenticate