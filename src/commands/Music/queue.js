const { EmbedBuilder, ButtonBuilder, MessageActionRow } = require("discord.js");
const pms = require("pretty-ms");
const load = require("lodash");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
    name: "queue",
    category: "Music",
    description: "Shows what's the currently playing song and every song queued up",
    aliases: ["q"],
    usage: "",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (message, client) => {
   
        try {
            const player = message.client.manager.get(message.guild.id);

            if(!player) return message.channel.send({ embeds: [new EmbedBuilder().setColor(embedError).setDescription(`Nothing is playing right now.`)]});
            
            if(!player.queue) return message.channel.send({ embeds: [new EmbedBuilder().setColor(embedError).setDescription(`Nothing is playing right now.`)]});
            
            if(player.queue.length === "0" || !player.queue.length) {
                const embed = new EmbedBuilder()
                    .setTitle(`Currently Playing`)
                    .setDescription(`[${player.queue.current.title}](${player.queue.current.uri})`)
                    .setColor(embedNeutral)

                await message.reply({
                    embeds: [embed]
                }).catch(() => {});

            } else {
                const queuedSongs = player.queue.map((t, i) => `\`${++i}\` • [${t.title}](${t.uri})`);

                const mapping = load.chunk(queuedSongs, 10);
                const pages = mapping.map((s) => s.join("\n"));
                let page = 0;

                if(player.queue.size < 11) {
                    const embed = new EmbedBuilder()
                        .setTitle(`Currently Playing`)
                        .setDescription(`[${player.queue.current.title}](${player.queue.current.uri})`)
                        .setColor(embedNeutral)
                        .setThumbnail(player.queue.current.thumbnail)
                        .setFooter({text: `Requested by @${message.author.tag}\nPage ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                        .addFields(
                            { name: 'In Queue', value: `${pages[page]}`, inline: true },
                        )

                    await message.reply({
                        embeds: [embed]
                    }).catch(() => {});

                } else {
                    const embed2 = new EmbedBuilder()
                        .setTitle(`Currently Playing`)
                        .setDescription(`[${player.queue.current.title}](${player.queue.current.uri})`)
                        .setColor(embedNeutral)
                        .setThumbnail(player.queue.current.thumbnail)
                        .setFooter({text: `Requested by @${message.author.tag}\nPage ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                        .addFields(
                            { name: 'In Queue', value: `${pages[page]}`, inline: true },
                        )

                    const but1 = new ButtonBuilder()
                        .setCustomId("queue_cmd_but_1")
                        .setEmoji("⏭️")
                        .setStyle("Primary")

                    const but2 = new ButtonBuilder()
                        .setCustomId("queue_cmd_but_2")
                        .setEmoji("⏮️")
                        .setStyle("Primary")

                    const but3 = new ButtonBuilder()
                        .setCustomId("queue_cmd_but_3")
                        .setEmoji("⏹️")
                        .setStyle("Danger")

                    const row1 = new MessageActionRow().addComponents([
                        but2, but3, but1
                    ]);

                    const msg = await message.reply({
                        embeds: [embed2],
                        components: [row1]
                    }).catch(() => {});

                    const collector = message.channel.createMessageComponentCollector({
                        filter: (b) => {
                            if(b.user.id === message.author.id) return true;
                            else {
                                b.reply({
                                    ephemeral: true,
                                    content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`
                                });
                                return false;
                            };
                        },
                        time: 60000*5,
                        idle: 30e3
                    });

                    collector.on("collect", async (button) => {
                        if(button.customId === "queue_cmd_but_1") {
                            await button.deferUpdate().catch(() => {});
                            page = page + 1 < pages.length ? ++page : 0;

                            const embed3 = new EmbedBuilder()
                                .setTitle(`Currently Playing`)
                                .setDescription(`[${player.queue.current.title}](${player.queue.current.uri})`)
                                .setColor(embedNeutral)
                                .setThumbnail(player.queue.current.thumbnail)
                                .setFooter({text: `Requested by @${message.author.tag}\nPage ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                                .addFields(
                                    { name: 'In Queue', value: `${pages[page]}`, inline: true },
                                )

                            await msg.edit({
                                embeds: [embed3],
                                components: [row1]
                            }).catch(() => {});

                        } else if(button.customId === "queue_cmd_but_2") {
                            await button.deferUpdate().catch(() => {});
                            page = page > 0 ? --page : pages.length - 1;

                            const embed4 = new EmbedBuilder()
                                .setTitle(`Currently Playing`)
                                .setDescription(`[${player.queue.current.title}](${player.queue.current.uri})`)
                                .setColor(embedNeutral)
                                .setThumbnail(player.queue.current.thumbnail)
                                .setFooter({text: `Requested by @${message.author.tag}\nPage ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                                .addFields(
                                    { name: 'In Queue', value: `${pages[page]}`, inline: true },
                                )

                            await msg.edit({
                                embeds: [embed4],
                                components: [row1]
                            }).catch(() => {});

                        } else if(button.customId === "queue_cmd_but_3") {
                            await button.deferUpdate().catch(() => {});
                            collector.stop();
                        } else return;
                    });

                    collector.on("end", async () => {
                        await msg.edit({
                            components: []
                        }).catch(() => {});
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

}
