const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { TrackUtils } = require("erela.js");
const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "play",
    description: "Plays song from Youtube or Spotify",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
	options: 
		[
			{
				name: "song",
				description: "Link or name of song from Youtube or Spotify",
				type: 3,
				required: true,
			},
		],
    run: async (client, interaction) => {

	  	let SearchString = interaction.options.getString('song');

    	if(SearchString.startsWith("https://open.spotify.com/playlist/")){
			let embed = new EmbedBuilder()
				.setDescription(`Playlist is loding please wait...`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

		return interaction.reply( { embeds: [embed] })
		};

    	const player = client.manager.create({
      		guild: interaction.guild.id,
      		voiceChannel: interaction.member.voice.channel.id,
      		textChannel: interaction.channel.id,
      		selfDeafen: true,
      		volume: 80,
    	});
    
    	if (player.state != "CONNECTED") await player.connect();

    	try {
      		if (SearchString.match(client.Lavasfy.spotifyPattern)) {
        		await client.Lavasfy.requestToken();

        	let node = client.Lavasfy.nodes.get(client.config.nodes.id);
        	let Searched = await node.load(SearchString);

      		if (Searched.loadType === "PLAYLIST_LOADED") {
          		let songs = [];

				for (let i = 0; i < Searched.tracks.length; i++)
				songs.push(TrackUtils.build(Searched.tracks[i], interaction.author));
				player.queue.add(songs);
				
				if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length)
				player.play();

				let embed = new EmbedBuilder()
					.setTitle(`Added Playlist to Queue`)
					.setDescription(`[${Searched.playlistInfo.name}](${SearchString})`)
					.setColor(embedNeutral)
					.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
					.addFields(
						{ name: 'Song Duration', value: `\`${Searched.tracks.length}\``, inline: true },		
					)

				return interaction.reply( { embeds: [embed] })

     		} else if (Searched.loadType.startsWith("TRACK")) {
				player.queue.add(TrackUtils.build(Searched.tracks[0], interaction.author));

				if (!player.playing && !player.paused && !player.queue.size)
					player.play();

					let embed = new EmbedBuilder()
						.setTitle(`Added Song to Queue`)
						.setDescription(`[${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`)
						.setColor(embedNeutral)
						.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
						
					return interaction.reply( { embeds: [embed] })

			} else {

				let embed = new EmbedBuilder()
					.setDescription(`There were no results found!`)
					.setColor(embedError)

				return interaction.reply( { embeds: [embed] })
        	}

      		} else {

				let Searched = await player.search(SearchString, interaction.author);

				if (!player){

					let embed = new EmbedBuilder()
						.setDescription(`Nothing is playing right now!`)
						.setColor(embedError)

					return interaction.reply( { embeds: [embed] })
				}

				if (Searched.loadType === "NO_MATCHES"){
					let embed = new EmbedBuilder()
						.setDescription(`No matches found\n${SearchString}`)
						.setColor(embedError)

				return interaction.reply( { embeds: [embed] })

				} else if (Searched.loadType == "PLAYLIST_LOADED") {
				player.queue.add(Searched.tracks);
				
				
				if (!player.playing && !player.paused &&
					player.queue.totalSize === Searched.tracks.length)
					player.play();

				let embed = new EmbedBuilder()
					.setTitle(`Added Playlist to Queue`)
					.setDescription(`[${Searched.playlist.name}](${SearchString})`)
					.setColor(embedNeutral)
					.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
					.addFields(
						{ name: 'Playlist Duration', value: `\`${convertTime(Searched.playlist.duration)}\``, inline: true },		
						{ name: 'Song Count', value: `\`${Searched.tracks.length}\``, inline: true },
					)

				return interaction.reply( { embeds: [embed] })

				} else {
					player.queue.add(Searched.tracks[0], interaction.author);


					if (!player.playing && !player.paused && player.queue.size == 0){
						player.play();
						
						let thing = new EmbedBuilder()
							.setTitle(`Added Song to Queue`)
							.setDescription(`[${Searched.tracks[0].title}](${Searched.tracks[0].uri})`)
							.setColor(embedNeutral)
							.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

						return interaction.reply( { embeds: [thing] });
					}


					if (!player.playing && !player.paused && !player.queue.size)
						player.play();

					let thing = new EmbedBuilder()
						.setTitle(`Added Song to Queue`)
						.setDescription(`[${Searched.tracks[0].title}](${Searched.tracks[0].uri})`)
						.setColor(embedNeutral)
						.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
						.addFields(
							{ name: 'Song Duration', value: `\`${convertTime(Searched.tracks[0].duration)}\``, inline: true },		
							{ name: 'Position in Queue', value: `\`${player.queue.length}\``, inline: true },
						)

					return interaction.reply( { embeds: [thing] })
				}
			}

    	} catch (e) {
      		console.log(e);
    	}
  	},
}
