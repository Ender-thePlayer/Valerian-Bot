const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "avatar",
    category: "Guild",
    description: "Sends your or a user's Discord avatar",
	aliases: ['av'],
    usage: "[user]",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    execute: async (message, args, client) => {

        let member = message.mentions.members.first() || message.member;

        const x64 = member.user.displayAvatarURL({ format: "png", dynamic: true, size: 64 });
        const x128 = member.user.displayAvatarURL({ format: "png", dynamic: true, size: 128 });
        const x256 = member.user.displayAvatarURL({ format: "png", dynamic: true, size: 256 });
        const x512 = member.user.displayAvatarURL({ format: "png", dynamic: true, size: 512 });
        const x1024 = member.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 });
        const x2048 = member.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 });
        const x4096 = member.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 });

        let embed = new EmbedBuilder()
            .setDescription(`**${member.user.tag}**'s Avatar\n\nLinks: [x64](${x64}) | [x128](${x128}) | [x256](${x256}) | [x512](${x512}) | [x1024](${x1024})`)
            .setImage(x512)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        message.reply( { embeds: [embed] });

    }
}