const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Sends your or a user's Discord avatar",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    options: [
        {
            name: "user",
            description: "The user whose avatar you want to see",
            type: 6,
            required: false,
        }
    ],
    run: async (client, interaction) => {

        let member = interaction.options.getUser('user') || interaction.member.user;

        const x64 = member.displayAvatarURL({ format: "png", dynamic: true, size: 64 });
        const x128 = member.displayAvatarURL({ format: "png", dynamic: true, size: 128 });
        const x256 = member.displayAvatarURL({ format: "png", dynamic: true, size: 256 });
        const x512 = member.displayAvatarURL({ format: "png", dynamic: true, size: 512 });
        const x1024 = member.displayAvatarURL({ format: "png", dynamic: true, size: 1024 });
        const x2048 = member.displayAvatarURL({ format: "png", dynamic: true, size: 2048 });
        const x4096 = member.displayAvatarURL({ format: "png", dynamic: true, size: 4096 });

        let embed = new EmbedBuilder()
            .setDescription(`**${member.tag}**'s Avatar\n\nLinks: [x64](${x64}) | [x128](${x128}) | [x256](${x256}) | [x512](${x512}) | [x1024](${x1024})`)
            .setImage(x512)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

        interaction.reply( { embeds: [embed] });

    }
}