const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
  	name: "seek",
  	aliases: [],
  	category: "Music",
  	description: "Seek the currently playing song.",
  	args: true,
    usage: "<10s / 10m / 10h>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let embed = new MessageEmbed()
                .setDescription("There is no music playing.")
                .setColor(embedError);

            return message.reply({embeds: [embed]});
        }

        const time = ms(args[0])
        const position = player.position;
        const duration = player.queue.current.duration;

        const song = player.queue.current;
        
        if (time <= duration) {
            if (time > position) {
                player.seek(time);
                let embed = new MessageEmbed()
                    .setDescription(`**Forward**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(embedNeutral)
                    .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                
                return message.reply({embeds: [embed]});

            } else {
                player.seek(time);
                let embed = new MessageEmbed()
                    .setDescription(`**Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(embedNeutral)
                    .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                    
          return message.reply({embeds: [embed]});
            }
        } else {
            let embed = new MessageEmbed()
                .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``)
                .setColor(embedError);    

            return message.reply({embeds: [embed]});
        }
	
    }
};