const { embedNeutral } = require("../../config.js");
const { EmbedBuilder} = require("discord.js");
const pre = require("../../schema/welcome.js");

module.exports = async (GuildMemberAdd, member) => {
	if (!member) return;

    const ress =  await pre.findOne({guildid: member.guild.id})

	if(!ress){
		return;
	}
	if(ress == null){
		return;
	}

	if(ress && ress.channelid)welcome = ress.channelid;
	if(ress && ress.roleid)roles = ress.roleid;

	let nr = member.guild.memberCount

	const embed = new EmbedBuilder()
		.setTitle('**Member Joined**')
		.setDescription(`${member.user} joined the server! We hope to enjoy your stay!\nNow this server has ${nr} members!`)
		.setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512 }))
		.setColor(embedNeutral)
		.setTimestamp()

	try {
		member.guild.channels.cache.get(welcome).send({ embeds: [embed] })
	} catch (e) {
		return;
	}

	try {
		let welcomeRole = member.guild.roles.cache.find(role => role.id === roles);
		if(!member.manageable || !welcomeRole.editable) return;
		member.roles.add(welcomeRole);
	} catch (e) {
		return;
	}
}
