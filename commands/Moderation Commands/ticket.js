const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ticket",
  aliases: ["tt", "newticket"],
  description: "Creates a ticket!",
  execute: async (message, client) => {

    let tktEmbed = new Discord.MessageEmbed()
      .setColor('#dd6fb9')
      .setTitle('**Tickets Command**')
      .addField(`How to use the command:`, `> Click on the button below saying 'Create Ticket'\n> Once the ticket is made, you'll be able to type in there!`)
      .setTimestamp()
      .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

  let bt = new Discord.MessageActionRow().addComponents(

      new Discord.MessageButton()
          .setCustomId("tic")
          .setLabel("🎫 Create Ticket!")
          .setStyle("PRIMARY")

  )

  message.channel.send({ embeds: [tktEmbed], components: [bt] }).then(setTimeout(() => message.delete())).then(msg =>{
    setTimeout(() => msg.delete(), 120000)});

  }}
