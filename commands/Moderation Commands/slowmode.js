const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "slowmode",
    aliases: ["slow"],
    description: "Sets a channel's slowmode!",
	execute: async (message, args, client) => {
		
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
        let embed = new Discord.MessageEmbed()
        .setDescription('You don`t have permission to use this command')
        .setColor('#000000')
        return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});
    
    }

    if (!args[0]) {
        message.channel.setRateLimitPerUser(0);
        let embed = new Discord.MessageEmbed()
        .setDescription('Slowmode was turned off')
        .setColor('#22a5b1')
        return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});

    }

    const raw = args[0];

    if(isNaN(raw)){

        let embed = new Discord.MessageEmbed()
        .setDescription('This isn`t a valid number')
        .setColor('#000000')
        return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});

    }

    if(raw < 1) {

        let embed = new Discord.MessageEmbed()
        .setDescription('You cannot set slowmode lower than 1 second')
        .setColor('#000000')
        return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});

    }

    if(raw > 1200) {
     
        let embed = new Discord.MessageEmbed()
        .setDescription('You cannot set higher than 1200 seconds (20min)')
        .setColor('#000000')
        return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});


    }

    message.channel.setRateLimitPerUser(raw)

    let embed = new Discord.MessageEmbed()
    .setDescription(`Slowmode was set on ${raw} seconds`)
    .setColor('#22a5b1')
    message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});

	},
};