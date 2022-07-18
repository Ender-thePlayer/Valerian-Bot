const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bansave",
    category: "Moderation",
    aliases: [],
    description: "Ban a user from the server while saving the messages.",
    args: false,
    usage: `<user> [reason]`,
    permission: ['BAN_MEMBERS'],
    owner: false,
    execute: async (message, args, client) => {

        const target = message.mentions.users.first(); 
        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); 
        if (!reason) reason = "None";

        if (!args.length) {
            let embed = new MessageEmbed()
                .setDescription('Please mention somebody to ban!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        }

        if (!mentionMember) {
            let embed = new MessageEmbed()
                .setDescription('That isn`t a user!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };

        if(!mentionMember.bannable) {
            let embed = new MessageEmbed()
                .setDescription(`This user is a moderator!`)
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };

        mentionMember.ban({ reason: reason })

        const embed = new MessageEmbed()
            .setDescription(`${target} was banned while saving messages with the reason: **${reason}**!`)
            .setColor(embedSuccess)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        message.reply( { embeds: [embed] })
    }
}