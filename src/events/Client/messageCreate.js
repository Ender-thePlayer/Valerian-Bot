const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const pre = require("../../schema/prefix.js");

module.exports = async (client, message) => {
   
    if (message.author.bot) return;
    if (!message.guild) return;

    let prefix = client.prefix;
    const channel = message?.channel;
    const ress =  await pre.findOne({guildid: message.guild.id})

    if(ress && ress.prefix)prefix = ress.prefix;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    if (message.content.match(mention)) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Invite")
                    .setStyle("Link")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
        
                new ButtonBuilder()
                    .setLabel("Join")
                    .setStyle("Link")
                    .setURL(`https://discord.gg/svzyfVBmH2`),
            
            );

        const embed = new EmbedBuilder()
            .setDescription(`**Valerian Bot** is a multi-purpose music discord bot made by **[EnderDatsIt](https://github.com/Ender-thePlayer)**, based on **[LavaMusic](https://github.com/brblacky/lavamusic)**. My prefix in this server is \`\`${prefix}\`\`. Type \`\`${prefix}help\`\` to see the list of valid commands!\n\n**[LavaMusic](https://github.com/brblacky/lavamusic)** is a Discord music bot with many great features and supports multiple playback sources. It was created by **[Blacky#6618](https://github.com/brblacky)** and **[Venom#9718](https://github.com/Venom9718/)**.`)
            .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 512 }))
            .setColor(embedNeutral)
            .setImage('https://i.imgur.com/EDUWHjA.png')
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        return message.reply({ embeds: [embed], components: [row] });

    }

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [ matchedPrefix ] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute **\`${command.name}\`** command.` }).catch(() => {});
    if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewChannel)) return;
    if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return await message.channel.send({ content: `I don't have **\`EMBED_LINKS\`** permission in <#${message.channelId}> to execute **\`${command.name}\`** command.` }).catch(() => {});
    
    const embed = new EmbedBuilder()
        .setColor(embedError);

    if(!command.enabled) return;
    if (command.owner && message.author.id !== `${client.owner}`) {
        embed.setDescription(`Only ${client.owner} can use this command!`);
        return message.channel.send({embeds: [embed]});
    }
    if (command.userPerms && !message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
        embed.setDescription(`You don't have **\`${command.userPerms}\`** permission in <#${message.channelId}> to execute this command.`);
		return message.reply( { embeds: [embed] });
    }
    if (command.botPerms && !message.member.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
        embed.setDescription(`I need **\`${command.botPerms}\`** permission in <#${message.channelId}> to execute this command.`)
        return message.reply({ embeds: [embed] });
    }
    if(command.nsfw && !message.channel.nsfw){
        embed.setDescription(`This command is only accessible in NSFW channels.`);
        return message.reply({embeds: [embed]});
    }
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        
        if (command.usage) {
        	reply = `\nCommand Usage: **\`${prefix}${command.name} ${command.usage}\`**`;
        }
        
        embed.setDescription(reply);
        return message.reply( { embeds: [embed] });
    }
    const player = message.client.manager.get(message.guild.id);

    if (command.player && !player) {
        embed.setDescription("There is no player for this guild.");
        return message.channel.send({embeds: [embed]});
    }
    if (command.inVoiceChannel && !message.member.voice.channel) {
        return await message.reply({
            content: `You must be in a voice channel!`,
            ephemeral: true,
        }).catch(() => {});
    }
    if (command.sameVoiceChannel && message.guild.members.me.voice.channel) {
        if (message.member.voice.channel !== message.guild.members.me.voice.channel) {
            return await message.reply({
                content: `You must be in the same ${message.guild.members.me.voice.channel.toString()} to use this command!`,
                ephemeral: true,
            }).catch(() => {});
        }
    }

    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
        return message.channel.send({embeds: [embed]});
    }
}
