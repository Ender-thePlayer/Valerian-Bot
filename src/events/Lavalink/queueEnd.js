// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { MessageEmbed} = require("discord.js");

// events \\
    
module.exports = async (client, player, track, payload) => {

		const channel = client.channels.cache.get(player.textChannel);
		let embed = new MessageEmbed()
			.setColor(embedNeutral)
			.setTitle('**Play Command**')
			.setTimestamp()
			.setDescription(`Music queue has ended!`)

		channel.send({embeds: [embed] }).then(msg =>{
            setTimeout(() => msg.delete(), 120000)})
	}