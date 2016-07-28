const development = {
	port: process.env.PORT || 9000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/newsfeed-development",
}

const production = {
	port: process.env.PORT || 9000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/newsfeed-production",
}

export default ({ development, production });
