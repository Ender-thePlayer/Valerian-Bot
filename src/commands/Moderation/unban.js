const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "unban",
    category: "Moderation",
    description: "Unbans a user from the server",
	aliases: "",
    usage: "<user ID>",
	enabled: true,
	owner: false,
	botPerms: ['ModerateMembers'],
	userPerms: ['ModerateMembers'],
    nsfw: false,
    args: true,
    execute: async (message, args, client) => {

        const rgx = /^(?:<@!?)?(\d+)>?$/;
        let id = args[0]
        let bannedUsers = await message.guild.bans.fetch();

        if (!id) {
            let embed = new EmbedBuilder()
                .setDescription('That isn`t a user!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        };

        if (!rgx.test(id)){
            let embed = new EmbedBuilder()
                .setDescription('That isn`t a valid user ID!')
                .setColor(embedError)

            return message.reply( { embeds: [embed] })
        }

        try{
            let user = bannedUsers.get(id);

            if (!user){
                let embed = new EmbedBuilder()
                    .setDescription('Unable to find user, please check the provided ID!')
                    .setColor(embedError)

                return message.reply( { embeds: [embed] })
            }

            message.guild.members.unban(id)

            const embed = new EmbedBuilder()
                .setDescription(`<@${id}> was unbanned!`)
                .setColor(embedSuccess)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
    
            message.reply( { embeds: [embed] })

        } catch(error) {
            return;
        }
    }
}