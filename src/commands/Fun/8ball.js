// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// command \\

module.exports = {
    name: "_8ball",
    category: "Fun",
    aliases: ['8ball'],
    description: "8ball Command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let embed = new MessageEmbed()
            .setTitle('**Error Occurred**')
            .setDescription('Please mention a Question to Respond')
            .setColor(embedError)

        if (!args[0]) {
            return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                    setTimeout(() => msg.delete(), 120000)});
        
        } else {

            const responses = [
                "it's certain.",
                "it's decidedly so.",
                "without a doubt.",
                "yes - definitely.",
                "you may rely on it.",
                "as I see it, yes.",
                "most likely.",
                "the outlook is good.",
                "yes.",
                "signs point to yes.",
                "reply hazy, try again.",
                "ask again later.",
                "better not tell you now.",
                "cannot predict now.",
                "concentrate and ask again.",
                "don't count on it.",
                "no.",
                "My sources say no.",
                "the outlook is not so good.",
                "I'm very doubtful."
            ];
 
            const Index = Math.floor(Math.random() * responses.length);
            
            let question = args.slice().join(" ")

            let embed = new MessageEmbed()
                .setTitle('**8ball Command**')
                .addField(`You Asked: ${question}`, `My response is ${responses[Index]}`)
                .setColor(embedNeutral)
                .setTimestamp()
                .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))

            message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
                setTimeout(() => msg.delete(), 120000)});
        }    
    }
}