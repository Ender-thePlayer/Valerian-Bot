// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "about",
    category: "Utility",
    aliases: ['ab'],
    description: "About Command",
    args: false,
    usage: "js!about",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let embed = new MessageEmbed()
            .setColor(embedNeutral)
            .setTitle('**About Command**')
            .setImage("https://i.imgur.com/usLfAMl.png")

            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

        message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
}};