const { Client, Intents, DiscordAPIError, MessageEmbed } = require('discord.js');

const Discord = require('discord.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports.run = async (client, message, args, prefix) => {

    const em = new MessageEmbed()
	.setColor('#22a5b1')
	.setTitle('**Changelogs Command**')
	.addFields(
		{ name: 'Current Version:', value: 'v.0.056_initial', inline: true },
		{ name: 'Changelogs:', value: 'Not so much to see here..', inline: true },
	)
	.setTimestamp()

    message.channel.send('Cleared Messages').then(setTimeout(() => message.delete())).then(msg =>{
		setTimeout(() => msg.delete(), 120000)});
};
module.exports.help = {
  name: "changelogs",
  usage: "Changelogs Command",
};