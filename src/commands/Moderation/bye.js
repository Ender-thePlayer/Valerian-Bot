const { embedNeutral } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { embedError } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const pre = require("../../schema/bye.js");
const mongoose = require('mongoose')

module.exports = {
    name: "bye",
    category: "Moderation",
    description: "Sets a custom channel to send a message when someone has left the server",
	aliases: "",
    usage: "\n | (no args)\n | set <channel>\n | reset",
	enabled: true,
	owner: false,
	botPerms: ['ManageGuild'],
	userPerms: ['ManageGuild'],
    nsfw: false,
    args: false,
  	execute: async (message, args, client) => {

		if (args[0] === 'set') {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            if (!channel) {
                const embed = new EmbedBuilder()
                    .setDescription("Please mention the goodbye channel!")
                    .setColor(embedError)
                return message.reply( { embeds: [embed] })
            }
            if(isNaN(channel.id))return;
            if(channel.id.length > 25)return;
            if(channel.id.length < 15)return;

            pre.findOne({ guildid: message.guild.id }).then(result => {

                let duck = new pre({
                    _id: new mongoose.Types.ObjectId(),
                    guildid: message.guild.id,
                    channelid: channel.id,
                })

                try{
                    const embed = new EmbedBuilder()
                        .setDescription(`The goodbye channel for this server is now set to **<#${channel.id}>**`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

                    message.reply( { embeds: [embed] })
                } catch(error) {
                    return;
                }

                if (!result || result == []) {
                    duck.save().catch(console.error);
                
                } else {
                    pre.deleteOne({ guildid: message.guild.id }).catch(console.error)
                    duck.save().catch(console.error)
                }
            })


        } else if (args[0] === 'reset') {
            let res = await pre.findOne({ guildid: interaction.guild.id });

			if(!res) {
				let embed = new EmbedBuilder()
					.setDescription(`Goodbye message is already turned off`)
					.setColor(embedError)

				return interaction.reply( { embeds: [embed] })
			}

            pre.findOne({ guildid: message.guild.id }).then(result => {
                pre.deleteOne({ guildid: message.guild.id }).catch(console.error)			
                
                try{
                    const embed = new EmbedBuilder()
                        .setDescription(`Goodbye message is now turned off`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

                    message.reply( { embeds: [embed] })
                } catch(error) {
                    return;
                }
            })

        } else {

            const ress =  await pre.findOne({guildid: message.guild.id})

            if(ress && ress.channelid)welcome = ress.channelid;

            if(!ress){
                try{
                    const embed = new EmbedBuilder()
                        .setDescription(`Goodbye Message is **NOT SET**`)
                        .setColor(embedNeutral)
                        .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                    
                    return message.reply( { embeds: [embed] });
                } catch(error) {
                    return;
                }

            } else {
                try{
                    const embed = new EmbedBuilder()
                        .setDescription(`Goodbye Message is **SET**`)
                        .setColor(embedNeutral)
                        .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                        .addFields(
                            { name: 'Goodbye Channel', value: `<#${welcome}>`, inline: false },
                        )

                return message.reply( { embeds: [embed] });

                } catch(error) {
                    return;
                }
            }
        }
    }  
}