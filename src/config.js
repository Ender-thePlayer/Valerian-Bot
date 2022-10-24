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
	status: "", //[online, idle, dnd, invisible]
	type: "", //[PLAYING, LISTENING, WATCHING, COMPETING]
	message: "",
	interactions: {
		slash: true, // Should the interactions be enabled
		global: true, // Should the interactions be registered globally
		id: "810856860751495198", // Id of the bot
		TEST_GUILD_ID: "", // Guild ID where the interactions should be registered. 
	},
	nodes: {
		host: process.env.HOST,
		port: 80,
		password: process.env.PASSWORD,
		id: process.env.ID,
		retryDelay: 3000,
		secure: false
	},
}
