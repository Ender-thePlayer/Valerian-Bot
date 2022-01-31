// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// commands \\

module.exports = {
  	name: "poll",
  	category: "Guild",
  	aliases: [],
  	description: "Poll Command",
    usage: `poll <channel> <message>`,
    permission: [],
    owner: false,
  	execute: async (message, args, client, prefix) => {

        let channel = message.mentions.channels.first()
        let description = args.slice(1).join(" ")

        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            const embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription('You don`t have permission to use this command!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
        }

        if(!channel){
            const embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription('Please specify a channel to send the poll to!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
        }

        if(!description){
            const embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription('Please ask a question!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
        }

        const embed = new MessageEmbed()
            .setTitle('**Poll Command**')
            .setDescription(`${description}`)
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))

        const embedone = new MessageEmbed()
            .setTitle('**Poll Command**')
            .setDescription(`You Asked: ${description} in ${channel}`)
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))

        message.reply( { embeds: [embedone] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});

        let msgEmbed = await channel.send( { embeds: [embed] })
        await msgEmbed.react('✅')
        await msgEmbed.react('❌')

    }
}