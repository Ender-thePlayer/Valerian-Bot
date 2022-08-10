const { embedNeutral } = require("../../config.js");
const { MessageEmbed} = require("discord.js");
  
module.exports = async (client, player, track, payload) => {

		const channel = client.channels.cache.get(player.textChannel);

		let embed = new MessageEmbed()
		.setDescription(`Music queue has ended.`)
		.setColor(embedNeutral)

		channel.send({embeds: [embed] })
		player.destroy();
}