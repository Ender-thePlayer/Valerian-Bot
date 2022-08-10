const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const redditFetch = require('reddit-fetch');

module.exports = {
    name: "meme",
    category: "Fun",
    aliases: ['m'],
    description: "Get a random hot meme from r/memes.",
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
            let embed = new MessageEmbed()
                .setDescription(`${post.title}`)
                .setImage(`${post.url}`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            message.reply( { embeds: [embed] });
        })
    }
}