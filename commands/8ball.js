const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "_8ball",
  aliases: ["8ball"],
  description: "Responds to a question!",
  execute(message, args) {

    let embed = new Discord.MessageEmbed()
    .setTitle('**Error Occurred**')
    .setColor('#000000')
    .setDescription('Please mention a Question to Respond')

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

            let embed = new Discord.MessageEmbed()
                .setColor('#dd6fb9')
                .setTitle('**8ball Command**')
                .addField(`You Asked: ${question}`, `My response is ${responses[Index]}`)
                .setTimestamp()
                .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

            message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
                setTimeout(() => msg.delete(), 120000)})};
        
}};