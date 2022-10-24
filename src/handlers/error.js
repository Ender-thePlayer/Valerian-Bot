const { EmbedBuilder, WebhookClient } = require("discord.js");
const { embedError } = require("../config.js");
const uuid = require('uuid');
require('dotenv').config()

module.exports = (client) => {
    const embed = new EmbedBuilder()
        .setColor(embedError);

    client.on("disconnect", () => console.log("Bot is disconnecting..."))
    client.on("reconnecting", () => console.log("Bot reconnecting..."))
    client.on('warn', error => console.log(error));
    client.on('error', error => console.log(error));

    process.on('unhandledRejection', error => {
        console.log(error);

        try{
            var errorID = uuid.v4(error);

            var getStackTrace = function() {
                Error.captureStackTrace(error, getStackTrace);
                return error.stack;
            };

            const webhookClient = new WebhookClient({ url: process.env.ADMIN_LOGS });
            embed.setDescription(`Error ID: **${errorID}**\n\`\`\`css\n${getStackTrace()}\n\`\`\``);
            return webhookClient.send({
                embeds: [embed],
            });
        } catch(error){
            return;
        }
    });

    process.on('uncaughtException', error => {
        console.log(error);

        try{
            var errorID = uuid.v4(error);

            var getStackTrace = function() {
                Error.captureStackTrace(error, getStackTrace);
                return error.stack;
            };

            const webhookClient = new WebhookClient({ url: process.env.ADMIN_LOGS });
            embed.setDescription(`Error ID: **${errorID}**\n\`\`\`css\n${getStackTrace()}\n\`\`\``);
            return webhookClient.send({
                embeds: [embed],
            });
        } catch(error){
            return;
        }
    });
}