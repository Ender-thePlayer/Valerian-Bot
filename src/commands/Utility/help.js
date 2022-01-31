// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const pre = require("../../schema/prefix.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "help",
    category: "Utility",
    aliases: ['h'],
    description: "Help Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

        const res = await pre.findOne({ guildid: message.guild.id })
        let p;
        if (!res) p = prefix
        else p = res.prefix;

        const embed = new MessageEmbed()
            .setTitle('**Help Command**')
            .setDescription(`My prefix on this server is \`\`${p}\`\`. \n To find more help about a specific command, type \`\`${p}help <command>\`\`, replacing \`\`<command>\`\` with one of the commands listed below. Type \`\`${p}aliases\`\` for a list of shortcuts for many of these commands. [⠀](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
            .addFields(
                { name: 'Utility Commands [6]', value: '```\nabout\naliases\nchangelogs\nhelp\ninfo\nping```', inline: true },
                { name: 'Fun Commands [6]', value: '```\n8ball\navatar\nf\nhowgay\nmeme\nrickroll```', inline: true },
                { name: 'Moderation Commands [5]', value: '```\nban\nbansave\nclear\nkick\nslowmode```', inline: true },
                { name: 'Guild Commands [3]', value: '```\nserverinfo\nticket\nuserinfo```', inline: true },
                { name: 'Config Commands [1]', value: '```\nsetprefix```', inline: true },
            )

        message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
    }
};