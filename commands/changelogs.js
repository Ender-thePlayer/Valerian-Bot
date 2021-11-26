const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "changelogs",
  aliases: ["ch", "logs"],
  description: "Shows the Newest Update and it's changelogs!",
  execute(message, client) {


      let embed = new Discord.MessageEmbed()
        .setColor('#dd6fb9')
        .setTitle('**Changelogs Command**')
        .addFields(
            { name: 'Current Version:', value:'``beta_0.3.4``', inline: true },
            { name: 'Version Name:', value:'``Beta Progress Update``', inline: true },
            { name: 'Changelogs:', value: '```⏵ Added F in chat command \n⏵ Added Rickroll Command```',inline: false },
            { name: 'Last Version:', value:'``beta_0.3.3``', inline: true },
            { name: 'Last Version Name:', value:'``Beta Progress Update``', inline: true },
            { name: 'Changelogs:', value: '```⏵ Updated to djs v13 \n⏵ Added hosting 24/7 \n⏵ Error Handling v2 \n⏵ Added Bot Description when tagged \n⏵ Info Command Added \n⏵ Ban Command Added \n⏵ Kick Command Added```',inline: false },
        )
        .setTimestamp()
        .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
        message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
          setTimeout(() => msg.delete(), 120000)});
}};
