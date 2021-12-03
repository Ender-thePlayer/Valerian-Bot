require('dotenv').config()

module.exports = {
    token: process.env.TOKEN || "",  // your bot token
    prefix: process.env.PREFIX || "", // bot prefix
    ownerID: process.env.OWNERID || "", //your discord id
    SpotifyID: process.env.SPOTIFYID || "", // spotify client id
    SpotifySecret: process.env.SPOTIFYSECRET || "", // spotify client secret
    mongourl: process.env.MONGO_URL || "", // MongoDb URL
    embedNeutral: process.env.COLOR_NEUTRAL || "", // neutral color
    embedError: process.env.COLOR_ERROR || "", // error color 
    embedSuccess: process.env.COlOR_SUCCESS || "", // success color
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
