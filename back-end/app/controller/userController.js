const UserTwo = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const axios = require('axios')

const userController = {}

userController.register = (req,res) => 
{
    const body = req.body
    UserTwo.findOne({"email":body.email})
        .then((user) => 
        {
            if(!user)
            {
                const user = new UserTwo(body)
                bcrypt.genSalt()
                    .then((salt) => 
                    {
                        bcrypt.hash(user.password,salt)
                            .then((encryptedPassword) => 
                            {
                                user.password = encryptedPassword
                                user.save()
                                    .then((user) => 
                                    {
                                        res.json(user)
                                    })
                                    .catch((err) => 
                                    {
                                        res.json(err)
                                    })
                            })
                    })
            }
            else
            {
                res.json("User already exists")
            }
        })
        .catch((err) => 
        {
            console.log(err)
        })
    
}
userController.login = (req,res) => 
{
    const body = req.body
    UserTwo.findOne({"email":body.email})
        .then((user) => 
        {
            if(!user)
            {
                res.json("Invalid email or password")
            }
            else
            {
                bcrypt.compare(body.password,user.password)
                    .then((match) => 
                    {
                        if(!match)
                        {
                            res.json("Invalid email or password")
                        }
                        else
                        {
                            const data ={
                                id:user._id,
                                name:user.name,
                                email:user.email
                            }
                            const token = jwt.sign(data,"app2",{expiresIn:"1d"})
                            res.json({
                                "token":`Bearer ${token}`
                            })
                        }
                    })
                    .catch((err) => 
                    {
                        res.json(err)
                    })
            }
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.show = (req,res) => 
{
    const id = req.user.id
    UserTwo.findById(id)
        .then((user) => 
        {
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.update = (req,res) => 
{
    const id = req.user.id
    const body = req.body
    UserTwo.findByIdAndUpdate(id,body,{new:true})
        .then((user) => 
        {
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.display = (req,res) => 
{
    const id = req.user.id
    UserTwo.findById(id)
        .then((ele) => 
        {
            res.json(ele)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.showAll = (req,res) => 
{
    UserTwo.find()
        .then((users) => 
        {
            res.json(users)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.destroy = (req,res) => 
{
    const id = req.params.id
    UserTwo.findByIdAndDelete(id)
        .then((user) => 
        {
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

userController.search = (req,res) => 
{
    const email = req.params.email
    // console.log(email)
    UserTwo.find({"email":email})
        .then((user) => 
        {
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.searchUser = (req,res) => 
{
    const email = req.params.email
    axios.get(`http://localhost:3050/api/app1/email-search/${email}`)
        .then((user) => 
        {
            res.json(user.data)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

module.exports = userController