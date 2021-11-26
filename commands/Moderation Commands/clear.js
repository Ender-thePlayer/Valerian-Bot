const Discord = require('discord.js')

module.exports = {
    name: "clear",
    aliases: ["purge"],
    description: "Clears a number of messages!",
	execute: async (message, args, client) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            let embed = new Discord.MessageEmbed()
            .setDescription('You don`t have permission to use this command')
            .setColor('#000000')
            return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                        setTimeout(() => msg.delete(), 120000)});

            }

        if (!args.length) {
            return message.channel.messages.fetch({ limit: 10,before:message.id }).then(messages => {
            message.channel.bulkDelete(messages);
            let embed = new Discord.MessageEmbed()
            .setDescription(`You deleted 10 messages!`)
            .setColor('#dd6fb9')

            return message.channel.send({ embeds: [embed]}).then(setTimeout(() => message.delete())).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
        })};

        if(isNaN(args[0])){

            let embed = new Discord.MessageEmbed()
            .setDescription('This isn`t a valid number')
            .setColor('#000000')
            return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                        setTimeout(() => msg.delete(), 120000)});

        }

        if(args[0] > 100) {
            let embed = new Discord.MessageEmbed()
            .setDescription('You cannot delete more than 100 messages nat a time!')
            .setColor('#000000')
            return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                        setTimeout(() => msg.delete(), 120000)});
    
        }

        if(args[0] < 1) {

            let embed = new Discord.MessageEmbed()
            .setDescription('You cannot delete less than 1 message!')
            .setColor('#000000')
            return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                        setTimeout(() => msg.delete(), 120000)});

        }

        await message.channel.messages.fetch({ limit: args[0],before:message.id }).then(messages => {

            message.channel.bulkDelete(messages);

            let embed = new Discord.MessageEmbed()
            .setDescription(`You deleted ${args} message(s)!`)
            .setColor('#dd6fb9')

            message.channel.send({ embeds: [embed]}).then(setTimeout(() => message.delete())).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});

        });
	},
}; 