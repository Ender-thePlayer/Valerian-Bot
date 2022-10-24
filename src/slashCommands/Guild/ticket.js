const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
    name: "ticket",
    description: "Creates a new ticket.",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    run: async (client, interaction) => {

        let embed = new EmbedBuilder()
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
            .addFields(
                { name: `How to use the command:`, value: `> Click on the button below saying 'Create Ticket'\n> Once the ticket is made, you'll be able to type in there!`}
            )

        let bt = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("tic")
                .setLabel("🎫 Create Ticket")
                .setStyle("Primary")
            )

        interaction.reply({ embeds: [embed], components: [bt] })
    }
}