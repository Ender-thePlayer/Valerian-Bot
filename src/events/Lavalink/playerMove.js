
const { embedNeutral } = require("../../config.js");
const { MessageEmbed} = require("discord.js");

module.exports = async ( player, newChannel) => {

      	if (!newChannel) {
        	await player.destroy();

			let embed = new MessageEmbed()
			.setDescription("Music stopped as I have been disconnected from the voice channel.")
			.setColor(embedNeutral)
	
        	return message.channel.send({ embeds: [embed] })
      	
		} else {
        	player.voiceChannel = newChannel;
      	}
}