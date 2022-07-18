const { MessageEmbed } = require("discord.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
	name: "leave",
    aliases: ["dc"],
    category: "Music",
    description: "Make the bot to leave the voice channel.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message) => {
       
        const player = message.client.manager.get(message.guild.id);

        player.destroy();
        
        let thing = new MessageEmbed()
            .setDescription(`**Leave the voice channel**\nThank you for using **${message.client.user.username}**!`)
            .setColor(embedNeutral)

        return message.reply({embeds: [thing]});
	
    }
};