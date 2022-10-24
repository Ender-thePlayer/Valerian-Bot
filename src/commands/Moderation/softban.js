const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "softban",
    category: "Moderation",
    description: "Kicks a user and deletes messages sent by that user in the last 7 days.",
	aliases: "",
    usage: "<user>",
	enabled: true,
	owner: false,
	botPerms: ['BanMembers'],
	userPerms: ['BanMembers'],
    nsfw: false,
    args: true,
    execute: async (message, args, client) => {

        let target = message.mentions.members.first();
        if (!target) return;

        if(!target.bannable) {
            let embed = new EmbedBuilder()
                .setDescription(`This user is a moderator!`)
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };
   
        try{
            target.ban({ days:7 }).then(() => message.guild.members.unban(target.id).catch(err => console.log(err)))

            const embed = new EmbedBuilder()
                .setDescription(`${target} was softbanned!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
            message.reply( { embeds: [embed] })

        } catch(error) {
            return;
        }
    }
}
