const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bans a user from the server",
	owner: false,
	botPerms: ['BanMembers'],
	userPerms: ['BanMembers'],
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

        if(!target.bannable) {
            let embed = new EmbedBuilder()
                .setDescription(`This user is a moderator!`)
                .setColor(embedError)

            return interaction.reply( { embeds: [embed] })
        };

        try{
            target.ban()

            let embed = new EmbedBuilder()
                .setDescription(`${target} was banned!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

            interaction.reply( { embeds: [embed] })
            
        } catch(error) {
            return;
        }
    }
}