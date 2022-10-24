const { embedNeutral } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { embedError } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const pre = require("../../schema/welcome.js");
const mongoose = require('mongoose')

module.exports = {
    name: "welcome",
    category: "Moderation",
    description: "Sets a custom channel to send a message and to give a role when someone has joined the server",
	aliases: [],
    usage: "\n | (no args)\n | set <channel> <role>\n | reset",
	enabled: true,
	owner: false,
	botPerms: ['ManageGuild', 'ManageRoles'],
	userPerms: ['ManageGuild', 'ManageRoles'],
    nsfw: false,
    args: false,
  	execute: async (message, args, client) => {

		if (args[0] === 'set') {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            let role = message.mentions.roles.first() || message.guild.roles.cache.find(role => role.id === args[2]);
            
            if (!channel) {
                const embed = new EmbedBuilder()
                    .setDescription("Please mention the welcome channel!")
                    .setColor(embedError)
                return message.reply( { embeds: [embed] })
            }

            if (!role) {
                const embed = new EmbedBuilder()
                    .setDescription("Please mention the welcome role!")
                    .setColor(embedError)
                return message.reply( { embeds: [embed] })
            }
            
            pre.findOne({ guildid: message.guild.id }).then(result => {

                let duck = new pre({
                    _id: new mongoose.Types.ObjectId(),
                    guildid: message.guild.id,
                    channelid: channel.id,
                    roleid: role.id
                })

                try{
                    const embed = new EmbedBuilder()
                        .setDescription(`The welcome channel for this server is now set to **<#${channel.id}>**`)
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

            pre.findOne({ guildid: message.guild.id }).then(result => {
                pre.deleteOne({ guildid: message.guild.id }).catch(console.error)			

                try{
                    const embed = new EmbedBuilder()
                        .setDescription(`Welcome message is now turned off`)
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
            if(ress && ress.roleid)roles = ress.roleid;

            try{
                if(!ress){
                    const embed = new EmbedBuilder()
                        .setDescription(`Welcome Message is **NOT SET**`)
                        .setColor(embedNeutral)
                        .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                    
                    return message.reply( { embeds: [embed] });
    
                } else {
    
                    const embed = new EmbedBuilder()
                        .setDescription(`Welcome Message is **SET**`)
                        .setColor(embedNeutral)
                        .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                        .addFields(
                            { name: 'Welcome Channel', value: `<#${welcome}>`, inline: false },
                            { name: 'Welcome Role', value: `<@&${roles}>`, inline: false },
    
                        )
    
                    return message.reply( { embeds: [embed] });
                }

            } catch(error) {
                return;
            }
        }
    }  
}