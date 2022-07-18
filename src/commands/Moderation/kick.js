const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js")
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    category: "Moderation",
    aliases: [],
    description: "Kick a user from the server.",
    args: false,
    usage: `<user> [reason]`,
    permission: ['KICK_MEMBERS'],
    owner: false,
    execute: async (message, args, client) => {

        const target = message.mentions.users.first(); 
        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); 
        if (!reason) reason = "None";

        if (!args.length) {
            let embed = new MessageEmbed()
                .setDescription('Please mention somebody to kick!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        }
    
        if (!mentionMember) {
            let embed = new MessageEmbed()
                .setDescription('That isn`t a user!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };

        if(!mentionMember.kickable) {
            let embed = new MessageEmbed()
                .setDescription(`This user is a moderator!`)
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };

        mentionMember.kick({ reason: reason })

        const embed = new MessageEmbed()
            .setDescription(`${target} was kicked with the reason: **${reason}**!`)
            .setColor(embedSuccess)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        message.reply( { embeds: [embed] })
    }
}