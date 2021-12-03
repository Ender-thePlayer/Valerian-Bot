// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { MessageEmbed} = require("discord.js");
const moment = require('moment');

// events \\

module.exports = async (client, guild) => {
  
		const channel = client.channels.cache.get(client.config.logs);
		let own = await guild.fetchOwner()
	
		const embed = new MessageEmbed()
			.setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
			.setTitle(`**Bot Invited**`)
			.addField('Name', `\`${guild.name}\``)
			.addField('ID', `\`${guild.id}\``)
			.addField('Owner', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``)
			.addField('Member Count', `\`${guild.memberCount}\` Members`)
			.addField('Creation Date', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
			.setColor(client.embedColor)
			.addField(`${client.user.username}'s Server Count`, `\`${client.guilds.cache.size}\` Severs`)
			.setTimestamp()
		channel.send({embeds: [embed]})
	
}
