// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");

// command \\

module.exports = {
    name: "ticket",
    category: "Moderation",
    aliases: [ 'tt', 'newticket' ],
    description: "Ticket Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

        let tktEmbed = new MessageEmbed()
            .setTitle('**Tickets Command**')
            .addField(`How to use the command:`, `> Click on the button below saying 'Create Ticket'\n> Once the ticket is made, you'll be able to type in there!`)
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))


        let bt = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("tic")
                .setLabel("🎫 Create Ticket")
                .setStyle("PRIMARY")
            )

        message.reply({ embeds: [tktEmbed], components: [bt] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)})
    }
}
