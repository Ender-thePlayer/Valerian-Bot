const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "See information about this project.",
    run: async (client, interaction) => {

		const embed = new EmbedBuilder()
			.setColor(embedNeutral)
      		.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
			.addFields(
				{ name: 'Bot Latency', value:`\`\`\`ini\n[ ${Date.now() - interaction.createdTimestamp}ms ]\n\`\`\``, inline: true },
				{ name: 'Api Latency', value:`\`\`\`ini\n[ ${client.ws.ping}ms ]\n\`\`\``, inline: true },
				{ name: 'Server Location', value:`\`\`\`ini\n[heroku-eu]\n\`\`\``, inline: true },
			)
			
		interaction.reply( { embeds: [embed] })

    }
};
