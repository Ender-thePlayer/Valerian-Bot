const { MessageEmbed } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
  	name: "stop",
    category: "Music",
    description: "Stops the music.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	execute: async (message, client) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let embed = new MessageEmbed()
                .setDescription("There is no music playing.")
                .setColor(embedError);

            return message.reply({embeds: [embed]});
        }

        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.destroy();

        let embed = new MessageEmbed()
            .setDescription(`Stopped the music and cleared the queue.`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        message.reply({embeds: [embed]});
	
  	}
};