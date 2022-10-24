const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "nickname",
    category: "Moderation",
    description: "Sets a nickname for a user",
	aliases: ['nick'],
    usage: "\n | (no args)\n | set <user> <nickname>\n | reset <user>",
	enabled: true,
	owner: false,
	botPerms: ['ModerateMembers'],
	userPerms: ['ModerateMembers'],
    nsfw: false,
    args: true,
    execute: async (message, args, client) => {

        let target = message.mentions.members.first();
        let nickname = args.slice(2).join(" "); 

		if (args[0] === 'set') {
            if (!target) {
                let embed = new EmbedBuilder()
                    .setDescription('That isn`t a user!')
                    .setColor(embedError)

                return message.reply( { embeds: [embed] })
            };

            if (!nickname) {
                let embed = new EmbedBuilder()
                    .setDescription('Please mention the nickname!')
                    .setColor(embedError)

                return message.reply( { embeds: [embed] })
            };

            if(!target.moderatable) {
                let embed = new EmbedBuilder()
                    .setDescription(`This user is a moderator!`)
                    .setColor(embedError)

                return message.reply( { embeds: [embed] })
            };
            try{
                target.setNickname(nickname)

                const embed = new EmbedBuilder()
                    .setDescription(`Changed the nickname for ${target}!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
                message.reply( { embeds: [embed] })

            } catch(error) {
                return;
            }

        } else if(args[0] === 'reset'){
            if (!target) {
                let embed = new EmbedBuilder()
                    .setDescription('That isn`t a user!')
                    .setColor(embedError)

                return message.reply( { embeds: [embed] })
            };

            if(!target.moderatable) {
                let embed = new EmbedBuilder()
                    .setDescription(`This user is a moderator!`)
                    .setColor(embedError)

                return message.reply( { embeds: [embed] })
            };
            try{
                target.setNickname(null)

                const embed = new EmbedBuilder()
                    .setDescription(`Reset the nickname for ${target}!`)
                    .setColor(embedSuccess)
                    .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
                message.reply( { embeds: [embed] })
    
            } catch(error) {
                return;
            }


        } else {
            if (!target) {
                let embed = new EmbedBuilder()
                    .setDescription('That isn`t a user!')
                    .setColor(embedError)

                return message.reply( { embeds: [embed] })
            };
            try{
                var t = target.nickname

                if(t == null){
                    let embed = new EmbedBuilder()
                        .setDescription(`${target} doesn't have a nickname!`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

                    return message.reply( { embeds: [embed] });
                        
                } else {
                    let embed = new EmbedBuilder()
                        .setDescription(`${target} has the nickname **${t}**!`)
                        .setColor(embedSuccess)
                        .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                        
                    return message.reply( { embeds: [embed] });

                }

            } catch(error) {
                return;
            }
        }
    }
}