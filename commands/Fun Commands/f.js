const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "f",
  aliases: ["F"],
  description: "Responds to a question!",
  execute(message, args) {

    const links = [
        'https://c.tenor.com/BZ4V-B05un8AAAAd/pay-respects-press-f.gif',
        'https://c.tenor.com/9f1lboKKmBUAAAAC/keyboard-hyperx.gif',
        'https://c.tenor.com/BaJDchtzSMQAAAAC/f-letter-f-burts.gif',
        'https://c.tenor.com/DPfEX5kb9vMAAAAC/letter-f.gif',
        'https://c.tenor.com/rAuQOw-WY7IAAAAC/press-f-pay-respect.gif',
        'https://c.tenor.com/H8DA2jkNgtwAAAAC/team-fortress2-pay-respects.gif'
        ];

    const Index = Math.floor(Math.random() * links.length);
    
    let embed = new Discord.MessageEmbed()
        .setColor('#dd6fb9')
        .setTitle('**F in Chat Command**')
        .setImage(links[Index])
        .setTimestamp()
        .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

    message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)});
        
}};