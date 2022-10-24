const { embedNeutral } = require("../../config.js");
const { EmbedBuilder, version } = require("discord.js");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "botstats",
    category: "Utility",
    description: "Shows info about the bot",
    aliases: [ 'botinfo', 'i', 'info' ],
    usage: "",
	enabled: true,
	owner: false,
	userPerms: [],
	botPerms: [],
	nsfw: false,
    args: false,
    execute: async (message, args, client) => {

        const cpu = await si.cpu();

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let ccount = client.channels.cache.size;
        let scount = client.guilds.cache.size;

        let ucount = 0;

        client.guilds.cache.forEach((guild) => {
            ucount += guild.memberCount 
        })

        const embed = new EmbedBuilder()
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            .setDescription(`
            **Information**
            Tag: <@${client.user.id}>
            ID: ${client.user.id}

            **Statistics**
            Servers: ${scount}
            Channels: ${ccount}
            Users: ${ucount}
            Discord.js: v${version}
            Node: ${process.version}

            **System**
            Platform: ${os.type}
            Uptime: ${Math.round(days)} day(s), ${Math.round(hours)} hrs, ${Math.round(minutes)} mins, ${Math.round(seconds)} sec
            CPU:
                > Cores: ${cpu.cores}
                > Model: ${os.cpus()[0].model} 
                > Speed: ${os.cpus()[0].speed} MHz
            Memory:
                > Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
                > Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
                > Heap Total: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
                > Heap Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
            `)
        
        message.reply( { embeds: [embed] })
    }
};
