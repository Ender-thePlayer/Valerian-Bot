// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { MessageEmbed} = require("discord.js");

// events \\

module.exports = async ( player, newChannel) => {

      	if (!newChannel) {
        	await player.destroy();

			let embed = new MessageEmbed()
			.setTitle('**Play Command**')
			.setColor(embedNeutral)
			.setTimestamp()
			.setDescription("Music stopped as I have been disconnected from the voice channel.")

        return message.channel.send({ embeds: [embed] }).then(msg =>{
            setTimeout(() => msg.delete(), 120000)})
      	
		} else {
        	player.voiceChannel = newChannel;
      	}
	}