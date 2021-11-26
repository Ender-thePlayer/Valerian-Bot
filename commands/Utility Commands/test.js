const Discord = require('discord.js');

module.exports = {
    name: "test",
    aliases: ["r"],
    description: "Shows all Info about the Server!",
    execute: async (message, args, client) => {

		if (message.author.id === 849304080895180851 || 506097799536967710) {
			let embed = new Discord.MessageEmbed()
			  .setColor('#dd6fb9')
			  .setTitle('**Test Command**')
			  .addFields(
				  { name: 'Bot Is...', value: "Still Workin'"}
			  )
			  .setTimestamp()
			  .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
			  message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
				setTimeout(() => msg.delete(), 120000)});
  
			} else {
  
			  message.delete()
  
			};
}}