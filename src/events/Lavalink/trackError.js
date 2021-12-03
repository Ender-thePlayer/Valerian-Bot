// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { MessageEmbed} = require("discord.js");

// events \\
    
module.exports = async (client, player, track, payload) => {

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    let embed = new MessageEmbed()
        .setColor(embedError)
        .setTitle('**Error Occurred**')
        .setDescription("Error when loading song! Track Error!");

    channel.send({embeds: [embed]}).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})

    client.logger.log(`Error when loading song! Track is error in [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

}