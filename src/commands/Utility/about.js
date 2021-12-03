// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "about",
    category: "Utility",
    aliases: [],
    description: "About Command",
    args: false,
    usage: "js!about",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let embed = new MessageEmbed()
            .setColor(embedNeutral)
            .setTitle('**About Command**')
            .setDescription(`**Valerian Bot** is owned by Ender under the name of EndR Productions and is helped by Yang, big thanks to Yang!`)
            .addFields(
                { name: 'Expected to Release on', value: '24.12.21 - Bot is: 7% ready'}
            )
            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

        await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
}};