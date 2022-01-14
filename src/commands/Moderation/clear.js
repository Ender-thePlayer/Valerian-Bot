// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "clear",
    category: "Moderation",
    aliases: [ 'purge' ],
    description: "Clear Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            let embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription('You don`t have permission to use this command')
                .setColor(embedError)

            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
        }

        if (!args.length) {
            return message.channel.messages.fetch({ limit: 10,before:message.id }).then(messages => {
                message.channel.bulkDelete(messages);

            let embed = new MessageEmbed()
                .setTitle('**Clear Command**')
                .setDescription(`You deleted 10 messages!`)
                .setColor(embedSuccess)

            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
            })
        };

        if(isNaN(args[0])){

            let embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription('This isn`t a valid number')
                .setColor(embedError)

            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
        }

        if(args[0] > 100) {
            let embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription('You cannot delete more than 100 messages nat a time!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
        }


        if(args[0] < 1) {
            let embed = new MessageEmbed()
            .setTitle('**Error Occurred**')
            .setDescription('You cannot delete less than 1 message!')
            .setColor(embedError)
            
        message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
        }

        
        message.channel.messages.fetch({ limit: args[0],before:message.id }).then(async messages => {
            message.channel.bulkDelete(messages);

            let embed = new MessageEmbed()
                .setTitle('**Clear Command**')
                .setDescription(`You deleted ${args} messages!`)
                .setColor(embedSuccess)

            let embedtwo = new MessageEmbed()
                .setTitle('**Clear Command**')
                .setDescription(`You deleted 1 message!`)
                .setColor(embedSuccess)

            if(args[0] == 1) {

                return message.reply( { embeds: [embedtwo] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)})
            
            } else {

                return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)})
            }        
        })
	}
};