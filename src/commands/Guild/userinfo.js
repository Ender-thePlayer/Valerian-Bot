// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');

// command \\

module.exports = {
    name: "userinfo",
    category: "Moderation",
    aliases: [ 'ui' ],
    description: "UserInfo Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

        const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let embed = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setColor(embedNeutral)
            .setTitle(`**UserInfo Command**`)
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
            .addFields(

                {
                    name: "Name: ",
                    value: `${member.user.tag}`,
                    inline: false
                },

                {
                    name: "User ID: ",
                    value: `${member.id}`,
                    inline: false
                },

                {
                    name: "Joined Discord on: ",
                    value: `${moment(member.user.createdAt).format('dddd Do MMMM YYYY')}, ${moment(member.user.createdAt).format('LT')} (${moment(member.user.createdAt).fromNow()})`,
                    inline: false
                },

                {
                    name: "Joined Server on: ",
                    value: `${moment(member.joinedAt).format('dddd, MMMM Do YYYY')}, ${moment(member.joinedAt).format('LT')} (${moment(member.joinedAt).fromNow()})`,
                    inline: false
                },

                {
                    name: "Roles Count: ",
                    value: `${member.roles.cache.size -1} Roles`,
                    inline: true
                },

                {
                    name: "Highest Role: ",
                    value: `${member.roles.highest}`,
                    inline: true
                },
            )
            message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
    
	},
};
