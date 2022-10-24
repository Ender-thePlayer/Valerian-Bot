const { readdirSync } = require('fs');

module.exports = (client) => {
    let num = 0;
    readdirSync("./src/events/Lavalink/").forEach(file => {
        const event = require(`../events/Lavalink/${file}`);
        let eventName = file.split(".")[0];
        client.logger.log(`Started Loading ${eventName} Lavalink Event`, "event");
        client.manager.on(eventName, event.bind(null, client));
        num++
    });

    let count = 0;
    readdirSync("./src/events/Client/").forEach(file => {
        const event = require(`../events/Client/${file}`);
        let eventName = file.split(".")[0];
        client.logger.log(`Started Loading ${eventName} Client Event`, "event");
        client.on(eventName, event.bind(null, client));
        count++;
    });

    client.logger.log(`Successfully Loaded ${num} Lavalink Events`, "done");
    client.logger.log(`Successfully Loaded ${count} Client Events`, "done");
}