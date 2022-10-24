const { readdirSync } = require('fs');

module.exports = (client) => {
    let num = 0;
    readdirSync("./src/commands/").forEach(dir => {
        const commandFiles = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`);
            client.logger.log(`Started Loading ${command.category} Command ${command.name}`, "cmd");
            client.commands.set(command.name, command);
        }
        num++
    });
    client.logger.log(`Successfully Loaded ${num} Commands`, "done");
}