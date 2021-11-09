const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")
const {
	NODE_PORT,
	MONGO_IP,
	MONGO_PORT,
	MONGO_USER,
	MONGO_PASSWORD
} = require("./config/config")


const app = express()

app.use(express.json())
app.use(morgan("dev"))

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}
	@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectOrRetry = () => {
	mongoose
		.connect(mongoURL)
		.then(() => console.log("Mongo is working"))
		.catch((e) => {
			console.log(e)
			setTimeout(connectOrRetry, 5000)
		})
}

connectOrRetry()


app.get("/", (req, res) => {
	return res.send("<h2>Docker hello !!!</h2>")
})


app.use("/api/v1/posts", postRouter)
app.use("/api/v1/user", userRouter)

// Handling errors
app.use((req, res, next) => {
	const error = new Error("Not found")
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 505)
	res.json({
		error: {
			message: error.message
		}
	})
})

app.listen(NODE_PORT, () => console.log(`App running on port ${NODE_PORT}`))




// docker commands:

// base commands:
	// docker build -t <name> .(<path to dockerfile, "." if here>)
	// docker run -v $cd$:/app:ro(winDir:dockerDir)(for copy files - hmr)(ro - read only)
		// -v /app/node_modules (if node modules deleted)
		// --env-file ./.env
		// -p 3030:3030(winPort:appPort) -d --name <name of container> <name of image>
	// docker rm docker-test-cont -f (delete container) (-fv if want to delete volumes as well)

// useful:
	// help
	// docker <image|volume|network> ls (list of images)
	// docker ps (list of containers) <-a> (for all containers, stopped or crashed) (docker-compose ps)
	// docker <image|volume> prune (delete all dangling/itermediate images (none:none))
	// docker logs <name of container> <-f>
	// docker <network> inspect <container name>
	// docker exec -it <name of container> bash (insted of bash(example): mongo -u <user> -p <password>)

	// for bash:
		// exit (from bash)
		// ls (list of files in bash)
		// cat <file name> (show file content)
		// touch / rm <filename>
		// printenv
		// ping <other container>
	// for compose:
		// docker-compose up -d (--build)
		// docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
		// docker-compose down -v (volumes down)