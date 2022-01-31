// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const pre = require("../../schema/prefix.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "info",
    category: "Utility",
    aliases: [ 'botinfo', 'i' ],
    description: "Info Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        const embed = new MessageEmbed()
            .setTitle('**Info Command**')
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
            .addFields(
                { name: 'Bot Stuff:' , value: `Tag: <@${client.user.id}> \nID: ${client.user.id}` },
                { name: 'Serving:' , value: `${client.guilds.cache.size} servers`, inline: true},
                { name: 'Version:' , value: `1.1.0`, inline: true },
                { name: 'DJS Version:' , value: `${require("discord.js").version}`, inline: true },
                { name: 'Uptime:', value: `${Math.round(days)} day(s), ${Math.round(hours)} hrs, ${Math.round(minutes)} mins, ${Math.round(seconds)} sec`},
                { name: 'Links:' , value: `**[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=810856860751495198&permissions=8&scope=bot)** \n⏵ Add Bot to Your Server!` },
            )
        
        message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
   }
};