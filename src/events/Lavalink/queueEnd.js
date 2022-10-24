const { embedNeutral } = require("../../config.js");
const { EmbedBuilder} = require("discord.js");
  
module.exports = async (client, player, track, payload) => {

		const channel = client.channels.cache.get(player.textChannel);

		let embed = new EmbedBuilder()
		.setDescription(`Music queue has ended.`)
		.setColor(embedNeutral)

		channel.send({embeds: [embed] })
		player.destroy();
}