const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "aliases",
  aliases: ["alias", "as"],
  description: "Shows all Commands",
  execute(message) {

      let embed =  new Discord.MessageEmbed()
        .setColor('#dd6fb9')
        .setTitle('**Aliases Command**')
        .setDescription('Thse are the aliases! In the left are the commands and in the right are the aliases.')
        .addFields(
            { name: 'Util Commands: ', value: 'js!changelogs - ``ch``, ``logs`` \n js!ping - ``latency`` \n js!help - ``h``\n js!serverinfo - ``si`` \n js!userinfo - ``ui`` \n js!aliases - ``alias , as`` \n js!info - ``botinfo, i``', inline: true },
            { name: 'Fun Commands: ', value: 'js!howgay - ``gay`` \n js!avatar - ``av`` \n js!f - ``F`` \n js!rickroll - ``nevergonna , rickroll', inline: true },
            { name: 'Moderation Commands: ', value: 'js!clear - ``purge`` \n js!slowmode - ``slow``', inline: true },
        )
        .setTimestamp()
        .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
        message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
          setTimeout(() => msg.delete(), 120000)})}};