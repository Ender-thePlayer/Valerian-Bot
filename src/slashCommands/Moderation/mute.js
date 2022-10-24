const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const ms = require('ms');
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "mute",
    description: "Mutes a user for a defined time",
	owner: false,
	botPerms: ['ModerateMembers'],
	userPerms: ['ModerateMembers'],
    nsfw: false,
    options: 
        [
            {
                name: "user",
                description: "The user you want to mute",
                type: 6,
                required: true,
            },
            {
                name: "time",
                description: "The user you want to mute",
                type: 3,
                required: true,
            },
        ],
    run: async (client, interaction) => {

        let target = interaction.options.getMember('user')
        let time = interaction.options.getString('time')

        try{
            let tme = ms(time)

            if(isNaN(tme)){
                let embed = new EmbedBuilder()
                    .setDescription('Please specify the time to mute for!')
                    .setColor(embedError)
    
                return interaction.reply( { embeds: [embed] })
            }
            if(tme > 604800000) {
                let embed = new EmbedBuilder()
                    .setDescription('You cannot mute someone for more than 7 days!')
                    .setColor(embedError)
    
                return interaction.reply( { embeds: [embed] })
            }

            target.timeout(tme)

            let embed = new EmbedBuilder()
                .setDescription(`${target} was muted for **${time}**!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
            interaction.reply( { embeds: [embed] })

        } catch(error) {
            return;
        }
    }
}
