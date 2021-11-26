const client = require("../index")

client.on('guildMemberAdd', GuildMember => {
    let welcomeRole = GuildMember.guild.roles.cache.find(role => role.id === '846002032811835442');
  
  
    GuildMember.roles.add(welcomeRole);
    GuildMember.guild.channels.cache.get('848255866696499201').send(`<@${GuildMember.user.id}> Joined the Server!`)
  })