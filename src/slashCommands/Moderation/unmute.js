const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "unmute",
    description: "Unmutes a user",
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
        ],
    run: async (client, interaction) => {

        let target = interaction.options.getMember('user')

        try{
            target.timeout(50)

            let embed = new EmbedBuilder()
                .setDescription(`${target} was unmuted!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
            interaction.reply( { embeds: [embed] })

        } catch(error) {
            return;
        }
    }
}
