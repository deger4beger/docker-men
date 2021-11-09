const Post = require("../models/post.model")

exports.getAll = async (req, res, next) => {
	try {
		const posts = await Post.find()
		res.status(200).json({
			status: "success",
			count: posts.length,
			data: {
				posts
			}
		})
	} catch (e) {
		res.status(400).json({
			status: "fail"
		})
	}
}

exports.getOne = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id)

		res.status(200).json({
			status: "success",
			data: {
				post
			}
		})
	} catch (e) {
		res.status(400).json({
			status: "fail"
		})
	}
}

exports.create = async (req, res, next) => {
	try {
		const post = await Post.create(req.body)

		res.status(200).json({
			status: "success",
			data: post
		})
	} catch (e) {
		res.status(400).json({
			status: "fail"
		})
	}
}

exports.update = async (req, res, next) => {
	try {
		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		res.status(200).json({
			status: "success",
			data: post
		})
	} catch (e) {
		res.status(400).json({
			status: "fail"
		})
	}
}

exports.delete = async (req, res, next) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id)

		res.status(200).json({
			status: "success",
			data: null
		})
	} catch (e) {
		res.status(400).json({
			status: "fail"
		})
	}
}