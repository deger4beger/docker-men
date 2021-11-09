const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Post title required"]
	},
	body: {
		type: String,
		required: [true, "Post body required"]
	}
})

module.exports = mongoose.model("Post", postSchema)