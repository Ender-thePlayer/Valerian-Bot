const { MessageEmbed } = require("discord.js");
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
	name: "join",
    aliases: ["j"],
    category: "Music",
    description: "Make the bot to join in a voice channel.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    execute: async (message) => {
  
	    const { channel } = message.member.voice;

        if(!message.guild.me.voice.channel) {
            
            const player = message.client.manager.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                volume: 80,
                selfDeafen: true,
            });

            player.connect();

            let thing = new MessageEmbed()
                .setDescription(`**Join the voice channel**\nJoined <#${channel.id}> and bound to <#${message.channel.id}>`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            return message.reply({embeds: [thing]});

        } else if (message.guild.me.voice.channel !== channel) {

            let thing = new MessageEmbed()
                .setDescription(`You must be in the same channel as ${message.client.user}`)
                .setColor(embedError);

            return message.reply({embeds: [thing]});
        }
        
    }
};