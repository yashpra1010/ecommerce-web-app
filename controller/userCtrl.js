const { generateToken } = require("../config/jwtToken.js");
const { generateRefreshToken } = require("../config/refreshToken.js")
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDBID = require("../utils/validateMongoDB");
const jwt = require("jsonwebtoken");

// Register User
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


// Login User
const loginUserCtrl = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    
    // check for user existence
    const findUser = await User.findOne({email:email});
    if(findUser && await findUser.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(findUser.id, {refreshToken: refreshToken}, { new:true});
        res.cookie("refreshToken",refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*60*1000,
        })
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

// handle refresh token
const handleRefreshToken = asyncHandler( async (req,res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error("No refresh token in cookies.")
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if(!user) throw new Error("No refresh token present in database.")
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err || user.id !== decoded.id) {
            throw new Error("There is something wrong with the refresh token.");
        }
        const accessToken = generateToken(user?._id);
        res.json({accessToken});
    })
});

// logout
const logout = asyncHandler( async (req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error("No refresh token in cookies.")
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });

    if(!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); //forbidden
    }
    await User.findOneAndUpdate({refreshToken},{refreshToken:""});
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    return res.sendStatus(204); //forbidden
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
        validateMongoDBID(id);
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
        validateMongoDBID(id);
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
        validateMongoDBID(id);
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
    validateMongoDBID(id);
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
    validateMongoDBID(id);
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
    unblockUser,
    handleRefreshToken,
    logout };