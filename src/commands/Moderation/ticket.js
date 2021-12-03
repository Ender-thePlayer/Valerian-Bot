// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");

// command \\

module.exports = {
    name: "ticket",
    category: "Moderation",
    aliases: [ 'tt', 'newticket' ],
    description: "Ticket Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

    let tktEmbed = new MessageEmbed()
      .setColor(embedNeutral)
      .setTitle('**Tickets Command**')
      .addField(`How to use the command:`, `> Click on the button below saying 'Create Ticket'\n> Once the ticket is made, you'll be able to type in there!`)
      .setTimestamp()
      .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))


    let bt = new MessageActionRow().addComponents(
        new MessageButton()
              .setCustomId("tic")
              .setLabel("🎫 Create Ticket!")
              .setStyle("PRIMARY")
        )

        await message.channel.send({ embeds: [tktEmbed], components: [bt] }).then(setTimeout(() => message.delete())).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});

    client.on("interactionCreate", async (interaction) => {
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
            .setColor(embedNeutral)
            .setTitle('**Ticket Command**')
            .addField(`Hello There!`, `The staff will be here as soon as possible, mean-while tell us about your issue! Thank You!`)
            .setTimestamp()
            .setFooter('@' + interaction.user.tag, interaction.user.displayAvatarURL({dynamic : true}))

        let tktsucEmbed = new MessageEmbed()
            .setTitle('**Ticket Command**')
            .setColor(embedSuccess)
            .setDescription(`Your ticket has successfully been created at ${ticChannel}`)

        let del = new MessageActionRow().addComponents(

            new MessageButton()
                .setCustomId("del")
                .setLabel("Delete Ticket")
                .setStyle("DANGER")

        )
  
            try {
  
                await ticChannel.send({ embeds: [embed], components: [del] }).then(interaction.followUp({ embeds: [tktsucEmbed], ephemeral: true })).catch(err => console.log(err))
  
            } catch (err) {
                console.log(err)
            }
  
        } else if (interaction.customId === 'del') {
  
            const channel = interaction.channel
  
            channel.delete()
        }
    }}
    )}}
