// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const pre = require("../../schema/prefix.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
name: "aliases",
category: "Utility",
aliases: [ "as" ],
description: "Aliases Command",
args: false,
usage: ``,
permission: [],
owner: false,
execute: async (message, args, client) => {

    const res = await pre.findOne({ guildid: message.guild.id })
    let p;
    if (!res) p = prefix
    else p = res.prefix;

	const embed =  new MessageEmbed()
		.setColor(embedNeutral)
		.setTitle('**Aliases Command**')
		.setDescription('Thse are the aliases! In the left are the commands and in the right are the aliases.')
		.addFields(
			{ name: 'Utility Commands: ', value:`${p}about - \`\`ab\`\`\n${p}aliases - \`\`alias\`\`\n${p}changelogs - \`\`ch\`\`, \`\`logs\`\`\n${p}help - \`\`h\`\`\n${p}info - \`\`botinfo\`\`, \`\`i\`\`\n${p}ping - \`\`latency\`\`` , inline: true },
			{ name: 'Fun Commands: ', value: `${p}avatar - \`\`av\`\`\n${p}f - \`\`F\`\`\n${p}howgay - \`\`gay\`\`\n${p}meme - \`\`m\`\`\n${p}rickroll - \`\`rick\`\`, \`\`roll\`\``, inline: true },
			{ name: 'Guild Commands: ', value: `${p}serverinfo - \`\`si\`\`\n${p}ticket - \`\`tt\`\`,\`\`newticket\`\`\n${p}userinfo - \`\`ui\`\``, inline: true },
			{ name: 'Moderation Commands: ', value: `${p}clear - \`\`purge\`\`\n${p}slowmode - \`\`slow\`\``, inline: true },
		)
		.setTimestamp()
		.setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))

	message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
		setTimeout(() => msg.delete(), 120000)});
}};