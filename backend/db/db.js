const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://devendersingh2k:CVfWa8DWQbmQZNCT@cluster0.9gy2k2z.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type: String,
        required : true
    },

    username : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },
});

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },

    balance : {
        type : Number,
        required : true
    }
});


const User = mongoose.model("User",userSchema);
const Accounts = mongoose.model("Accounts",accountSchema);

module.exports = {
    User,
    Accounts
}