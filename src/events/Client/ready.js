const { ActivityType } = require("discord.js");
const { prefix } = require("../../config.js");
const { message } = require("../../config.js");
const { type } = require("../../config.js");
const { status } = require("../../config.js");

module.exports = async (client) => {
    client.guild.leave('849685362469109790');
    
    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

    let activity = `${status}` || 'online';
    let types = `${type}` || 'Playing';
    let name = `${message}` || `${prefix}help`;

    client.user.setPresence({
        status: activity,
        activities: [{
            name: name,
            type: ActivityType.types
        }]
    });

}
