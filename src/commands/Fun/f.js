// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "f",
    category: "Fun",
    aliases: [],
    description: "F in Chat Command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

        const links = [
            'https://c.tenor.com/BZ4V-B05un8AAAAd/pay-respects-press-f.gif',
            'https://c.tenor.com/9f1lboKKmBUAAAAC/keyboard-hyperx.gif',
            'https://c.tenor.com/BaJDchtzSMQAAAAC/f-letter-f-burts.gif',
            'https://c.tenor.com/DPfEX5kb9vMAAAAC/letter-f.gif',
            'https://c.tenor.com/rAuQOw-WY7IAAAAC/press-f-pay-respect.gif',
            'https://c.tenor.com/H8DA2jkNgtwAAAAC/team-fortress2-pay-respects.gif'
        ];

        const Index = Math.floor(Math.random() * links.length);
        
        const embed = new MessageEmbed()
            .setTitle('**F in Chat Command**')
            .setImage(links[Index])
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))

        message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
    }
}