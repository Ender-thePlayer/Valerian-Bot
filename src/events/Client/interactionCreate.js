const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { InteractionType, PermissionsBitField, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("discord.js");
const db = require("../../schema/prefix.js");

module.exports = async (client, interaction) => {
    let prefix = client.prefix;
    const ress = await db.findOne({ Guild: interaction.guildId });
    if (ress && ress.Prefix) prefix = ress.Prefix;

    if (interaction.type === InteractionType.ApplicationCommand) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;
    
        const embed = new EmbedBuilder()
            .setColor(embedError);

        const player = interaction.client.manager.get(interaction.guildId);

    
        if (command.userPerms && !interaction.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
            embed.setDescription(`You don't have **\`${command.userPerms}\`** permission in ${interaction.channel.toString()} to execute **\`${command.name}\`** command.`);
            return interaction.reply({ embeds: [embed] });
        }
        if (command.botPerms && !interaction.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
            embed.setDescription(`I need **\`${command.botPerms}\`** permission in ${interaction.channel.toString()} to execute **\`${command.name}\`** command.`);
            return interaction.reply({ embeds: [embed] });
        }
        if(command.nsfw && !interaction.channel.nsfw){
            embed.setDescription("This command is only accessible in NSFW channels.");
            return interaction.reply({ embeds: [embed] }).catch(() => {});
        }
        if (command.owner && interaction.user.id !== `${client.owner}`) {
            embed.setDescription("Only the bot owner can use this command!");
            return interaction.reply({ embeds: [embed] }).catch(() => {});
        }
        if (command.player && !player) {
            if (interaction.replied) {
                return await interaction.editReply({
                    content: `There is no player for this guild.`,
                    ephemeral: true,
                }).catch(() => {});

            } else {
                return await interaction.reply({
                    content: `There is no player for this guild.`,
                    ephemeral: true,
                }).catch(() => {});
            }
        }
        if (command.inVoiceChannel && !interaction.member.voice.channel) {
            if (interaction.replied) {
                return await interaction.editReply({
                    content: `You must be in a voice channel!`,
                    ephemeral: true,
                }).catch(() => {});

            } else {
                return await interaction.reply({
                    content: `You must be in a voice channel!`,
                    ephemeral: true,
                }).catch(() => {});
            }
        }
        if (command.sameVoiceChannel && interaction.guild.members.me.voice.channel) {
            if (interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) {
                return await interaction.reply({
                    content: `You must be in the same ${interaction.guild.members.me.voice.channel.toString()} to use this command!`,
                    ephemeral: true,
                }).catch(() => {});
            }
        }

        try {
            await command.run(client, interaction, prefix);
        } catch (error) {
            if (interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`,
                }).catch(() => {});

            } else {
                await interaction.reply({
                    ephemeral: true,
                    content: `An unexcepted error occured.`,
                }).catch(() => {});
            }

            console.error(error);
        }
    }

    if (interaction.isButton()) {
        if (interaction.customId === "tic") {
            
            const ticChannel = await interaction.guild.channels.create({
                name:`ticket-${Math.floor(Math.random() * 9999)}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AddReactions]
                    },
                    {
                        id: client.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AddReactions]
                    }
                ]
            })

            let embed = new EmbedBuilder()
                .setTitle('**Ticket Opened**')
                .setColor(embedNeutral)
                .setTimestamp()
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
                .addFields(
                    { name: `Hello There!`, value: `The staff will be here as soon as possible, mean-while tell us about your issue! Thank You!`}
                )

            let tktsucEmbed = new EmbedBuilder()
                .setDescription(`Your ticket has successfully been created at ${ticChannel}`)
                .setColor(embedSuccess)
                .setTimestamp()
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

            let del = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("del")
                    .setLabel("Delete Ticket")
                    .setStyle("Danger"))

            try {
                await ticChannel.send({ embeds: [embed], components: [del] }).then(interaction.reply({ embeds: [tktsucEmbed], ephemeral: true })).catch(err => console.log(err))
            } catch (err) {
                console.log(err)
            }

        } else if (interaction.customId === 'del') {
            const channel = interaction.channel

            try {
                channel.delete()
            } catch (err) {
                console.log(err)
            }
        }
    }
}