const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Deletes an amount of messages you specify\n(or 10 messages if not specified)",
	owner: false,
	botPerms: ['ManageMessages'],
	userPerms: ['ManageMessages'],
    nsfw: false,
    options: 
        [
            {
                name: "amount",
                description: "The amount of messages you want to clear",
                type: 10,
                required: false,
            },
        ],
    run: async (client, interaction) => {

        let amount = interaction.options.getNumber('amount')

        if (!amount) {
            try{
                interaction.channel.messages.fetch({ limit: 10,before:interaction.id }).then(messages => {
                    interaction.channel.bulkDelete(messages, true);
        
                    let embed = new EmbedBuilder()
                        .setDescription(`You deleted 10 messages!`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
        
                    return interaction.reply( { embeds: [embed] })
                })

            } catch(error) {
                return;
            }
        return;
        };

        if(amount > 100) {
            let embed = new EmbedBuilder()
                .setDescription('You cannot delete more than 100 messages at a time!')
                .setColor(embedError)

            return interaction.reply( { embeds: [embed] })
        }


        if(amount < 1) {
            let embed = new EmbedBuilder()
                .setDescription('You cannot delete less than 1 message!')
                .setColor(embedError)
            
            return interaction.reply( { embeds: [embed] })
        }
        try{
            interaction.channel.messages.fetch({ limit: amount,before:interaction.id }).then(async messages => {
                interaction.channel.bulkDelete(messages, true);
    
                let embed = new EmbedBuilder()
                    .setDescription(`Cleared ${amount} messages!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
                let embedtwo = new EmbedBuilder()
                    .setDescription(`Cleared 1 message!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
                if(amount == 1) {
                    return interaction.reply( { embeds: [embedtwo] })
                
                } else {
                    return interaction.reply( { embeds: [embed] })
                }        
            })
            
        } catch(error) {
            return;
        }

	}
};