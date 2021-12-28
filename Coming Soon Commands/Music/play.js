// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { TrackUtils } = require("erela.js");
const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

// command \\

module.exports = {
    name: "play",
    category: "Music",
    aliases: ["p"],
    description: "Play Command",
    args: true,
    usage: "",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
   execute: async (message, args, client, prefix) => {

	  	let SearchString = args.join(" ");  

    	if(SearchString.startsWith("https://open.spotify.com/playlist/")){
			let embed = new MessageEmbed()
			.setColor(embedNeutral)
			.setTimestamp()
			.setDescription(`Playlist is loding please wait...`)

		return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)})
		};

    	const player = client.manager.create({
      		guild: message.guild.id,
      		voiceChannel: message.member.voice.channel.id,
      		textChannel: message.channel.id,
      		selfDeafen: true,
      		volume: 80,
    	});
    
    	if (player.state != "CONNECTED") return player.connect();

    	try {
      		if (SearchString.match(client.Lavasfy.spotifyPattern)) {
        		client.Lavasfy.requestToken();

        	let node = client.Lavasfy.nodes.get(client.config.nodes.id);
        	let Searched = node.load(SearchString);

      		if (Searched.loadType === "PLAYLIST_LOADED") {
          		let songs = [];

         	for (let i = 0; i < Searched.tracks.length; i++)
            songs.push(TrackUtils.build(Searched.tracks[i], message.author));
          	player.queue.add(songs);
			
          	if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length)
            player.play();

          	let embed = new MessageEmbed()
             	.setColor(embedNeutral)
			 	.setTitle('**Play Command**')
				.setTimestamp()
             	.setDescription(`Added Playlist to queue\n[${Searched.playlistInfo.name}](${SearchString}) - [\`${Searched.tracks.length}\`]`)

          	return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
				setTimeout(() => msg.delete(), 120000)});

     	} else if (Searched.loadType.startsWith("TRACK")) {
          	player.queue.add(TrackUtils.build(Searched.tracks[0], message.author));

       	if (!player.playing && !player.paused && !player.queue.size)
            player.play();

            let embed = new MessageEmbed()
             	.setColor(embedNeutral)
				.setTitle('**Play Command**')
             	.setTimestamp()
             	.setDescription(`Added to queue\n[${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`)

			return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
				setTimeout(() => msg.delete(), 120000)});

			} else {

				let embed = new MessageEmbed()
					.setColor(embedError)
					.setTitle('**Error Occurred**')
					.setDescription(`There were no results found.`)

				return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
					setTimeout(() => msg.delete(), 120000)});
        	}

      	} else {

        	let Searched = player.search(SearchString, message.author);

         	if (!player){

				let embed = new MessageEmbed()
					.setColor(embedError)
					.setTitle('**Error Occurred**')
					.setDescription(`Nothing is playing right now!`)

				return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
					setTimeout(() => msg.delete(), 120000)});
			}

         	if (Searched.loadType === "NO_MATCHES"){
				let embed = new MessageEmbed()
				.setColor(embedError)
				.setTitle('**Error Occurred**')
				.setDescription(`No matches found\n${SearchString}`)

			return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
				setTimeout(() => msg.delete(), 120000)});

			} else if (Searched.loadType == "PLAYLIST_LOADED") {
          	player.queue.add(Searched.tracks);
			
          	if (!player.playing && !player.paused &&
            	player.queue.totalSize === Searched.tracks.length)
            	player.play();

            let embed = new MessageEmbed()
             	.setColor(embedNeutral)
				.setTitle('**Play Command**')
             	.setTimestamp()
             	.setDescription(`Playlist added to queue\n[${Searched.playlist.name}](${SearchString}) - \`${Searched.tracks.length}\` songs - \`[${convertTime(Searched.playlist.duration)}]\``)
				
			return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});

        	} else {
				player.queue.add(Searched.tracks[0], message.author);

				if (!player.playing && !player.paused && !player.queue.size)
					player.play();

				let thing = new MessageEmbed()
					.setColor(embedNeutral)
					.setTitle('**Play Command**')
					.setTimestamp()
					.setDescription(`Added Song to queue\n[${Searched.tracks[0].title}](${Searched.tracks[0].uri}) - \`[${convertTime(Searched.tracks[0].duration)}]\``);

				return message.reply( { embeds: [thing] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
				setTimeout(() => msg.delete(), 120000)});
            	}
      		}
    	} catch (e) {
      	console.log(e);
    	}
  	},
}
