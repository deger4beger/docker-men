const bcrypt = require("bcryptjs")
const User = require("../models/user.model")

exports.signUp = async (req, res, next) => {
	try {
		const { username, password } = req.body
		const hash = await bcrypt.hash(password, 12)
		const user = await User.create({
			username,
			password: hash
		})
		req.session.user = user
		res.status(200).json({
			status: "success",
			data: {
				user
			}
		})
	} catch (e) {
		res.status(400).json({
			status: "fail"
		})
	}
}

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({username})
		if (!user) {
			return res.status(400).json({
				status: "fail",
				message: "User not found"
			})
		}
		const isCorrect = await bcrypt.compare(password, user.password)
		if (!isCorrect) {
			return res.status(400).json({
				status: "fail",
				message: "Incorrect username or password"
			})
		}
		req.session.user = user
		res.status(200).json({
			status: "success",
			data: {
				user
			}
		})
	} catch (e) {
		res.status(400).json({
			status: "fail"
		})
	}
}