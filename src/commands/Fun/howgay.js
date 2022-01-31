// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
	name: "howgay",
	category: "Fun",
	aliases: [ 'gay' ],
	description: "HowGay Command",
	args: false,
	usage: ``,
	permission: [],
	owner: false,
	execute: async (message, args, client) => {

		let member = message.mentions.members.first() || message.member;

		if (args[1]) {
			const embed = new MessageEmbed()
				.setTitle('**Error Occurred**')
				.setDescription("You can't mention two users!")
				.setColor(embedError)
            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
		}

		var arr = [];
		
		while(arr.length < 1){
			var r = Math.floor(Math.random() * 100) + 1;
			if(arr.indexOf(r) === -1) arr.push(r)};

		const embed = new MessageEmbed()
			.setTitle('**HowGay Command**')
			.setColor(embedNeutral)
			.setTimestamp()
			.setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
			.addField(`${member.user.tag} is:`, `${arr}% gay!`)

		message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});
	}
}
