const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["latency"],
  description: "Shows the Bot's ping and server location!",
  execute(message, client) {


        let embed = new Discord.MessageEmbed()
        .setColor('#dd6fb9')
		    .setTitle('**Ping Command**')
        .addFields(
            { name: 'Ping is:', value: `${Date.now() - message.createdTimestamp}` + 'ms', inline: true },
            { name: 'Server:', value: 'ender.prod_server', inline: true },
        )
        .setTimestamp()
        .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
        message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
          setTimeout(() => msg.delete(), 120000)});
}};