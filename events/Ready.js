
const client = require("../index")

client.on('ready', async(message) => {
    console.log(`${client.user.tag} is now online!` + require("discord.js").version)
    
    const arrayOfStatus = [
        `Help: js!help`,
        `Is in beta Officially!`,
      ];
    
      let index = 0;
      setInterval(() => {
        if(index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        client.user.setActivity(status, { type: "PLAYING"})
        index++;
      }, 10000)
})