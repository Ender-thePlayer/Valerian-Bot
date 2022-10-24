const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "userinfo",
    category: "Guild",
    description: "Sends the info about you or a user",
	aliases: ['ui'],
    usage: "[user]",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    execute: async (message, args, client) => {

        const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let day = moment(member.user.createdAt).format('dddd Do MMMM YYYY')
        let date = moment(member.user.createdAt).format('LT')
        let time = moment(member.user.createdAt).fromNow()

        let day1 = moment(member.joinedAt).format('dddd, MMMM Do YYYY')
        let date1 = moment(member.joinedAt).format('LT')
        let time1 = moment(member.joinedAt).fromNow()

        const embed = new EmbedBuilder()
            .setColor(embedNeutral)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
            
            .setDescription(
            `**Name:** ${member.user.tag} - <@${member.id}>
            **ID:** ${member.id}
            **Roles:** ${member.roles.cache.size -1} | **Highest:** ${member.roles.highest}\n
            **Created:** ${day} ${date} ${time}
            **Joined:** ${day1} ${date1} ${time1}`
            )
            
        
        message.reply( { embeds: [embed] })
    
	},
};
