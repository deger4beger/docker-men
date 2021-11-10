const express = require("express")
const postController = require("../controllers/post.controller")
const protect = require("../middlewares/auth.middleware")

const router = express.Router()

router
	.route("/")
	.get(protect, postController.getAll)
	.post(protect, postController.create)

router
	.route("/:id")
	.get(protect, postController.getOne)
	.patch(protect, postController.update)
	.delete(protect, postController.delete)

module.exports = router