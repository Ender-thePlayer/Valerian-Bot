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

	let embed =  new MessageEmbed()
		.setColor(embedNeutral)
		.setTitle('**Aliases Command**')
		.setDescription('Thse are the aliases! In the left are the commands and in the right are the aliases.')
		.addFields(
			{ name: 'Music Commands: ', value: `${p}247 - \`\`24h\`\`, \`\`24/7\`\`, \`\`24*7\`\` \n ${p}clearqueue - \`\`cq\`\` \n ${p}play - \`\`p\`\` \n ${p}aliases - \`\`alias\`\`, \`\`as\`\` \n ${p}info - \`\`botinfo, i\`\``, inline: true },
			{ name: 'Utility Commands: ', value: `${p}changelogs - \`\`ch\`\`, \`\`logs\`\` \n ${p}ping - \`\`latency\`\` \n ${p}help - \`\`h\`\` \n ${p}aliases - \`\`alias\`\`, \`\`as\`\` \n ${p}info - \`\`botinfo, i\`\``, inline: true },
			{ name: 'Fun Commands: ', value: `${p}howgay - \`\`gay\`\` \n ${p}avatar - \`\`av\`\` \n ${p}f - \`\`F\`\` \n ${p}rickroll - \`\`nevergonna\`\` , \`\`rick\`\` , \`\`roll\`\``, inline: true },
			{ name: 'Moderation Commands: ', value: `${p}clear - \`\`purge\`\` \n ${p}slowmode - \`\`slow\`\` \n ${p}serverinfo - \`\`si\`\` \n ${p}userinfo - \`\`ui\`\` \n ${p}ticket - \`\`tt\`\`,\`\`newticket\`\``, inline: true },
		)
		.setTimestamp()
		.setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

	await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
		setTimeout(() => msg.delete(), 120000)});
}};