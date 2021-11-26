const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "userinfo",
    aliases: ["ui"],
    description: "Shows all Info about the Server!",
	execute: async (message, args) => {

        const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const embed = new Discord.MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setColor('#dd6fb9')
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
    await message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)});
    
	},
};
