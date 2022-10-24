const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unbans a user from the server",
	owner: false,
	botPerms: ['ModerateMembers'],
	userPerms: ['ModerateMembers'],
    nsfw: false,
    options: 
        [
            {
                name: "user-id",
                description: "The user you want to unban",
                type: 3,
                required: true,
            },
        ],
    run: async (client, interaction) => {

        const rgx = /^(?:<@!?)?(\d+)>?$/;
        let id = interaction.options.getString('user-id')
        let bannedUsers = await interaction.guild.bans.fetch();

        if (!rgx.test(id)){
            let embed = new EmbedBuilder()
                .setDescription('Invalid ID, please check the provided ID!')
                .setColor(embedError)

            return interaction.reply( { embeds: [embed] })
        }

        try{

            let user = bannedUsers.get(id);

            if (!user){
                let embed = new EmbedBuilder()
                    .setDescription('Unable to find user, either the user is not banned or the provided ID is invalid!')
                    .setColor(embedError)

                return interaction.reply( { embeds: [embed] })
            }

            interaction.guild.members.unban(id)

            let embed = new EmbedBuilder()
                .setDescription(`<@${id}> was unbanned!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
            interaction.reply( { embeds: [embed] })

        } catch(error) {
            return;
        }
    }
}