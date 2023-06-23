const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createBlog, updateBlog } = require("../controller/blogCtrl");

router.post("/",authMiddleware, isAdmin, createBlog);

module.exports = router;
