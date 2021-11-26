const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Shows all Commands",
  execute(message, args, client) {

    if (!args[0]) {
          let embed = new Discord.MessageEmbed()
            .setColor('#dd6fb9')
            .setTitle('**Help Command**')
            .setDescription('My prefix is ``js!``. \n To find more help about a specific command, type ``js!help <command>``, replacing ``<command>`` with one of the commands listed below. Type ``js!aliases`` for a list of shortcuts for many of these commands. [⠀](https://www.youtube.com/watch?v=dQw4w9WgXcQ)')
            .addFields(
                { name: 'Util Commands', value: '```changelogs \nping \nhelp \nserverinfo \nuserinfo \naliases \ninfo```', inline: true },
                { name: 'Fun Commands', value: '```howgay \nmeme \n8ball \navatar \nf \nrickroll```', inline: true },
                { name: 'Moderation Commands', value: '```clear \nslowmode \nkick \nban```', inline: true },
                { name: 'Quick Links', value: "**[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=810856860751495198&permissions=8&scope=bot)** | **[Our Website](http://brobotelbot.ml)**"}
            )
            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
            


          message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
            setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'avatar') || (args[0] == 'av')) {
          let embed = new Discord.MessageEmbed()
            .setColor('#dd6fb9')
            .setTitle('**Avatar Help Command**')
            .setDescription('This command shows your/another user`s avatar. The default is __**Your Avatar**__')
            .addFields(
                { name: 'Usage', value: '```js!avatar | js!avatar <mention>```', inline: false },
                { name: 'Aliases', value: '```av```', inline: false },
            )
            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

          message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
            setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'aliases') || (args[0] == 'as')) {
          let embed = new Discord.MessageEmbed()
            .setColor('#dd6fb9')
            .setTitle('**Aliases Help Command**')
            .setDescription('This command shows all commands aliases')
            .addFields(
                { name: 'Usage', value: '```js!aliases```', inline: false },
                { name: 'Aliases', value: '```alias```', inline: false },
            )
            .setTimestamp()
            .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
  
          message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
            setTimeout(() => msg.delete(), 120000)})};

    if (args[0] == 'ban') {
      let embed = new Discord.MessageEmbed()
          .setColor('#dd6fb9')
          .setTitle('**Ban Help Command**')
          .setDescription('This command bans a user from you server. The default reason is __**None**__')
          .addFields(
              { name: 'Usage', value: '```js!ban <user> | js!ban <user> <reason>```', inline: false }
          )
          .setTimestamp()
          .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'changelogs') || (args[0] == 'ch')) {
          let embed = new Discord.MessageEmbed()
              .setColor('#dd6fb9')
              .setTitle('**Changelogs Help Command**')
              .setDescription('This command shows the newest update and change logs')
              .addFields(
                  { name: 'Usage', value: '```js!changelogs```', inline: false },
                  { name: 'Aliases', value: '```ch```', inline: false },
              )
              .setTimestamp()
              .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))
    
          message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
            setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'clear') || (args[0] == 'purge')) {
          let embed = new Discord.MessageEmbed()
              .setColor('#dd6fb9')
              .setTitle('**Clear Help Command**')
              .setDescription('This command clears/purges an amount of messages you specify. The default is __**10 Messages**__')
              .addFields(
                  { name: 'Usage', value: '```js!clear | js!clear <amount>```', inline: false },
                  { name: 'Aliases', value: '```purge```', inline: false },
              )
              .setTimestamp()
              .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

          message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
            setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'howgay') || (args[0] == 'gay')) {
      let embed = new Discord.MessageEmbed()
          .setColor('#dd6fb9')
          .setTitle('**Howgay Help Command**')
          .setDescription('This command shows how gay is someone! The default is __**How Gay are You**__')
          .addFields(
              { name: 'Usage', value: '```js!howgay | js!howgay <mention>```', inline: false },
              { name: 'Aliases', value: '```gay```', inline: false },
          )
          .setTimestamp()
          .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'info') || (args[0] == 'botinfo') || (args[0] == 'i')) {
      let embed = new Discord.MessageEmbed()
          .setColor('#dd6fb9')
          .setTitle('**Info Help Command**')
          .setDescription('This command shows some info about the bot')
          .addFields(
              { name: 'Usage', value: '```js!info```', inline: false },
              { name: 'Aliases', value: '```botinfo, i```', inline: false },
          )
          .setTimestamp()
          .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};

    if (args[0] == 'kick') {
      let embed = new Discord.MessageEmbed()
          .setColor('#dd6fb9')
          .setTitle('**Kick Help Command**')
          .setDescription('This command kicks a user from you server. The default reason is __**None**__')
          .addFields(
              { name: 'Usage', value: '```js!kick <mention> | js!kick <mention> <reason>```', inline: false }
          )
          .setTimestamp()
          .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'meme') || (args[0] == 'm')) {
      let embed = new Discord.MessageEmbed()
          .setColor('#dd6fb9')
          .setTitle('**Meme Help Command**')
          .setDescription('This command sends a meme from r/memes')
          .addFields(
              { name: 'Usage', value: '```js!meme```', inline: false },
              { name: 'Aliases', value: '```m```', inline: false },

          )
          .setTimestamp()
          .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'ping') || (args[0] == 'latency')) {
      let embed = new Discord.MessageEmbed()
          .setColor('#dd6fb9')
          .setTitle('**Ping Help Command**')
          .setDescription('This command shows the bot`s ping')
          .addFields(
              { name: 'Usage', value: '```js!ping```', inline: false },
              { name: 'Aliases', value: '```latency```', inline: false },

          )
          .setTimestamp()
          .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};
    
    if ((args[0] == 'serverinfo') || (args[0] == 'si')) {
      let embed = new Discord.MessageEmbed()
          .setColor('#dd6fb9')
          .setTitle('**ServerInfo Help Command**')
          .setDescription('This command shows some info about the respective server')
          .addFields(
              { name: 'Usage', value: '```js!serverinfo```', inline: false },
              { name: 'Aliases', value: '```si```', inline: false },

          )
          .setTimestamp()
          .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'slowmode') || (args[0] == 'slow')) {
      let embed = new Discord.MessageEmbed()
          .setColor('#dd6fb9')
          .setTitle('**Slowmode Help Command**')
          .setDescription('This command kicks a user from you server. The default is __**Slowmode off**__')
          .addFields(
              { name: 'Usage', value: '```js!slowmode | js!slowmode <time>```', inline: false },
              { name: 'Aliases', value: '```slow```', inline: false },

          )
          .setTimestamp()
          .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};

    if ((args[0] == 'userinfo') || (args[0] == 'ui')) {
      let embed = new Discord.MessageEmbed()
          .setColor('#dd6fb9')
          .setTitle('**UserInfo Help Command**')
          .setDescription('This command shows some info about the respective user! The default is __**Info About You**__')
          .addFields(
              { name: 'Usage', value: '```js!userinfo | js!userinfo <mention>```', inline: false },
              { name: 'Aliases', value: '```ui```', inline: false },

          )
          .setTimestamp()
          .setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

      message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};

        }};