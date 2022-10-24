const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = async (guildCreate, guild) => {   
	config = require("../../config.js");

	let p = config.prefix

    const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    
	let embed = new EmbedBuilder()
		.setDescription(`Thank you for inviting me! My name is **Valerian**.\n
		My prefix is \`\`${p}\`\`. To get started, send \`\`${p}help\`\` for info about my commands!\n
		Join our [support server](https://discord.gg/svzyfVBmH2) if you need help, want to get information about updates and issues or want to engage in community discussions with the developers!`)
		.setColor(embedNeutral)
		.setImage('https://i.imgur.com/EDUWHjA.png')

	channel.send({ embeds: [embed] });
}