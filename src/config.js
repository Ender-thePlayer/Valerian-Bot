require('dotenv').config()

module.exports = {
    token: process.env.TOKEN || "",  // your bot token
    prefix: process.env.PREFIX || "js!", // bot prefix
    ownerID: process.env.OWNERID || "", //your discord id
    SpotifyID: process.env.SPOTIFYID || "", // spotify client id
    SpotifySecret: process.env.SPOTIFYSECRET || "", // spotify client secret
    mongourl: process.env.MONGO_URI || "", // MongoDb URL
    embedNeutral: process.env.COLOR_NEUTRAL || "#303236", // neutral color
    embedError: process.env.COLOR_ERROR || "3ff0004", // error color 
    embedSuccess: process.env.COlOR_SUCCESS || "#00ff0a", // success color
    logs: process.env.LOGS || "", // channel id for guild create and delete logs 

  nodes: {
     
      host: "disbotlistlavalink.ml",
      port: 443,
      password: "LAVA",
      id: "BbVb Core",
      retryDelay: 3000,
      secure: true
    
    },
 
}
