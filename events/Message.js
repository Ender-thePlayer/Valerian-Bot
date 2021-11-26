require('dotenv').config()
const client = require("../index")
const Discord = require('discord.js')

client.on("messageCreate", async (message) => {
    
    if (message.author.bot || !message.guild) return

    if(message.mentions.has(client.user)){
        let embed = new Discord.MessageEmbed()
          .setTitle('**Bot Description**')
          .setDescription(`Hello, my name is **Project Valerian**, a project made to convert Brobotel the Bot to js. \nMy prefix is \`\`js!\`\`. Type \`\`js!help\`\` or \`\`js!aliases\`\` to see the list of valid commands!`)
          .addFields(
            { name: 'Quick Links', value: "**[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=810856860751495198&permissions=8&scope=bot)** | **[Our Website](http://brobotelbot.ml)**"}
        )
          .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
          .setColor('#22a5b1')
    
        return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})}

    const prefix = process.env.PREFIX

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const cmd = args.shift().toLowerCase()

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd))

    if (!command) {

        let embed = new Discord.MessageEmbed()
          .setTitle('**Error Occurred**')
          .setDescription(`\`\`js!${commandName}\`\` is not a valid command! Type \`\`js!help\`\` or \`\`js!aliases\`\` to see the list of valid commands!`)
          .setColor('#000000')
    
        return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})}

    if (command) {
        command.execute(client, message, cmd, args, Discord)
    }

})