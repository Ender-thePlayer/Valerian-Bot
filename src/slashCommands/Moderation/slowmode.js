const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "slowmode",
    description: "Sets a time between sending messages",
	owner: false,
	botPerms: ['ManageChannels'],
	userPerms: ['ManageChannels'],
    nsfw: false,
    options: 
    [
        {
            name: "time",
            description: "The time between sending messages",
            type: 3,
            required: false,
        },
    ],
    run: async (client, interaction) => {

        if (!interaction.options.getString('time')) {
            try{
                interaction.channel.setRateLimitPerUser(0);

                let embed = new EmbedBuilder()
                    .setDescription(`Slowmode turned off!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
                return interaction.reply( { embeds: [embed] })

            } catch(error) {
                return;
            }
        };

        try{
            let time = interaction.options.getString('time')
            let tme = ms(time)

            if(isNaN(tme)){
                let embed = new EmbedBuilder()
                    .setDescription('This isn`t a valid number!')
                    .setColor(embedError)
                    
                return interaction.reply( { embeds: [embed] })
            };

            if(tme < 1) {
                let embed = new EmbedBuilder()
                    .setDescription('You cannot set a slowmode lower than 1 second!')
                    .setColor(embedError)

                return interaction.reply( { embeds: [embed] })
            };

            if(tme > 21600000) {
                let embed = new EmbedBuilder()
                    .setDescription('You cannot set higher than 6 hours!')
                    .setColor(embedError)
                return interaction.reply( { embeds: [embed] })
            };

            interaction.channel.setRateLimitPerUser(tme / 1000)

            let embed = new EmbedBuilder()
                .setDescription(`Slowmode set to **${time.replace(/\s+/g, '')}**!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
            interaction.reply( { embeds: [embed] })
            
        } catch(error) {
            return;
        }
    }
};