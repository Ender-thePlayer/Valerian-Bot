const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "howgay",
  aliases: ["gay"],
  description: "Shows how gay is someone!",
  execute(message) {

    let member = message.mentions.members.first() || message.member;

    var arr = [];
    while(arr.length < 1){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }

    let embed = new Discord.MessageEmbed()
      .setColor('#dd6fb9')
      .setTitle('**How Gay Command**')
      .addField(`${member.user.tag} is:`, `${arr}% gay!`)
      .setTimestamp()
      .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)});

}};
