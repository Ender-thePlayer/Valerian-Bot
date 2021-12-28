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
	description: "Howgay Command",
	args: false,
	usage: ``,
	permission: [],
	owner: false,
	execute: async (message, args, client) => {

		let member = message.mentions.members.first() || message.member;

		if (args[1]) {
			const embed = new MessageEmbed()
				.setTitle('**Error Occurred**')
				.setDescription("You can't tag 2 persons!")
				.setColor(embedError)
			return message.reply({ embeds: [embed] });
		}

		var arr = [];
		
		while(arr.length < 1){
			var r = Math.floor(Math.random() * 100) + 1;
			if(arr.indexOf(r) === -1) arr.push(r)};

		let embed = new MessageEmbed()
			.setTitle('**How Gay Command**')
			.addField(`${member.user.tag} is:`, `${arr}% gay!`)
			.setColor(embedNeutral)
			.setTimestamp()
			.setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

		message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});
	}
}
