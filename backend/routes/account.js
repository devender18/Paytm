const {Router} = require('express');
const router = Router();
const {Accounts} = require('../db/db');
const { authMiddleware } = require('../middleware');
const mongoose = require('mongoose');


router.get("/balance",authMiddleware,async(req,res)=>{

    const account = await Accounts.findOne({
        userId : req.userId
    })
    
    res.json({
        balance : account.balance
    })
})

// bad solution -- the issue here is if something happened wrong after sending the money it won't credit to another accoutn but it got deducted from the first one
// router.get("/transfer",authMiddleware,async(req,res)=>{

//     const amountToTransfer = req.body.amount;
//     const to = req.body.to;

//     const account = Accounts.findOne({
//         userId : req.userId
//     })

//     if (account.balance < amountToTransfer){
//         return res.status(400).json({
//             msg : "Insufficient balance"
//         })
//     }

//     const toAccount = Accounts.findOne({
//         userId: to
//     });

//     if (!toAccount){
//         return res.status(400).json({
//             msg : "Invalid account"
//         })
//     }

//     await Accounts.updateOne({
//         userId : req.userId
//     },{
//         $inc : {
//             balance : -amountToTransfer
//         }
//     })

//     await Accounts.updateOne({
//         userId : to
//     }, {
//         $inc : {
//             balance : amountToTransfer
//         }
//     })

//     res.json({
//         msg : "Transfer successful"
//     })
// })

// good solution
router.post('/transfer',authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    const account = Accounts.findOne({
        userId : req.userId
    })

    if (!account || account.balance < amount){
        session.abortTransaction();
        return res.status(400).json({
            msg : "Insufficient balance"
        })
    }
    console.log("To account from body-->",to)
    const toAccount = Accounts.findOne({
        userId : to
    })

    console.log("To account balance",toAccount.balance)

    if (!toAccount){
        session.abortTransaction();
        return res.status(400).json({
            msg : "Invalid account"
        })
    }

    //Transfer the amount
    await Accounts.updateOne({
        userId : req.userId
    },{
        $inc : {
            balance : -amount
        }
    }).session(session);

    await Accounts.updateOne({
        userId : to
    },{
        $inc : {
            balance : amount
        }
    }).session(session);

    //commit the Transaction
    await session.commitTransaction();
    res.json({
        msg : "Transfer successful"
    });

});


module.exports = router;