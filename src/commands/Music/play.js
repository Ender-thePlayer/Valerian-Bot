const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { TrackUtils } = require("erela.js");
const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "play",
    category: "Music",
    aliases: ["p"],
    description: "Play music.",
    args: true,
    usage: "<url> (to YT/Spotify/etc)",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
   	execute: async (message, args, client) => {

	  	let SearchString = args.join(" ");  

    	if(SearchString.startsWith("https://open.spotify.com/playlist/")){
			let embed = new MessageEmbed()
				.setDescription(`Playlist is loding please wait...`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

		return message.reply( { embeds: [embed] })
		};

    	const player = client.manager.create({
      		guild: message.guild.id,
      		voiceChannel: message.member.voice.channel.id,
      		textChannel: message.channel.id,
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
				songs.push(TrackUtils.build(Searched.tracks[i], message.author));
				player.queue.add(songs);
				
				if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length)
				player.play();

				let embed = new MessageEmbed()
					.setDescription(`Added Playlist to queue\n[${Searched.playlistInfo.name}](${SearchString}) - [\`${Searched.tracks.length}\`]`)
					.setColor(embedNeutral)
					.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

				return message.reply( { embeds: [embed] })

     		} else if (Searched.loadType.startsWith("TRACK")) {
				player.queue.add(TrackUtils.build(Searched.tracks[0], message.author));

				if (!player.playing && !player.paused && !player.queue.size)
					player.play();

					let embed = new MessageEmbed()
						.setDescription(`Added to queue\n[${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`)
						.setColor(embedNeutral)
						.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

					return message.reply( { embeds: [embed] })

			} else {

				let embed = new MessageEmbed()
					.setDescription(`There were no results found!`)
					.setColor(embedError)

				return message.reply( { embeds: [embed] })
        	}

      		} else {

				let Searched = await player.search(SearchString, message.author);

				if (!player){

					let embed = new MessageEmbed()
						.setDescription(`Nothing is playing right now!`)
						.setColor(embedError)

					return message.reply( { embeds: [embed] })
				}

				if (Searched.loadType === "NO_MATCHES"){
					let embed = new MessageEmbed()
						.setDescription(`No matches found\n${SearchString}`)
						.setColor(embedError)

				return message.reply( { embeds: [embed] })

				} else if (Searched.loadType == "PLAYLIST_LOADED") {
				player.queue.add(Searched.tracks);
				
				if (!player.playing && !player.paused &&
					player.queue.totalSize === Searched.tracks.length)
					player.play();

				let embed = new MessageEmbed()
					.setDescription(`Playlist added to queue\n[${Searched.playlist.name}](${SearchString}) - \`${Searched.tracks.length}\` songs - \`[${convertTime(Searched.playlist.duration)}]\``)
					.setColor(embedNeutral)
					.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
					
				return message.reply( { embeds: [embed] })

				} else {
					player.queue.add(Searched.tracks[0], message.author);

					if (!player.playing && !player.paused && !player.queue.size)
						player.play();

					let thing = new MessageEmbed()
						.setDescription(`Added Song to queue\n[${Searched.tracks[0].title}](${Searched.tracks[0].uri}) - \`[${convertTime(Searched.tracks[0].duration)}]\``)
						.setColor(embedNeutral)
						.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

					return message.reply( { embeds: [thing] })
				}
			}

    	} catch (e) {
      	console.log(e);
    	}
  	},
}
