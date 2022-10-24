const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "unmute",
    category: "Moderation",
    description: "Unmutes a user",
	aliases: ['untimeout'],
    usage: "<user>",
	enabled: true,
	owner: false,
	botPerms: ['ModerateMembers'],
	userPerms: ['ModerateMembers'],
    nsfw: false,
    args: true,
    execute: async (message, args, client) => {

        let target = message.mentions.members.first();

        if (!target) {
            let embed = new EmbedBuilder()
                .setDescription('Please mention somebody to unmute!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };

        try{
            target.timeout(50)

            const embed = new EmbedBuilder()
                .setDescription(`${target} was unmuted!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
            message.reply( { embeds: [embed] })

        } catch(error) {
            return;
        }
    }
}
