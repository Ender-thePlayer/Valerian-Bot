require('dotenv').config()

module.exports = {
	token: process.env.TOKEN || "", 
	prefix: process.env.PREFIX || "",
	ownerID: process.env.OWNERID || "",
	SpotifyID: process.env.SPOTIFYID || "",
	SpotifySecret: process.env.SPOTIFYSECRET || "",
	mongourl: process.env.MONGO_URL || "",
	embedNeutral: "#303236",
	embedError: "#ff0004s", 
	embedSuccess: "#00ff0a",
	logs: process.env.LOGS || "",
	welcome: process.env.WKO || "",
	leave: process.env.LVE || "",
	status: "", //[online, idle, dnd, invisible]
	type: "", //[PLAYING, LISTENING, WATCHING, COMPETING]
	message: "",
	
	nodes: {
		
		host: process.env.HOST,
		port: 80,
		password: process.env.PASSWORD,
		id: process.env.ID,
		retryDelay: 3000,
		secure: false
	
	},

}
