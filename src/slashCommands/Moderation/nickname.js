const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "nickname",
    description: "Sets a nickname for a user",
	owner: false,
	botPerms: ['ModerateMembers'],
	userPerms: ['ModerateMembers'],
    nsfw: false,
    options:
        [
            {		
                name: "info",
                description: "See if nickname is set or not",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "The user you want to see if they have a nickname or not",
                        type: 6,
                        required: true,
                    },
                ]
            },
            {		
                name: "set",
                description: "Set a nickname",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "The user you want to set a nickname for",
                        type: 6,
                        required: true,
                    },
                    {
                        name: "nickname",
                        description: "The nickname you want to set",
                        type: 3,
                        required: true,
                    },
                ]
            },
            {		
                name: "reset",
                description: "Delete a nickname",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "The user whose nickname you want to delete",
                        type: 6,
                        required: true,
                    },
                ]
            },
        ],
    run: async (client, interaction) => {

        let target = interaction.options.getMember('user')

		if (interaction.options.getSubcommand() === 'set') {
            let nickname = interaction.options.getString('nickname')

            if(!target.moderatable) {
                let embed = new EmbedBuilder()
                    .setDescription(`This user is a moderator!`)
                    .setColor(embedError)

                return interaction.reply( { embeds: [embed] })
            };
            try{
                target.setNickname(nickname)

                let embed = new EmbedBuilder()
                    .setDescription(`Changed the nickname for ${target}!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
                interaction.reply( { embeds: [embed] })

            } catch(error) {
                return;
            }

        } else if (interaction.options.getSubcommand() === 'reset') {

            if(!target.moderatable) {
                let embed = new EmbedBuilder()
                    .setDescription(`This user is a moderator!`)
                    .setColor(embedError)

                return interaction.reply( { embeds: [embed] })
            };
            try{
                target.setNickname(null)

                let embed = new EmbedBuilder()
                    .setDescription(`Reset the nickname for ${target}!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
    
                interaction.reply( { embeds: [embed] })
    
            } catch(error) {
                return;
            }


        } else if (interaction.options.getSubcommand() === 'info') {
            try{
                var t = target.nickname

                if(t == null){
                    let embed = new EmbedBuilder()
                        .setDescription(`${target} doesn't have a nickname!`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

                    return interaction.reply( { embeds: [embed] });
                        
                } else {
                    let embed = new EmbedBuilder()
                        .setDescription(`${target} has the nickname **${t}**!`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
                        
                    return interaction.reply( { embeds: [embed] });

                }

            } catch(error) {
                return;
            }
        }
    }
}