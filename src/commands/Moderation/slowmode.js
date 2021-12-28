// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "slowmode",
    category: "Moderation",
    aliases: [ 'slow' ],
    description: "Slowmode Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {
		
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            let embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription('You don`t have permission to use this command')
                .setColor(embedError)

            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
            };


        if (!args[0]) {
            message.channel.setRateLimitPerUser(0);
                let embed = new MessageEmbed()
                    .setTitle('**Slowmode Command**')
                    .setDescription(`Slowmode was turned off`)
                    .setColor(embedSuccess)

                return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});
            };

        const raw = args[0];

        if(isNaN(raw)){
            let embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription('This isn`t a valid number')
                .setColor(embedError)
                
            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
        };


        if(raw < 1) {

                let embed = new MessageEmbed()
                    .setTitle('**Error Occurred**')
                    .setDescription('You cannot set a slowmode lower than 1 second!')
                    .setColor(embedError)

                return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});
        };


        if(raw > 21600) {
        
            let embed = new MessageEmbed()
            .setTitle('**Error Occurred**')
            .setDescription('You cannot set higher than 21600 seconds (6hr)')
            .setColor(embedError)
            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
            };


        message.channel.setRateLimitPerUser(raw)

        let embed = new MessageEmbed()
            .setTitle('**Slowmode Command**')
            .setDescription(`Slowmode was set on ${raw} seconds`)
            .setColor(embedSuccess)

        message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});

        }};