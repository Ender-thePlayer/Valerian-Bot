// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { timeout, pages, buttonList, row, curpage} = require("../../commands/Utility/help.js");


// events \\

module.exports = async (client, interaction) => {

    if (interaction.isButton()) {
        await interaction.deferUpdate()

        if (interaction.customId === "tic") {
            const ticChannel = await interaction.guild.channels.create(`ticket-${interaction.user.id}`, {
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
                    },
                    {
                        id: client.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
                    }
                ]
            })

    let embed = new MessageEmbed()
        .setTitle('**Ticket Command**')
        .addField(`Hello There!`, `The staff will be here as soon as possible, mean-while tell us about your issue! Thank You!`)
        .setColor(embedNeutral)
        .setTimestamp()
        .setFooter(`@${interaction.user.tag}`, interaction.user.displayAvatarURL({dynamic : true}))

    let tktsucEmbed = new MessageEmbed()
        .setTitle('**Ticket Command**')
        .setDescription(`Your ticket has successfully been created at ${ticChannel}`)
        .setColor(embedSuccess)
        .setTimestamp()
        .setFooter(`@${interaction.user.tag}`, interaction.user.displayAvatarURL({dynamic : true}))

    let del = new MessageActionRow().addComponents(

        new MessageButton()
            .setCustomId("del")
            .setLabel("Delete Ticket")
            .setStyle("DANGER"))

        try {

            await ticChannel.send({ embeds: [embed], components: [del] }).then(interaction.followUp({ embeds: [tktsucEmbed], ephemeral: true })).catch(err => console.log(err))

        } catch (err) {
            console.log(err)
        }

        } else if (interaction.customId === 'del') {
            const channel = interaction.channel

            channel.delete()

        }
    return;}
}
