const Product = require("../models/productModel");
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// create product
const createProduct = asyncHandler(async (req, res) => {
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const newProduct = await Product.create(req.body);
		res.json(newProduct);
	} catch (error) {
		throw new Error(error);
	}
});

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
	try {
		// Filtering Products
		const queryObj = { ...req.query };
		const excludeFields = ["page", "sort", "limit", "fields"];

		excludeFields.forEach((ele) => delete queryObj[ele]);

		let queryStr = JSON.stringify(queryObj);
		queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
		let query = Product.find(JSON.parse(queryStr));

		// Sorting
		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			query = query.sort(sortBy);
		} else {
			query = query.sort("-createdAt");
		}

		// limiting the fields
		if (req.query.fields) {
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
		if (req.query.page) {
			const productCount = await Product.countDocuments();
			if (skip >= productCount) {
				throw new Error("This page doesnot exists.");
			}
		}

		const product = await query;
		res.json(product);
	} catch (error) {
		throw new Error(error);
	}
});

// get a single product
const getAProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const getProduct = await Product.findById(id);
		res.json(getProduct);
	} catch (error) {
		throw new Error(error);
	}
});

// update a product
const updateProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const updatedProd = await Product.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(updatedProd);
	} catch (error) {
		throw new Error(error);
	}
});

// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const deletedProd = await Product.findByIdAndDelete(id);
		res.json(deletedProd);
	} catch (error) {
		throw new Error(error);
	}
});
const addToWishlist = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { prodId } = req.body;
	try {
		const user = await User.findById(_id);
		const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
		if (alreadyadded) {
			let user = await User.findByIdAndUpdate(
				_id,
				{
					$pull: { wishlist: prodId },
				},
				{
					new: true,
				}
			);
			res.json(user);
		} else {
			let user = await User.findByIdAndUpdate(
				_id,
				{
					$push: { wishlist: prodId },
				},
				{
					new: true,
				}
			);
			res.json(user);
		}
	} catch (error) {
		throw new Error(error);
	}
});

const rating = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { star, prodId, comment } = req.body;
	try {
		const product = await Product.findById(prodId);
		let alreadyRated = product.ratings.find(
			(userId) => userId.postedby.toString() === _id.toString()
		);
		if (alreadyRated) {
			const updateRating = await Product.updateOne(
				{
					ratings: { $elemMatch: alreadyRated },
				},
				{
					$set: { "ratings.$.star": star, "ratings.$.comment": comment },
				},
				{
					new: true,
				}
			);
		} else {
			const rateProduct = await Product.findByIdAndUpdate(
				prodId,
				{
					$push: {
						ratings: {
							star: star,
							comment: comment,
							postedby: _id,
						},
					},
				},
				{
					new: true,
				}
			);
		}
		const getallratings = await Product.findById(prodId);
		let totalRating = getallratings.ratings.length;
		let ratingsum = getallratings.ratings
			.map((item) => item.star)
			.reduce((prev, curr) => prev + curr, 0);
		let actualRating = Math.round(ratingsum / totalRating);
		let finalproduct = await Product.findByIdAndUpdate(
			prodId,
			{
				totalrating: actualRating,
			},
			{ new: true }
		);
		res.json(finalproduct);
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = {
	createProduct,
	getAllProducts,
	getAProduct,
	updateProduct,
	deleteProduct,
	addToWishlist,
	rating,
};
