// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const pre = require("../../schema/prefix.js");
const mongoose = require('mongoose')

// command \\

module.exports = {
    name: "setprefix",
    category: "Config",
    description: "Set Custom Prefix",
    args: false,
    usage: "",
    aliases: ['prefix'],
    permission: [],
    owner: false,
  	execute: async (message, args, client) => {
      
		if (!message.member.permissions.has('MANAGE_GUILD')) {
			const embed = new MessageEmbed()
				.setTitle('**Error Occurred**')
				.setDescription("You don`t have permission to use this command!")
				.setColor(embedError)
            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
		}

		if (!args[0]) {
			const embed = new MessageEmbed()
				.setTitle('**Error Occurred**')
				.setDescription("Please give the prefix that you want to set!")
				.setColor(embedError)
            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
		}

		if (args[1]) {
			const embed = new MessageEmbed()
				.setTitle('**Error Occurred**')
				.setDescription("You can't set prefix as double argument!")
				.setColor(embedError)
			return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
		}

		if (args[0].length > 11) {
			const embed = new MessageEmbed()
				.setTitle('**Error Occurred**')
				.setDescription("You can not send prefix more than 11 characters!")
				.setColor(embedError)
            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
		}

		let res = await pre.findOne({ guildid: message.guild.id });
		let prefix = args.join(" ");
		let p;
		if (!res) p = ">"
		else p = res.prefix;
		let newprefix = args.join(" ");

		pre.findOne({ guildid: message.guild.id }).then(result => {

			let duck = new pre({
				_id: new mongoose.Types.ObjectId(),
				guildid: message.guild.id,
				prefix: prefix
			})

			const embed = new MessageEmbed()
				.setTitle('**Setprefix Command**')
				.setDescription(`Changed prefix to \`${newprefix}\``)
				.setColor(embedSuccess)
				.setTimestamp()
				.setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))

			message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});
			
			if (!result || result == []) {
				duck.save().catch(console.error);
			
			} else {
				pre.deleteOne({ guildid: message.guild.id }).catch(console.error)
				duck.save().catch(console.error)
			}
	  	})
   	}
}
