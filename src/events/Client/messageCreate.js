// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");

const pre = require("../../schema/prefix.js");

// events \\

module.exports = async (client, message) => {
   
    if (message.author.bot) return;
    if (!message.guild) return;

    let prefix = client.prefix;
    const channel = message?.channel;
    const ress =  await pre.findOne({guildid: message.guild.id})

    if(ress && ress.prefix)prefix = ress.prefix;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    if (message.content.match(mention)) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Invite")
                    .setStyle("LINK")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
            );

        const embed = new MessageEmbed()
            .setTitle('**About Command**')
            .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 512 }))
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
            .addFields(

                {
                    name: "Creator",
                    value: `[EnderDatsIt](https://github.com/Ender-thePlayer)`,
                    inline: true
                },

                {
                    name: "Host",
                    value: `[Railway](https://railway.app/)`,
                    inline: true
                },

                {
                    name: "Support Server",
                    value: `[Discord](https://discord.gg/nmfrhCWzkA)`,
                    inline: true
                },

                {
                    name: "\u200b",
                    value: `**[Valerian Bot](n)** is a multi purpose discord bot made just for you, based on [LavaMusic](https://github.com/brblacky/lavamusic)! My prefix is \`\`${prefix}\`\`. Type \`\`${prefix}help\`\` or \`\`${prefix}aliases\`\` to see the list of valid commands!`,
                    inline: false
                },

                {
                    name: "\u200b",
                    value: `[LavaMusic](https://github.com/brblacky/lavamusic) is a Discord music bot with many great features and supports multiple playback sources. It was created by **[Blacky#6618](https://github.com/brblacky)** and **[Venom#9718](https://github.com/Venom9718/)**.`,
                    inline: false
                },
            )
    return message.reply( { embeds: [embed], components: [row] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})
    }

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [ matchedPrefix ] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
    let embed = new MessageEmbed()
        .setTitle('**Error Occurred**')
        .setDescription(`\`\`${prefix}${commandName}\`\` is not a valid command! Type \`\`${prefix}help\`\` or \`\`${prefix}aliases\`\` to see the list of valid commands!`)
        .setColor(embedError)

    return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
        setTimeout(() => msg.delete(), 120000)})};

    if(!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute **\`${command.name}\`** command.` }).catch(() => {});
    if(!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;
    if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return await message.channel.send({ content: `I don't have **\`EMBED_LINKS\`** permission to execute **\`${command.name}\`** command.` }).catch(() => {});
    
    const embed = new MessageEmbed()
        .setTitle('**Error Occurred**')
        .setColor(embedError);

    // args: true,
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        
        // usage: '',
        if (command.usage) {
        	reply = `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        embed.setDescription(reply);
        return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {
        embed.setDescription("You can't use this command.");
		return message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});
    }
    if (!channel.permissionsFor(message.guild.me)?.has(Permissions.FLAGS.EMBED_LINKS) && client.user.id !== userId) {
        embed.setDescription(`Error: I need \`EMBED_LINKS\` permission to work.`)
        return channel.send({ embeds: [embed] });
    }
    if (command.owner && message.author.id !== `${client.owner}`) {
        embed.setDescription("Only <@506097799536967710> can use this command!");
        return message.channel.send({embeds: [embed]});
    }

    const player = message.client.manager.get(message.guild.id);

    if (command.player && !player) {
        embed.setDescription("There is no player for this guild.");
        return message.channel.send({embeds: [embed]});
    }

    if (command.inVoiceChannel && !message.member.voice.channel) {
        embed.setDescription("You must be in a voice channel!");
        return message.channel.send({embeds: [embed]});
    }

    if (command.sameVoiceChannel && message.member.voice.channel !== message.guild.me.voice.channel) {
        embed.setDescription(`You must be in the same channel as ${message.client.user}!`);
        return message.channel.send({embeds: [embed]});
    }

    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
        return message.channel.send({embeds: [embed]});
    }
}
