const { embedNeutral } = require("../../config.js");
const { leave } = require("../../config.js");
const { MessageEmbed} = require("discord.js");

module.exports = async (guildMemberRemove, member) => {

	let nr = member.guild.memberCount

	const embed = new MessageEmbed()
		.setTitle('**Member Left**')
		.setDescription(`${member.user} left the server! We hope you enjoyed your stay!\nNow this server has ${nr} members!`)
		.setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512 }))
		.setColor(embedNeutral)
		.setTimestamp()

	member.guild.channels.cache.get(leave).send({ embeds: [embed] })
}
