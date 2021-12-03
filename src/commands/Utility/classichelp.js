// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const pre = require("../../schema/prefix.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "old",
    category: "Utility",
    aliases: [],
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

        let embed = new MessageEmbed()
            .setColor(embedNeutral)
            .setTitle('**Help Command**')
            .setDescription(`My prefix on this server is \`\`${p}\`\`. \n To find more help about a specific command, type \`\`${p}<command>\`\`, replacing \`\`<command>\`\` with one of the commands listed below. Type \`\`${p}aliases\`\` for a list of shortcuts for many of these commands. [⠀](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
            .addFields(
                { name: 'Utility Commands', value: '```\nabout\nchangelogs\nping\nhelp\naliases\ninfo\nping```', inline: true },
                { name: 'Fun Commands', value: '```\nhowgay\nmeme\n8ball\nf\nrickroll```', inline: true },
                { name: 'Moderation Commands', value: '```\nclear\nslowmode\nkick\nban```', inline: true },
                { name: 'Music Commands', value: '```\n247\nclearqueue\nplay```', inline: true },
                { name: 'Guild Commands', value: '```\nserverinfo\nuserinfo\nticket\navatar```', inline: true },
                { name: 'Config Commands', value: '```\nsetprefix```', inline: true },
                { name: 'Quick Links', value: "**[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=810856860751495198&permissions=8&scope=bot)** | **[Our Website](http://brobotelbot.ml)**"}
            )
            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

        await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
}};