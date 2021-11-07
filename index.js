const express = require("express")

const app = express()
const port = process.env.PORT || 3030

app.get("/", (req, res) => {
	return res.send("<h2>Docker hello</h2>")
})

app.listen(port, () => console.log(`App running on port ${port}`))

// docker commands:

// docker build -t <name> .(<path to dockerfile, "." if here>)
// docker run -v $cd$:/app:ro(winDir:dockerDir)(ro - read only) -v /app/node_modules (if node modules deleted)
	// -p 3030:3030(winPort:appPort) -d --name <name of container> <name of image>
// docker rm docker-test-cont -f (delete container)
// docker image ls (list of images)
// docker ps (list of containers) <-a> (for all containers, stopped or crashed)
// docker logs <name of container>
// docker exec -it <name of container> bash
// for bash:
	// exit (from bash)
	// ls (list of files in bash)
	// cat <file name> (show file content)
	// touch / rm <filename>