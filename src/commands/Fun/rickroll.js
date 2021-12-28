// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "rickroll",
    category: "Fun",
    aliases: [ 'nevergonna', 'roll', 'rick' ],
    description: "Rickroll Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

        const links = [
            'https://c.tenor.com/x8v1oNUOmg4AAAAS/rickroll-roll.gif',
            'https://c.tenor.com/uzmFUkzbrxkAAAAd/rick-astley-rules.gif',
            'https://c.tenor.com/AaJj7EJzzdAAAAAd/challenge-find-out-when-this-gif-ends.gif',
            'https://c.tenor.com/CWgfFh7ozHkAAAAC/rick-astly-rick-rolled.gif',
            'https://c.tenor.com/3DOa1ly_iAUAAAAd/stick-bug-rick-roll.gif',
            'https://c.tenor.com/H9vtzwlgSF0AAAAd/rolling-down-in-the-deep.gif',
            'https://c.tenor.com/kuzyMt9tbUwAAAAd/secret-rick-roll.gif',
            'https://c.tenor.com/uA6paYn7vX0AAAAd/r2d2-rickroll.gif',
            'https://c.tenor.com/Rd0W8ZpwvyEAAAAd/rick-and-morty-pickle-rick.gif',
            'https://c.tenor.com/n8wwD5b8B44AAAAd/rick-roll-secret-rick-roll.gif',
            'https://c.tenor.com/UnA0tbTf0DMAAAAd/flushed-rickroll.gif'
            ];

        const Index = Math.floor(Math.random() * links.length);

        let embed = new MessageEmbed()
            .setTitle('**RickRoll Command**')
            .setImage(links[Index])
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

        message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
            
    }
}