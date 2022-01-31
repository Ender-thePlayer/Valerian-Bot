// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { MessageEmbed} = require("discord.js");
const moment = require('moment');

// events \\

module.exports = async (GuildMemberAdd, member) => {
  
	let welcomeRole = member.guild.roles.cache.find(role => role.id === '846002032811835442');
	member.roles.add(welcomeRole);
	let nr = member.guild.memberCount

	const embed = new MessageEmbed()
		.setTitle('**Member Joined**')
		.setDescription(`${member.user} joined the server! We hope to enjoy your stay!\nNow this server has ${nr} members!`)
		.setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512 }))
		.setColor(embedNeutral)
		.setTimestamp()

	member.guild.channels.cache.get("935930499535360030").send({ embeds: [embed] })

}
