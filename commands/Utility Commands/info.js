const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "info",
  aliases: ["botinfo", "i"],
  description: "Shows all Commands",
  execute(message, args, client) {

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let embed = new Discord.MessageEmbed()
        .setColor('#dd6fb9')
        .setTitle('**Info Command**')
        .addFields(
            { name: 'Bot Stuff:' , value: `Tag: <@${client.user.id}> \nID: ${client.user.id}` },
            { name: 'Serving:' , value: `${client.guilds.cache.size} servers`, inline: true},
            { name: 'Version:' , value: `beta_0.4.0`, inline: true },
            { name: 'DJS Version:' , value: `${require("discord.js").version}`, inline: true },
            { name: 'Uptime:', value: `${Math.round(days)} days, ${Math.round(hours)} hrs, ${Math.round(minutes)} mins, ${Math.round(seconds)} sec`},
            { name: 'Links:' , value: `**[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=810856860751495198&permissions=8&scope=bot)** \n⏵ Add Bot to Your Server!` },
        )
        .setTimestamp()
        .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
    


    message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)});

}};