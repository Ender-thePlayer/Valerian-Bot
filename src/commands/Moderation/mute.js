const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const ms = require('ms');
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "mute",
    category: "Moderation",
    description: "Mutes a user for a defined time.",
	aliases: "",
    usage: "<user>",
	enabled: true,
	owner: false,
	botPerms: ['ModerateMembers'],
	userPerms: ['ModerateMembers'],
    nsfw: false,
    args: true,
    execute: async (message, args, client) => {

        let target = message.mentions.members.first();
        let time = args.slice(1).join(" ");

        if (!target) {
            let embed = new EmbedBuilder()
                .setDescription('Please mention somebody to mute!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };

        if(!time){
            const embed = new EmbedBuilder()
                .setDescription('Please specify the time to mute for!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        }

        try{
            let tme = ms(time)

            if(isNaN(tme)){
                const embed = new EmbedBuilder()
                    .setDescription('Please specify the time to mute for!')
                    .setColor(embedError)
    
                return message.reply( { embeds: [embed] })
            }
            if(tme > 604800000) {
                const embed = new EmbedBuilder()
                    .setDescription('You cannot mute someone for more than 7 days!')
                    .setColor(embedError)
    
                return message.reply( { embeds: [embed] })
            }

            target.timeout(tme)

            const embed = new EmbedBuilder()
                .setDescription(`${target} was muted for **${time}**!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
            message.reply( { embeds: [embed] })

        } catch(error) {
            return;
        }
    }
}
