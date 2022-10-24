const { embedNeutral } = require("../../config.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
    
module.exports = async (client, player, track, payload) => {
	
		let embed = new EmbedBuilder()
			.setTitle(`Now Playing`)
			.setDescription(`[${track.title}](${track.uri})`)
			.setColor(embedNeutral)
			.addFields(
				{ name: 'Song Duration', value: `\`${convertTime(track.duration)}\``, inline: true },
				{ name: 'Position in Queue', value: `\`${player.queue.length}\``, inline: true },
			)
			
		if (typeof track.displayThumbnail === "function") embed.setThumbnail(track.displayThumbnail("hqdefault"));

		const But1 = new ButtonBuilder().setCustomId("vdown").setEmoji("🔉").setStyle("Primary");	
		const But2 = new ButtonBuilder().setCustomId("stop").setEmoji("⏹️").setStyle("Secondary");
		const But3 = new ButtonBuilder().setCustomId("pause").setEmoji("⏯️").setStyle("Secondary");
		const But4 = new ButtonBuilder().setCustomId("skip").setEmoji("⏭️").setStyle("Secondary");
		const But5 = new ButtonBuilder().setCustomId("vup").setEmoji("🔊").setStyle("Primary");

		const row = new ActionRowBuilder().addComponents(But1, But2, But3, But4, But5);
		
		let NowPlaying = await client.channels.cache
			.get(player.textChannel)
			.send({ embeds: [embed], components: [row] });
		player.setNowplayingMessage(NowPlaying);
  
		const collector = NowPlaying.createMessageComponentCollector({
			filter: (b) => {
				if(b.guild.members.me.voice.channel && b.guild.members.me.voice.channelId === b.member.voice.channelId) return true;
				else {
				b.reply({content: `You are not connected to ${b.guild.me.voice.channel} to use this buttons.`, ephemeral: true}); return false;
				};
     		},

		time: track.duration,
		});


		collector.on("collect", async (i) => {

			if (i.customId === "vdown") {
				if (!player) {
					return collector.stop();
				}

				let amount = Number(player.volume) - 10;
				await player.setVolume(amount);
				i.reply({content: `Volume set to ${amount}.`, ephemeral: true});

			} else if (i.customId === "stop") {

				if (!player) {
					return collector.stop();
				}

				await player.destroy();

				i.reply({content: "Stopped the music.", ephemeral: true});
				return collector.stop();

			} else if (i.customId === "pause") {

				if (!player) {
					return collector.stop();
				}
				player.pause(!player.paused);
				const Text = player.paused ? "Paused" : "Resume";
				i.reply({content: `${Text} the music.`, ephemeral: true});

			} else if (i.customId === "skip") {
				if (!player) {
					return collector.stop();
				}

				await player.stop();
				i.reply({content: "Skipped to the next song.", ephemeral: true});

				if (track.length === 1) {
					return collector.stop();
			    }

			} else if (i.customId === "vup") {
				if (!player) {
					return collector.stop();
				}

				let amount = Number(player.volume) + 10;

			if(amount >= 200) return i.reply({ content: `Cannot turn up the player volume further more.`, ephemeral: true });
			
			await player.setVolume(amount);
			i.reply({content: `Volume set to ${amount}.`, ephemeral: true});
			return;
		}
	});
}
