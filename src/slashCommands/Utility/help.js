const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { prefix } = require("../../config.js");
const pre = require("../../schema/prefix.js");
const { readdirSync } = require("fs");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows a list with all avable commands",
	owner: false,
	userPerms: [],
	botPerms: [],
	nsfw: false,
	options: 
	[
		{
			name: "command",
			description: "The command you want to see more information about",
			type: 3,
			required: false,
		},
	],
    run: async (client, interaction) => {

		const res = await pre.findOne({ guildid: interaction.guild.id })
		let p;
		if (!res) p = prefix
		else p = res.prefix;

		if (!interaction.options.getString('command')) {
			let categories = [];
	
			let ignored = [];
	
			readdirSync("./src/commands/").forEach((dir) => {
				if (ignored.includes(dir.toLowerCase())) return;

				const name = `${dir.toLowerCase()} ${dir.toUpperCase()}`;

				let cats = new Object();
	
				cats = {
					name: name,
					value: `\`${prefix}help ${dir.toLowerCase()}\``,
					inline: true,
				};
		
				categories.push(cats);
			});
			
			let embeds = [
				new EmbedBuilder()
					.setThumbnail(client.user.displayAvatarURL())
					.setColor(embedNeutral)
					.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
					.setDescription(` Hi <@${interaction.user.id}>, I'm <@${client.user.id}>.\n
					A multi-purpose bot with a lot of useful commands, that's on 24/7 and that's updated frequently for a good user experience.\n
					<:spoopy:1036075649942704208> Back in Spoopy Times once again
					To find more about a command, type \`\`${p}help [command]\`\` or \`\`/help [command]\`\`
					\`\`\`\nPrefix: ${p}\nParameters: <> = required, [] = optional\`\`\`
					**[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)** • **[Discord Server](https://discord.gg/svzyfVBmH2)**
					`),
	
				new EmbedBuilder()
					.setDescription('These are all avable commands (and SlashCommands)')
					.setColor(embedNeutral)
					.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
					.addFields(
						{ name: 'Config Commands [1]', value: '``prefix``', inline: false },
						{ name: 'Fun Commands [1]', value: '``meme``', inline: false },
						{ name: 'Guild Commands [4]', value: '``avatar`` ``serverinfo`` ``ticket`` ``userinfo``', inline: false },
						{ name: 'Moderation Commands [11]', value: '``ban`` ``bye`` ``clear`` ``kick`` ``mute`` ``nickname`` ``slowmode`` ``softban`` ``unban`` ``unmute`` ``welcome``', inline: false },
						{ name: 'Music Commands [14]', value: '``clearqueue`` ``filters`` ``loop`` ``nowplaying`` ``pause`` ``play`` ``queue`` ``remove`` ``resume`` ``seek`` ``shuffle`` ``skip`` ``stop`` ``volume``', inline: false },
						{ name: 'Utility Commands [4]', value: '``botstats`` ``changelogs`` ``help`` ``ping``', inline: false },
					),
	
			];
			await pagination(interaction, embeds);

		} else {
			let cots = [];
			let catts = [];
        
            readdirSync("./src/commands/").forEach((dir) => {
                if (dir.toLowerCase() !== interaction.options.getString('command').toLowerCase()) return;

                const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
                  	file.endsWith(".js"));
        
                const cmds = commands.map((command) => {
                  	let file = require(`../../commands/${dir}/${command}`);
        
                  	if (!file.name) return "No command name.";
        
                  	let name = file.name.replace(".js", "");
        
                  	let des = client.commands.get(name).description;
        
					let obj = {
						cname: `${name}`,
						des,
					};
        
                  	return obj;
                });
        
                let dota = new Object();
        
                cmds.map((co) => {
                  	dota = {
                    	name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                    	value: co.des ? co.des : "No Description",
                    	inline: true,
                  	};

                  	catts.push(dota);
                });
        
                cots.push(dir.toLowerCase());
            });
                
            const command =
                client.commands.get(interaction.options.getString('command').toLowerCase()) ||
                client.commands.find(
                  	(c) => c.aliases && c.aliases.includes(interaction.options.getString('command').toLowerCase()));
        
            if (!command) {
				const embed = new EmbedBuilder()
				.setDescription(`Invalid command! Please use \`\`${p}help\`\` or \`\`/help\`\`to see al avable commands.`)
				.setColor(embedError)
					
				return interaction.reply( { embeds: [embed] })
			}
        
            const embed = new EmbedBuilder()
				.setDescription(command.name ? `Command: **${command.name}**` : 'Command: No name.')
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
				.addFields(
					{ name: 'Description:', value: command.description ? `\`\`\`${command.description}\`\`\`` : '\`\`\`No description for this command.\`\`\`',inline: false },
					{ name: 'Usage:', value: command.usage ? `\`\`\`${p}${command.name} ${command.usage}\`\`\`` : `\`\`\`${p}${command.name}\`\`\``,inline: false },
					{ name: 'Aliases: (only for commands)', value:command.aliases ? `\`\`\`${command.aliases.join(', ')}\`\`\`` : '\`\`\`No aliases for this command.\`\`\`', inline: false }
				)

            return interaction.reply({ embeds: [embed] });
        }
    },
};

async function pagination(interaction, embeds) {
	let allbuttons = new ActionRowBuilder().addComponents([
//		new ButtonBuilder().setStyle("Secondary").setCustomId("0").setLabel("<<"),
		new ButtonBuilder().setStyle("Secondary").setCustomId("1").setLabel("<"),
		new ButtonBuilder().setStyle("Secondary").setCustomId("3").setLabel(">"),
//		new ButtonBuilder().setStyle("Secondary").setCustomId("4").setLabel(">>"),
	])

	if (embeds.length === 1) {
		if (interaction.deferred) {
			return interaction.followUp({
				embeds: [embeds[0]],
			})

		} else {
			return interaction.reply({
				embeds: [embeds[0]],
				fetchReply: true,
			})
		}
	}
        
    embeds = embeds.map((embed, index) => {
        return embed.setAuthor({
            name: `Page ${index + 1}/${embeds.length}`,
        });
    });
      
	let sendMsg;

	if (interaction.deferred == false) {
		await interaction.deferReply();
	  }

	if (interaction.deferred) {
		sendMsg = await interaction.followUp({
			embeds: [embeds[0]],
			content: '**NOTICE:** Commands will be replaced by SlashCommands in the next update!',
			components: [allbuttons],
		})

	}
      
    let filter = (m) => m.member.id === interaction.member.id;
      
    const collector = await sendMsg.createMessageComponentCollector({
        filter: filter,
        time: 120000,
    });

    let currentPage = 0;

    collector.on("collect", async (b) => {
        if (b.isButton()) {
            await b.deferUpdate().catch((e) => null);

            switch (b.customId) {
              	case "0":
                {
					if (currentPage != 0) {
						currentPage = 0;

						await sendMsg
						.edit({
							embeds: [embeds[currentPage]],
							components: [allbuttons],
						}).catch((e) => null);
					}
                }

                break;

              	case "1":
                {
                  	if (currentPage != 0) {
                    	currentPage -= 1;

                   		await sendMsg
                      	.edit({
							embeds: [embeds[currentPage]],
							components: [allbuttons],
                      	}).catch((e) => null);
						
                  	} else {
                    	currentPage = embeds.length - 1;
                    
						await sendMsg
                      	.edit({
                        	embeds: [embeds[currentPage]],
                        	components: [allbuttons],
                      	}).catch((e) => null);
                  	}
                }

                break;

              	case "3":
                {
                  	if (currentPage < embeds.length - 1) {
                    	currentPage++;
                    
						await sendMsg
                      	.edit({
                        	embeds: [embeds[currentPage]],
                        	components: [allbuttons],
                      	}).catch((e) => null);

                  	} else {
                    	currentPage = 0;
                    	
						await sendMsg
                      	.edit({
                        	embeds: [embeds[currentPage]],
                        	components: [allbuttons],
                      	}).catch((e) => null);
                  	}
                }

                break;

              	case "4":
                {
                  	currentPage = embeds.length - 1;
                  	
					await sendMsg
                    .edit({
                      	embeds: [embeds[currentPage]],
                      	components: [allbuttons],
                    }).catch((e) => null);
                }

                break;

              	default:
                
				break;
            }
        }
    });
      
    collector.on("end", async () => {
        allbuttons.components.forEach((btn) => btn.setDisabled(true));
        
		await sendMsg
        .edit({
            embeds: [embeds[currentPage]],
            components: [allbuttons],
        }).catch((e) => null)
    })
};
