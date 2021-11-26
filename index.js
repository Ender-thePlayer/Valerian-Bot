const { Discord, Client, Collection, GuildMember, Intents, MessageEmbed, Interaction } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/BrobotelBot");
const i18n = require("i18n");

const myIntents = new Intents();
myIntents.add([32767]);

const client = new Client({
  intents: myIntents,
  disableMentions: "everyone",
  unknownCommandResponse: true,
  restTimeOffset: 0
});
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();


i18n.configure({
  locales: "",
  directory: join(__dirname, "locales"),
  defaultLocale: "en",
  retryInDefaultLocale: true,
  objectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log("warn", msg);
  },

  logErrorFn: function (msg) {
    console.log("error", msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false
  }
});


client.on("ready", async (message) => {
  console.log(`bot is ready`);
  
  const arrayOfStatus = [
    `Help: js!help`,
    `Is in beta Officially!`,
  ];

  let index = 0;
  setInterval(() => {
    if(index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    client.user.setActivity(status, { type: "PLAYING"})
    index++;
  }, 10000)
	
});

client.on('guildMemberAdd', GuildMember => {
  let welcomeRole = GuildMember.guild.roles.cache.find(role => role.id === '846002032811835442');


  GuildMember.roles.add(welcomeRole);
  GuildMember.guild.channels.cache.get('848255866696499201').send(`<@${GuildMember.user.id}> Joined the Server!`)
})

client.on('guildMemberRemove', GuildMember => {
  GuildMember.guild.channels.cache.get('848261183756959784').send(`<@${GuildMember.user.id}> Left the Server!`)
})

client.on("warn", (info) => console.log(info));
client.on("error", console.error);

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("messageCreate", message => {

  if (message.author.bot) return;
  if (!message.guild) return;

  if(message.mentions.has(client.user)){
    let embed = new MessageEmbed()
      .setTitle('**Bot Description**')
      .setDescription(`Hello, my name is **Project Valerian**, a project made to convert Brobotel the Bot to js. \nMy prefix is \`\`js!\`\`. Type \`\`js!help\`\` or \`\`js!aliases\`\` to see the list of valid commands!`)
      .addFields(
        { name: 'Quick Links', value: "**[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=810856860751495198&permissions=8&scope=bot)** | **[Our Website](http://brobotelbot.ml)**"}
    )
      .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
      .setColor('#22a5b1')

    return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
    setTimeout(() => msg.delete(), 120000)})};

  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  if(commandName === null) return message.channel.send("error")

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) {

    let embed = new MessageEmbed()
      .setTitle('**Error Occurred**')
      .setDescription(`\`\`js!${commandName}\`\` is not a valid command! Type \`\`js!help\`\` or \`\`js!aliases\`\` to see the list of valid commands!`)
      .setColor('#000000')

    return message.channel.send( { embeds: [embed] }).then(setTimeout(() => message.delete())).then(msg =>{
    setTimeout(() => msg.delete(), 120000)})};
  
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        i18n.__mf("common.cooldownMessage", { time: timeLeft.toFixed(1), name: command.name })
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


  
  try {
    command.execute(message, args, client, Discord);
  } catch (error) {
    console.error(error);
    message.reply(i18n.__(error)).catch(console.error);
  }
});
