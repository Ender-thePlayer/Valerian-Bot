const { embedNeutral } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { embedError } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const pre = require("../../schema/bye.js");
const mongoose = require('mongoose')

module.exports = {
    name: "bye",
    description: "Sets a custom channel to send a message when someone has left the server",
	owner: false,
	botPerms: ['ManageGuild'],
	userPerms: ['ManageGuild'],
	nsfw: false,
    options:
        [
            {		
                name: "info",
                description: "See if bye message is set or not",
                type: 1,
            },
            {		
                name: "set",
                description: "Enable bye message",
                type: 1,
                options: [
                    {
                        name: "channel",
                        description: "The channel you want to set",
                        type: 7,
                        required: true,
                    },
                ]
            },
            {		
                name: "reset",
                description: "Disable bye message",
                type: 1,
            },
        ],
    run: async (client, interaction) => {

		if (interaction.options.getSubcommand() === 'set') {
            let channel = interaction.options.getChannel('channel');

            pre.findOne({ guildid: interaction.guild.id }).then(result => {

                let duck = new pre({
                    _id: new mongoose.Types.ObjectId(),
                    guildid: interaction.guild.id,
                    channelid: channel.id,
                })

                try{
                    let embed = new EmbedBuilder()
                        .setDescription(`The goodbye channel for this server is now set to **<#${channel.id}>**`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

                    interaction.reply( { embeds: [embed] })
                } catch(error) {
                    return;
                }

                if (!result || result == []) {
                    duck.save().catch(console.error);
                
                } else {
                    pre.deleteOne({ guildid: interaction.guild.id }).catch(console.error)
                    duck.save().catch(console.error)
                }
            })


        } else if (interaction.options.getSubcommand() === 'reset') {
            let res = await pre.findOne({ guildid: interaction.guild.id });

			if(!res) {
				let embed = new EmbedBuilder()
					.setDescription(`Goodbye message is already turned off`)
					.setColor(embedError)

				return interaction.reply( { embeds: [embed] })
			}

            pre.findOne({ guildid: interaction.guild.id }).then(result => {
                pre.deleteOne({ guildid: interaction.guild.id }).catch(console.error)			
                
                try{
                    let embed = new EmbedBuilder()
                        .setDescription(`Goodbye message is now turned off`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

                    interaction.reply( { embeds: [embed] })
                } catch(error) {
                    return;
                }
            })

        } else if (interaction.options.getSubcommand() === 'info') {

            let ress =  await pre.findOne({guildid: interaction.guild.id})

            if(ress && ress.channelid)welcome = ress.channelid;

            if(!ress){
                try{
                    let embed = new EmbedBuilder()
                        .setDescription(`Goodbye Message is **NOT SET**`)
                        .setColor(embedNeutral)
                        .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
                    
                    return interaction.reply( { embeds: [embed] });
                } catch(error) {
                    return;
                }

            } else {
                try{
                    let embed = new EmbedBuilder()
                        .setDescription(`Goodbye Message is **SET**`)
                        .setColor(embedNeutral)
                        .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
                        .addFields(
                            { name: 'Goodbye Channel', value: `<#${welcome}>`, inline: false },
                        )

                return interaction.reply( { embeds: [embed] });

                } catch(error) {
                    return;
                }
            }
        }
    }  
}