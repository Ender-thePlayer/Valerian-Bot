const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { EmbedBuilder} = require("discord.js");
    
module.exports = async (client, player, track, payload) => {
    
    const channel = client.channels.cache.get(player.textChannel);

    let embed = new EmbedBuilder()
    .setDescription("Error when loading song! Track Stuck!")
    .setColor(embedError);

    channel.send({embeds: [embed]})

    client.logger.log(`Error when loading song! Track stuck in [${player.guild}]!`, "error");
    if (!player.voiceChannel) player.destroy();
}