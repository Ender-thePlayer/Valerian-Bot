const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    category: "Moderation",
    aliases: [ 'purge' ],
    description: "Deletes an amount of messages.",
    args: false,
    usage: `[amount] (default is 10)`,
    permission: ['MANAGE_MESSAGES'],
    owner: false,
    execute: async (message, args, client) => {

        if (!args.length) {
            return message.channel.messages.fetch({ limit: 10,before:message.id }).then(messages => {
                message.channel.bulkDelete(messages);

            const embed = new MessageEmbed()
                .setDescription(`You deleted 10 messages!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            return message.reply( { embeds: [embed] })
            })
        };

        if(isNaN(args[0])){
            const embed = new MessageEmbed()
                .setDescription('This isn`t a valid number!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        }

        if(args[0] > 100) {
            const embed = new MessageEmbed()
                .setDescription('You cannot delete more than 100 messages nat a time!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        }


        if(args[0] < 1) {
            const embed = new MessageEmbed()
                .setDescription('You cannot delete less than 1 message!')
                .setColor(embedError)
            
            return message.reply( { embeds: [embed] })
        }

        message.channel.messages.fetch({ limit: args[0],before:message.id }).then(async messages => {
            message.channel.bulkDelete(messages);

            let embed = new MessageEmbed()
                .setDescription(`Cleared ${args} messages!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            let embedtwo = new MessageEmbed()
                .setDescription(`Cleared 1 message!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            if(args[0] == 1) {
                return message.reply( { embeds: [embedtwo] })
            
            } else {
                return message.reply( { embeds: [embed] })
            }        
        })
	}
};