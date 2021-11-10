module.exports = {
	NODE_PORT: process.env.NODE_PORT || 3030,
	MONGO_IP: process.env.MONGO_IP || "mongo",
	MONGO_PORT: process.env.MONGO_PORT || 27017,
	MONGO_USER: process.env.MONGO_USER,
	MONGO_PASSWORD: process.env.MONGO_PASSWORD,
	REDIS_URL: process.env.REDIS_URL || "redis", // IP-address
	REDIS_PORT: process.env.REDIS_PORT || 6379,
	REDIS_SECRET: process.env.REDIS_SECRET
}