const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
    name: "ticket",
    category: "Guild",
    description: "Creates a new ticket.",
	aliases: ['tt', 'new'],
    usage: [],
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    execute: async (message, args, client) => {

        const embed = new EmbedBuilder()
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
            .addFields(
                { name: `How to use the command:`, value: `> Click on the button below saying 'Create Ticket'\n> Once the ticket is made, you'll be able to type in there!`}
            )

        let bt = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("tic")
                .setLabel("🎫 Create Ticket")
                .setStyle("Primary")
            )

        message.reply({ embeds: [embed], components: [bt] })
    }
}