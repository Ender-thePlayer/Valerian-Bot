const Discord = require('discord.js')

module.exports = {
	name: 'kick',
	description: 'With this command you can kick users!',
	aliases: [],
	execute: async (message, args, client) => {

		const target = message.mentions.users.first(); 
        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); 
        if (!reason) reason = "None";

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            let embed = new Discord.MessageEmbed()
            .setTitle('**Error Occurred**')
            .setDescription('You don`t have permission to use this command')
            .setColor('#000000')
            return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                        setTimeout(() => msg.delete(), 120000)});
            }

        if (!args[0]) {
            let embed = new Discord.MessageEmbed()
            .setTitle('**Error Occurred**')
            .setDescription(`Please Mention Someone you want to kick!`)
            .setColor('#000000')
    
                message.channel.send({ embeds: [embed]}).then(setTimeout(() => message.delete())).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});
        }

        if (!mentionMember) {
            return;
        }

        if(!mentionMember.kickable) {
            let embed = new Discord.MessageEmbed()
            .setTitle('**Error Occurred**')
            .setDescription('This user is a moderator!')
            .setColor('#000000')
            return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                        setTimeout(() => msg.delete(), 120000)});

        }
        
		await mentionMember.kick({
            reason: reason})
        let embed = new Discord.MessageEmbed()
        .setDescription(`${target} was kicked with the reason: **${reason}**!`)
        .setColor('#22a5b1')
        message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});
        }};
