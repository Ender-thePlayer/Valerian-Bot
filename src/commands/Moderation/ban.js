// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\


module.exports = {
    name: "ban",
    category: "Moderation",
    aliases: [],
    description: "Ban Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

        const target = message.mentions.users.first(); 
        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); 
        if (!reason) reason = "None";


        if (!message.member.permissions.has("BAN_MEMBERS")) {
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
        .setDescription('Please Mention Somebody to Ban')
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

        if(!mentionMember.bannable) {
            let embed = new MessageEmbed()
                .setTitle('**Error Occurred**')
                .setDescription(`This user is a moderator!`)
                .setColor(embedError)

            await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});
            return;
        };

            
        await mentionMember.ban({ days: 1, reason: reason })

        let embed = new MessageEmbed()
            .setTitle('**Ban Command**')
            .setDescription(`${target} was banned with the reason: **${reason}**!`)
            .setColor(embedSuccess)

            await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)})}}