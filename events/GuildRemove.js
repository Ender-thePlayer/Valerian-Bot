const client = require("../index")

client.on('guildMemberRemove', GuildMember => {
    GuildMember.guild.channels.cache.get('848261183756959784').send(`<@${GuildMember.user.id}> Left the Server!`)
  })