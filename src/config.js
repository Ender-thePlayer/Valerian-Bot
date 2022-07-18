require('dotenv').config()

module.exports = {
  token: process.env.TOKEN || "", 
  prefix: process.env.PREFIX || "",
  ownerID: process.env.OWNERID || "",
  SpotifyID: process.env.SPOTIFYID || "",
  SpotifySecret: process.env.SPOTIFYSECRET || "",
  mongourl: process.env.MONGO_URL || "",
  embedNeutral: process.env.COLOR_NEUTRAL || "#303236",
  embedError: process.env.COLOR_ERROR || "3ff0004", 
  embedSuccess: process.env.COlOR_SUCCESS || "#00ff0a",
  logs: process.env.LOGS || "",

  nodes: {
    
    host: "54.37.6.86",
    port: 80,
    password: "Blacky#9125",
    id: "local",
    retryDelay: 3000,
    secure: false
  
  },

}
