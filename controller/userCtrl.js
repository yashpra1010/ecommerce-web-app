const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");


const createUser = asyncHandler( async (req,res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        // Create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        // User already exists
        throw new Error("User already exists!")
    }
});

const loginUserCtrl = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    
    // check for user existence
    const findUser = await User.findOne({email:email});
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json(findUser);
    }
    else {
        throw new Error("Invalid credentials!")
    }
});

module.exports = { createUser,loginUserCtrl };