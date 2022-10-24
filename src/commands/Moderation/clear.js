const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "clear",
    category: "Moderation",
    description: "Deletes an amount of messages you specify\n(or 10 messages if not specified)",
	aliases: ['purge'],
    usage: "[amount]",
	enabled: true,
	owner: false,
	botPerms: ['ManageMessages'],
	userPerms: ['ManageMessages'],
    nsfw: false,
    args: false,
    execute: async (message, args, client) => {

        if (!args.length) {
            try{
                message.channel.messages.fetch({ limit: 10,before:message.id }).then(messages => {
                    message.channel.bulkDelete(messages);
        
                    const embed = new EmbedBuilder()
                        .setDescription(`You deleted 10 messages!`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
        
                    return message.reply( { embeds: [embed] })
                })

            } catch(error) {
                return;
            }
        return;
        };

        if(isNaN(args[0])){
            const embed = new EmbedBuilder()
                .setDescription('This isn`t a valid number!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        }

        if(args[0] > 100) {
            const embed = new EmbedBuilder()
                .setDescription('You cannot delete more than 100 messages at a time!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        }


        if(args[0] < 1) {
            const embed = new EmbedBuilder()
                .setDescription('You cannot delete less than 1 message!')
                .setColor(embedError)
            
            return message.reply( { embeds: [embed] })
        }
        try{
            message.channel.messages.fetch({ limit: args[0],before:message.id }).then(async messages => {
                message.channel.bulkDelete(messages);
    
                let embed = new EmbedBuilder()
                    .setDescription(`Cleared ${args} messages!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
                let embedtwo = new EmbedBuilder()
                    .setDescription(`Cleared 1 message!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
                if(args[0] == 1) {
                    return message.reply( { embeds: [embedtwo] })
                
                } else {
                    return message.reply( { embeds: [embed] })
                }        
            })
            
        } catch(error) {
            return;
        }

	}
};