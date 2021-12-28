// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "test",
    category: "Utility",
    aliases: ['r'],
    description: "Test Command",
    args: false,
    usage: ``,
    permission: [],
    owner: true,
    execute: async (message , args, client) => {

		if (message.author.id === 849304080895180851 || 506097799536967710) {
			let embed = new MessageEmbed()
				.setColor(embedNeutral)
				.setTitle('**Test Command**')
				.addFields(
					{ name: 'Bot Is...', value: "Still Workin'"}
			  	)
			  	.setTimestamp()
			  	.setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

			message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});
  
			} else {
  
			message.delete()
  
		};
}}