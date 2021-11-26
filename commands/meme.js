const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
const redditFetch = require('reddit-fetch');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "meme",
    aliases: ["m"],
    description: "Shows a meme!",
	execute: async  (message, args, client) => {


    redditFetch({

            subreddit: 'memes',
            sort: 'hot',
            allowNSFW: false,
            allowModPost: true,
            allowCrossPost: true,
            allowVideo: true
            
        }).then(post => {
            let embed = new Discord.MessageEmbed()
            .setColor('dd6fb9')
            .setTitle('**Meme Command**')
            .setDescription(`${post.title}`)
            .setImage(`${post.url}`)
            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

            message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                setTimeout(() => msg.delete(), 120000)})});

        }
	};