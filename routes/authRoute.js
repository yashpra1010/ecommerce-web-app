const express = require("express");
const { createUser, loginUserCtrl, getAllUsers,getAUser,deleteUser,updateUser, blockUser,unblockUser,logout,handleRefreshToken,updatePassword,forgotPasswordToken,resetPassword } = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/logout", logout)
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/reset-password/:token", resetPassword);
router.put("/password",authMiddleware, updatePassword);
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.delete("/:id", deleteUser);
router.put("/edit", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;