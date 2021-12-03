// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\


module.exports = {
    name: "kick",
    category: "Moderation",
    aliases: [],
    description: "Kick Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

        const target = message.mentions.users.first(); 
        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); 
        if (!reason) reason = "None";


        if (!message.member.permissions.has("KICK_MEMBERS")) {
        let embed = new MessageEmbed()
            .setTitle('**Error Occurred**')
            .setDescription('You don`t have permission to use this command')
            .setColor(embedError)

        await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});

        return;
        }


        if (!args.length) {
        let embed = new MessageEmbed()
            .setTitle('**Error Occurred**')
            .setDescription('Please Mention Somebody to Kick')
            .setColor(embedError)

        await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});

        return;
        }


        if (!mentionMember) {
            let embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription('That isn`t a user!')
                .setColor(embedError)

            await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
            return;
        };

        if(!mentionMember.kickable) {
            let embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription(`This user is a moderator!`)
                .setColor(embedError)

            await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});
            return;
        };

            
        await mentionMember.kick({ reason: reason })

        let embed = new MessageEmbed()
            .setTitle('**Ban Command**')
            .setDescription(`${target} was banned with the reason: **${reason}**!`)
            .setColor(embedSuccess)

            await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)})
        }};