const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const redditFetch = require('reddit-fetch');

module.exports = {
    name: "meme",
    category: "Fun",
    description: "Sends a meme from the r/memes subreddit.",
    aliases: ['m'],
    usage: [],
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    execute: async (message) => {

        redditFetch({
            subreddit: 'memes',
            sort: 'hot',
            allowNSFW: false,
            allowModPost: true,
            allowCrossPost: true,
            allowVideo: true
            
        }).then((post) => {
            let embed = new EmbedBuilder()
                .setDescription(`${post.title}`)
                .setImage(`${post.url}`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            message.reply( { embeds: [embed] });
        })
    }
}