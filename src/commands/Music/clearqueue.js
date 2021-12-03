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
    name: "clearqueue",
    aliases: ["cq"],
    category: "Music",
  	description: "Clear Queue Command",
	args: false,
    usage: "",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
	execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
			let n = new MessageEmbed()
			.setColor(embedError)
			.setTitle('**Error Occurred**')
			.setDescription(`There is no music playing!`)

		return message.reply( { embeds: [n] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});
        }


		player.queue.clear();

        let thing = new MessageEmbed()
        .setColor(embedNeutral)
       .setTitle('**Play Command**')
        .setTimestamp()
        .setDescription(`Removed all songs from the queue`)
       
    await message.reply( { embeds: [thing] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
    setTimeout(() => msg.delete(), 120000)});
    return;  
}};