const { embedNeutral } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Utility",
    aliases: ['latency'],
    description: "Shows the bot's latency.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

		const embed = new MessageEmbed()
			.setColor(embedNeutral)
      .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
			.addFields(
				{ name: 'Bot Latency', value:`\`\`\`ini\n[ ${Date.now() - message.createdTimestamp}ms ]\n\`\`\``, inline: true },
				{ name: 'Api Latency', value:`\`\`\`ini\n[ ${client.ws.ping}ms ]\n\`\`\``, inline: true },
				{ name: 'Server Location', value:`\`\`\`ini\n[railwayapp_us-west]\n\`\`\``, inline: true },
			)
			
		message.reply( { embeds: [embed] })

    }
};
