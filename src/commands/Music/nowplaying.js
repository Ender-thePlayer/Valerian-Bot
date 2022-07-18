const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Show now playing song.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (message, client) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setDescription("There is no music playing.")
                .setColor(embedError);

            return message.channel.send(thing);
        }

        const song = player.queue.current
        var total = song.duration;
        var current = player.position;
        
        let embed = new MessageEmbed()
            .setDescription(`**Now Playing**\n[${song.title}](${song.uri}) - \`[${convertTime(song.duration)}]\`\n\n\`${progressbar(player)}\n${convertTime(current)} / ${convertTime(total)}\``)
            .setThumbnail(song.displayThumbnail("3"))
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        return message.channel.send({embeds: [embed]})

    }
}
