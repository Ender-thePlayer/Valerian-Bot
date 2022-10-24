const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "ping",
    category: "Utility",
    description: "Shows the bot's latency",
    aliases: ["latency"],
    usage: "",
	enabled: true,
	owner: false,
	userPerms: [],
	botPerms: [],
	nsfw: false,
    args: false,
    execute: async (message, client) => {

		const embed = new EmbedBuilder()
			.setColor(embedNeutral)
      		.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
			.addFields(
				{ name: 'Bot Latency', value:`\`\`\`ini\n[ ${Date.now() - message.createdTimestamp}ms ]\n\`\`\``, inline: true },
				{ name: 'Api Latency', value:`\`\`\`ini\n[ ${client.ws.ping}ms ]\n\`\`\``, inline: true },
				{ name: 'Server Location', value:`\`\`\`ini\n[heroku-eu]\n\`\`\``, inline: true },
			)
			
		message.reply( { embeds: [embed] })

    }
};
