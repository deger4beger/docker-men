const express = require("express")
const mongoose = require("mongoose")
const { NODE_PORT, PORT, MONGO_IP, MONGO_PORT, MONGO_USER,
	MONGO_PASSWORD } = require("./config/config")

const app = express()

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


app.get("/", (req, res) => {
	return res.send("<h2>Docker hello</h2>")
})


const port = NODE_PORT
app.listen(port, () => console.log(`App running on port ${port}`))




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
	// docker logs <name of container>
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