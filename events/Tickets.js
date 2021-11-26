const client = require("../index")

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
            .setColor('#dd6fb9')
            .setTitle('**Ticket Command**')
            .addField(`Hello There!`, `The staff will be here as soon as possible, mean-while tell us about your issue! Thank You!`)
            .setTimestamp()
            .setFooter('@' + interaction.user.tag, interaction.user.displayAvatarURL({dynamic : true}))
  
            let tktsucEmbed = new MessageEmbed()
                .setTitle('**Ticket Command**')
                .setColor('#dd6fb9')
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
    }
  })