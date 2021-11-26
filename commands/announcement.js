const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "an_cm",
  aliases: ["ax"],
  description: "SPECIAL.DO_NOT_USE",
  execute: async(message, args) => {

    if (message.author.id === 849304080895180851 || 506097799536967710) {
          let embed = new Discord.MessageEmbed()
            .setColor('#dd6fb9')
            .setTitle('**Announcement**')
            .addFields(
                { name: 'Sad...', value: "Din pacate vacanta de 2 saptamani (25 oct - 7 nov) in mai putin de 2 ore se va termina, ce trist.. dar macar is in online!"}
            )
            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
            message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
              setTimeout(() => msg.delete(), 120000)});

          } else {

            message.delete()

          };
}};
