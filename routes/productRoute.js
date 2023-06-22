const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { 
    createProduct,
    getAllProducts,
    getAProduct,
    updateProduct,
    deleteProduct } = require("../controller/productCtrl");

router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/update/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;