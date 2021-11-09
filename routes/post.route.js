const express = require("express")
const postController = require("../controllers/post.controller")

const router = express.Router()

router
	.route("/")
	.get(postController.getAll)
	.post(postController.create)

router
	.route("/:id")
	.get(postController.getOne)
	.patch(postController.update)
	.delete(postController.delete)

module.exports = router