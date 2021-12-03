require('dotenv').config()

module.exports = {
    token: process.env.TOKEN || "ODEwODU2ODYwNzUxNDk1MTk4.YCpvTA.B2D_gh45w-Zwr2vhoZNb3PfUfmY",  // your bot token
    prefix: process.env.PREFIX || "v!", // bot prefix
    ownerID: process.env.OWNERID || "506097799536967710", //your discord id
    SpotifyID: process.env.SPOTIFYID || "f8983d6d343c44b2b90198e7ab937e5c", // spotify client id
    SpotifySecret: process.env.SPOTIFYSECRET || "f7f47e3177d14dff83f8063e30c33029", // spotify client secret
    mongourl: process.env.MONGO_URI || "mongodb+srv://ender:Anto anto 2018@cluster0.ureld.mongodb.net/data", // MongoDb URL
    embedNeutral: process.env.COLOR_NEUTRAL || "#303236", // neutral color
    embedError: process.env.COLOR_ERROR || "3ff0004", // error color 
    embedSuccess: process.env.COlOR_SUCCESS || "#00ff0a", // success color
    logs: process.env.LOGS || "914228066606252053", // channel id for guild create and delete logs 

  nodes: {
     
      host: "disbotlistlavalink.ml",
      port: 443,
      password: "LAVA",
      id: "BbVb Core",
      retryDelay: 3000,
      secure: true
    
    },
 
}
