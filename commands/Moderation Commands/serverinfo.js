const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    description: "Shows all Info about the Server!",
	execute: async (message, args, client) => {

        let embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#dd6fb9')
            .setTitle(`**Bot Command**`)
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
            .addFields(
        
                {
                    name: "Name: ",
                    value: `${message.guild.name}`,
                    inline: false
                },

                {
                    name: "Server ID: ",
                    value: `${message.guild.id}`,
                    inline: false
                },

                {
                    name: "Server was created on: ",
                    value: `${moment(message.guild.createdTimestamp).format('dddd, MMMM Do YYYY')}, ${moment(message.guild.createdTimestamp).format('LT')} (${moment(message.guild.createdTimestamp).fromNow()})`,
                    inline: false
                },

                {
                    name: "Channels: ",
                    value: `${channels.size} Total, ${channels.filter(channel => channel.type === 'GUILD_TEXT').size} Text, ${channels.filter(channel => channel.type === 'GUILD_VOICE').size} Voice, ${channels.filter(channel => channel.type === 'GUILD_CATEGORY').size} Categories `,
                    inline: false
                },

                {
                    name: "Owner: ",
                    value: `<@${message.guild.ownerId}>`,
                    inline: false
                },

                {
                    name: "Member: ",
                    value: `${message.guild.memberCount} Members`,
                    inline: true
                },

                {
                    name: "Roles Count: ",
                    value: `${message.guild.roles.cache.size -1} Roles`,
                    inline: true,
                },

                {
                    name: `Region: `,
                    value: `${message.guild.preferredLocale}`,
                    inline: true
                },

                {
                    name: `Verification: `,
                    value: message.guild.verified ? 'Verified' : `Not Verified`,
                    inline: true
                },
                {
                    name: 'Boosts: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount} boosts` : `There are no boosts`,
                    inline: true
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `${message.guild.emojis.cache.size} emojis` : 'There are no emojis' ,
                    inline: true
                }
            )
        await message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
    
	},
};
