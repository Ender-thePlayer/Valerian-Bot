const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'avatar',
	description: 'description of your command',
	aliases: ['av'],
	execute: async (message, args, client) => {
        
        let member = message.mentions.members.first() || message.member;

        let embed = new Discord.MessageEmbed()

			.setColor('#dd6fb9')
            .setTitle(`${member.user.tag}'s Avatar`)
            .setImage(member.user.displayAvatarURL({dynamic: true, size: 512 }))
			.setTimestamp()
			.setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
			message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
				setTimeout(() => msg.delete(), 120000)});
        
	},
};