// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");

// command \\

module.exports = {
	name: "247",
	aliases: ["24h", "24/7", "24*7"],
	category: "Music",
	description: "24/7 Command",
	args: false,
	usage: "",
	permission: [],
	owner: false,
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	execute: async (message, args, client, prefix) => {


    const player = message.client.manager.players.get(message.guild.id);
    if (player.twentyFourSeven) {
		player.twentyFourSeven = false;
		const embed = new MessageEmbed()
			.setColor(embedNeutral)
			.setDescription(`24/7 mode is now off.`)

		await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});
			return;   
		}else {
		player.twentyFourSeven = true;
		const embed = new MessageEmbed()
			.setColor(embedNeutral)
			.setDescription(`24/7 mode is now on.`)
		
		await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});
			return;
    }
  }
};