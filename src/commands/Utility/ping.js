// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// commands \\

module.exports = {
    name: "ping",
    category: "Utility",
    aliases: ['latency'],
    description: "Ping Command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

		const embed = new MessageEmbed()
			.setTitle('**Ping Command**')
			.setDescription('')
			.setColor(embedNeutral)
			.addFields(
				{ name: 'Bot Latency', value:`\`\`\`ini\n[ ${Date.now() - message.createdTimestamp}ms ]\n\`\`\``, inline: true },
				{ name: 'Api Latency', value:`\`\`\`ini\n[ ${client.ws.ping}ms ]\n\`\`\``, inline: true },
				{ name: 'Server Location', value:`\`\`\`ini\n[railwayapp_us-west]\n\`\`\``, inline: true },
			)
			.setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
			
		message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});

    }
};
