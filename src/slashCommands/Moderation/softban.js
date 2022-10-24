const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "softban",
    description: "Kicks a user and deletes messages sent by that user in the last 7 days",
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
            target.ban({ days:7 }).then(() => interaction.guild.members.unban(target.id).catch(err => console.log(err)))

            let embed = new EmbedBuilder()
                .setDescription(`${target} was softbanned!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
            interaction.reply( { embeds: [embed] })

        } catch(error) {
            return;
        }
    }
}
