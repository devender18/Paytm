const {Router} = require("express");
const router = Router();
const {signup, signin, searchUser, updateUser} = require("../type");
const {User, Accounts} = require("../db/db");
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');
const {authMiddleware} = require("../middleware");

// signup route
router.post('/signup',async (req,res)=>{
    const response = signup.safeParse(req.body);
    if (!response.success){
        return res.status(411).json({
            msg : "Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        username : req.body.username
    })

    if (existingUser){
        return res.status(411).json({
            msg : "OOPs !! Email is already registered"
        })
    }

    const user = await User.create({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password: req.body.password,
        
    })

    let userId = user._id;
    userId = userId.toString();
    await Accounts.create({
        userId,
        balance : 1 + Math.round(Math.random() * 1000,2)
    })


    try{
        const token = jwt.sign({
            userId
        },JWT_SECRET);
    
        res.json({
            "message": "User created successfully",
            "token" : token
        })
    }catch(error){
        res.json({
            msg : "something wrong in creating token"
        })
    }


})

// signin route
router.post('/signin',async (req,res)=>{
    const response = signin.safeParse(req.body);
    if (!response.success){
        return res.status(411).json({
            msg : "incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });
    
    
    if(!user){
        return res.status(404).json({
            msg : "User not found!"
        })
    }else{
        const userId = user._id
        const token = jwt.sign({
            userId
        }, JWT_SECRET)

        return res.status(200).json({
            msg : "logged in succesfully",
            token : token
        })
    }

    res.status(411).json({
        msg : "Error while loggin in"
    })



})

// update data
router.put("/",authMiddleware,async (req,res)=>{
    console.log("inside update data router")
    const response = updateUser.safeParse(req.body);

    if(!response.success){
        res.status(411).json({
            msg : "Error while updating information"
        })
    }

    await User.updateOne({
        _id : req.userId
    }, req.body)

    res.json({
        msg : "Updated successfully"
    })
    
})

//filter user on the basis of firstName/lastName
router.get('/bulk', async (req,res)=>{
    const name = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstName : {
                "$regex" : name,
                '$options' : 'i' //this will make search case insensetive
            }
        },{
            lastName : {
                "$regex" : name,
                '$options' : 'i'
            }            
        

        }]
    })

    res.json({
        user : users.map(user =>({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id: user._id
        }))
    })

})

module.exports = router; 
