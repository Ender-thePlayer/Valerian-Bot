const { embedNeutral } = require("../../config.js");
const { EmbedBuilder} = require("discord.js");
const pre = require("../../schema/bye.js");

module.exports = async (guildMemberRemove, member) => {
	if (!member) return;

    const ress =  await pre.findOne({guildid: member.guild.id})

	if(!ress){
		return console.log('eee');
	}
	if(ress == null){
		return console.log('vvv');
	}

	let nr = member.guild.memberCount
	if(ress && ress.channelid)leave = ress.channelid;

	const embed = new EmbedBuilder()
		.setTitle('**Member Left**')
		.setDescription(`${member.user} left the server! We hope you enjoyed your stay!\nNow this server has ${nr} members!`)
		.setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512 }))
		.setColor(embedNeutral)
		.setTimestamp()

	try {
		member.guild.channels.cache.get(leave).send({ embeds: [embed] })
	} catch (e) {
		return console.log('nnn', e)
	}
}
