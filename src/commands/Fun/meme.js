// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const redditFetch = require('reddit-fetch');

// command \\

module.exports = {
    name: "meme",
    category: "Fun",
    aliases: ['m'],
    description: "Meme Command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

        redditFetch({
            subreddit: 'memes',
            sort: 'hot',
            allowNSFW: false,
            allowModPost: true,
            allowCrossPost: true,
            allowVideo: true
            
        }).then((post) => {
            const embed = new MessageEmbed()
            .setTitle('**Meme Command**')
            .setDescription(`${post.title}`)
            .setImage(`${post.url}`)
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))

        message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)})})
    }
}