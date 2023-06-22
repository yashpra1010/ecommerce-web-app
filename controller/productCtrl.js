const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify");

// create product
const createProduct = asyncHandler(async (req,res)=>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error)
    }
});

// get all products
const getAllProducts = asyncHandler(async (req,res)=>{
    try {
        // Filtering Products
        const queryObj = { ...req.query };
        const excludeFields = ['page','sort','limit','fields'];
        
        excludeFields.forEach((ele) => delete queryObj[ele]);

        let queryStr = JSON.stringify(queryObj);
        queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Product.find(JSON.parse(queryStr));

        // Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy)
        }
        else {
            query = query.sort("-createdAt")
        }

        // limiting the fields
        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // paging
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);
        if(req.query.page){
            const productCount = await Product.countDocuments();
            if(skip >= productCount){
                throw new Error("This page doesnot exists.")
            }
        }

        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error)
    }
})

// get a single product
const getAProduct = asyncHandler(async (req,res)=>{
    try {
        const { id } = req.params;
        const getProduct = await Product.findById(id)
        res.json(getProduct);
    } catch (error) {
        throw new Error(error)
    }
})

// update a product
const updateProduct = asyncHandler(async (req,res)=> {
    try {
        const { id } = req.params;
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updatedProd = await Product.findByIdAndUpdate(id,req.body, { new:true })
        res.json(updatedProd);
    } catch (error) {
        throw new Error(error)
    }
});

// delete a product
const deleteProduct = asyncHandler(async (req,res)=> {
    try {
        const { id } = req.params;
        const deletedProd = await Product.findByIdAndDelete(id);
        res.json(deletedProd);
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = { 
    createProduct,
    getAllProducts,
    getAProduct,
    updateProduct,
    deleteProduct,
};