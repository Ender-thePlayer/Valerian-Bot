const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const redditFetch = require('reddit-fetch');

module.exports = {
    name: "meme",
    description: "Sends a meme from the r/memes subreddit.",
	owner: false,
	botPerms: [],
	userPerms: [],
	nsfw: false,
    run: async (client, interaction) => {

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
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

            interaction.reply( { embeds: [embed] });
        })
    }
}