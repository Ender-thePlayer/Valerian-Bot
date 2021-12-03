// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "avatar",
    category: "Fun",
    aliases: ['av'],
    description: "Avatar Command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

    let member = message.mentions.members.first() || message.member;

    let embed = new MessageEmbed()

        .setColor(embedNeutral)
        .setTitle(`${member.user.tag}'s Avatar`)
        .setImage(member.user.displayAvatarURL({dynamic: true, size: 512 }))
        .setTimestamp()
        .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
        
    await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
        setTimeout(() => msg.delete(), 120000)});
        
    }};