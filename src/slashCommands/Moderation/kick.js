const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js")
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kicks a user from the server",
    owner: false,
    botPerms: ['KickMembers'],
    userPerms: ['KickMembers'],
    nsfw: false,
    options: 
        [
            {
                name: "user",
                description: "The user you want to ban",
                type: 6,
                required: true,
            },
        ],
    run: async (client, interaction) => {

        let target = interaction.options.getMember('user')

        if(!target.kickable) {
            let embed = new EmbedBuilder()
                .setDescription(`This user is a moderator!`)
                .setColor(embedError)

            return interaction.reply( { embeds: [embed] })
        };
        
        try{
            target.kick()

            let embed = new EmbedBuilder()
                .setDescription(`${target} was kicked!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
                interaction.reply( { embeds: [embed] })
            
        } catch(error) {
            return;
        }
    }
}
