// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
  name: "annch",
  category: "Owner",
  aliases: [ 'r' ],
  description: "Annch Command",
  args: false,
  usage: ``,
  permission: [],
  owner: true,
  execute: async (message, args, client) => {
  

    if (message.author.id === 849304080895180851 || 506097799536967710) {
          let embed = new Discord.MessageEmbed()
            .setColor('#dd6fb9')
            .setTitle('**Announcement**')
            .addFields(
                { name: 'Sad...', value: "Din pacate vacanta de 2 saptamani (25 oct - 7 nov) in mai putin de 2 ore se va termina, ce trist.. dar macar is in online!"}
            )
            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

            message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
              setTimeout(() => msg.delete(), 120000)});

          } else {

            message.delete()

          };
}};
