const { embedNeutral } = require("../../config.js");
const { EmbedBuilder} = require("discord.js");

module.exports = async ( player, newChannel) => {

      	if (!newChannel) {
        	await player.destroy();

			let embed = new EmbedBuilder()
			.setDescription("Stopped the music because I was disconnected from the voice channel.")
			.setColor(embedNeutral)
	
        	return message.channel.send({ embeds: [embed] })
      	
		} else {
        	player.voiceChannel = newChannel;
      	}
}