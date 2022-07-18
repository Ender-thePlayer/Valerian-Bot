
const { embedError } = require("../../config.js");
const { MessageEmbed} = require("discord.js");
    
module.exports = async (client, player, track, payload) => {

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    let embed = new MessageEmbed()
    .setDescription("Error when loading song! Track Error!")
    .setColor(embedError);

    channel.send({embeds: [embed]})

    client.logger.log(`Error when loading song! Track is error in [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

}