const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "slowmode",
    category: "Moderation",
    description: "Sets a time between sending messages",
    aliases: ['slow'],
    usage: "[amount]",
	enabled: true,
	owner: false,
	botPerms: ['ManageChannels'],
	userPerms: ['ManageChannels'],
    nsfw: false,
    args: false,
    execute: async (message, args, client) => {

        if (!args[0]) {
            try{
                message.channel.setRateLimitPerUser(0);

                let embed = new EmbedBuilder()
                    .setDescription(`Slowmode turned off!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
                return message.reply( { embeds: [embed] })

            } catch(error) {
                return;
            }
        };

        const raw = ms(args.slice(0).join(" "));

        if(isNaN(raw)){
            let embed = new EmbedBuilder()
                .setDescription('This isn`t a valid number!')
                .setColor(embedError)
                
            return message.reply( { embeds: [embed] })
        };

        if(raw < 1) {
            let embed = new EmbedBuilder()
                .setDescription('You cannot set a slowmode lower than 1 second!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };

        if(raw > 21600000) {
            let embed = new EmbedBuilder()
                .setDescription('You cannot set higher than 6 hours!')
                .setColor(embedError)
            return message.reply( { embeds: [embed] })
        };

        try{
            message.channel.setRateLimitPerUser(raw / 1000)

            let embed = new EmbedBuilder()
                .setDescription(`Slowmode set to **${args.slice(0).join(" ")}**!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
            message.reply( { embeds: [embed] })
            
        } catch(error) {
            return;
        }
    }
};