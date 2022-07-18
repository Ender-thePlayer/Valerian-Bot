const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "slowmode",
    category: "Moderation",
    aliases: [ 'slow' ],
    description: "Set a time between sending messages.",
    args: false,
    usage: `[amount]`,
    permission: ['MANAGE_CHANNELS'],
    owner: false,
    execute: async (message, args, client) => {

        if (!args[0]) {
            message.channel.setRateLimitPerUser(0);

            let embed = new MessageEmbed()
                .setDescription(`Slowmode turned off!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            return message.reply( { embeds: [embed] })
        };

        const raw = args[0];

        if(isNaN(raw)){
            let embed = new MessageEmbed()
                .setDescription('This isn`t a valid number!')
                .setColor(embedError)
                
            return message.reply( { embeds: [embed] })
        };

        if(raw < 1) {
            let embed = new MessageEmbed()
                .setDescription('You cannot set a slowmode lower than 1 second!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };

        if(raw > 21600) {
            let embed = new MessageEmbed()
                .setDescription('You cannot set higher than 21600 seconds (6hr)!')
                .setColor(embedError)
            return message.reply( { embeds: [embed] })
        };


        message.channel.setRateLimitPerUser(raw)

        let embed = new MessageEmbed()
            .setDescription(`Slowmode set to ${raw} seconds!`)
            .setColor(embedSuccess)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        message.reply( { embeds: [embed] })
    
    }
};