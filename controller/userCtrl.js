const { generateToken } = require("../config/jwtToken,js");
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
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)

        });
    }
    else {
        throw new Error("Invalid credentials!")
    }
});

// Get All Users
const getAllUsers = asyncHandler(async (req,res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error)
    }
})

// Get a single user
const getAUser = asyncHandler(async (req,res) => {
    try {
        const { id } = req.params;
        const getAUser = await User.findById(id);
        res.json(getAUser);
    } catch (error) {
        throw new Error(error)
    }
})

// Delete a single user
const deleteUser = asyncHandler(async (req,res) => {
    try {
        const { id } = req.params;
        const deleteAUser = await User.findByIdAndDelete(id);
        res.json(deleteAUser);
    } catch (error) {
        throw new Error(error)
    }
})

// Update a user
const updateUser = asyncHandler(async (req,res) => {
    try {
        const { _id } = req.user;
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body.firstname,
            lastname: req?.body.lastname,
            email: req?.body.email,
            mobile: req?.body.mobile,
        }, { new: true,});
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error)
    }
})

// Block user
const blockUser = asyncHandler( async (req,res) => {
    const { id } = req.params;
    try {
        const block = await User.findOneAndUpdate({_id:id}, { isBlocked: true }, { new: true });
    res.json({ message:"User is blocked." });
    } catch (error) {
        throw new Error(error)
    }
});

// Unblock user
const unblockUser = asyncHandler( async (req,res) => {
    const { id } = req.params;
    try {
        const unblock = await User.findOneAndUpdate({_id:id}, { isBlocked: false }, { new: true });
        res.json({ message:"User is unblocked." });
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = {
    createUser,
    loginUserCtrl,
    getAllUsers,
    getAUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser };