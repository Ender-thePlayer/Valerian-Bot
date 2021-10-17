const { Client, Intents, DiscordAPIError } = require('discord.js');

const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = 'js!';

const fs = require('fs');

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.error(error)
    let jsfiles = files.filter(f => f.split(".").pop() === "js")
    if (jsfiles.length <= 0) {
      return console.log("No commands to log in FOLDER NAME")
    }
    console.log(`Loading ${jsfiles.length} commands from FOLDER NAME...`)
    jsfiles.forEach((f,i) => {
      let props = require(`./commands/${f}`)
      console.log(`${i + 1}: ${f} loaded!`)
      client.commands.set(f, props)
    })
  });

client.once('ready',() => {
    console.log('bot is on')
    client.user.setActivity("js!help - Help Command", {
      type: "PLAYING",
    });
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        let cmd = client.commands.get(command+".js")
            if (cmd) cmd.run(client, message, args, prefix)
    } 
});

client.on('message', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'changelogs'){
      let cmd = client.commands.get(command+".js")
          if (cmd) cmd.run(client, message, args, prefix)
  } 
});

client.on('message', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'help'){
      let cmd = client.commands.get(command+".js")
          if (cmd) cmd.run(client, message, args, prefix)
  }
});

client.login('ODEwODU2ODYwNzUxNDk1MTk4.YCpvTA._UOemaoVxge92Ucfoocm9j9HDsQ')