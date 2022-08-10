const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { prefix } = require("../../config.js");
const pre = require("../../schema/prefix.js");
const { readdirSync } = require("fs");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "help",
    category: "Utility",
    aliases: ['h'],
    description: "Shows a list with all avable commands.",
    args: false,
    usage: "[command]",
    permission: [],
    owner: true,
    execute: async (message, args, client) => {

		const res = await pre.findOne({ guildid: message.guild.id })
		let p;
		if (!res) p = prefix
		else p = res.prefix;

		if (!args[0]) {
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
				new MessageEmbed()
					.setThumbnail(client.user.displayAvatarURL())
					.setColor(embedNeutral)
					.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
					.setDescription(` Hi <@${message.author.id}>, I'm <@${client.user.id}>.\n
					A multi-purpose bot with a lot of useful commands, that's on 24/7 and that's updated frequently for a good user experience.\n
					We've changed the discord server to a new one [here](https://discord.gg/svzyfVBmH2).
					To find more about a command, type \`\`${p}help [command]\`\`
					\`\`\`\nPrefix: ${p}\nParameters: <> = required, [] = optional\`\`\`
					**[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)** • **[Discord Server](https://discord.gg/svzyfVBmH2)**
					`),
	
				new MessageEmbed()
					.setDescription('These are all avable commands.')
					.setColor(embedNeutral)
					.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
					.addFields(
						{ name: 'Config Commands [2]', value: '``resetprefix`` ``setprefix``', inline: false },
						{ name: 'Guild Commands [3]', value: '``avatar`` ``serverinfo`` ``userinfo``', inline: false },
						{ name: 'Moderation Commands [5]', value: '``ban`` ``bansave`` ``clear`` ``kick`` ``slowmode``', inline: false },
						{ name: 'Music Commands [15]', value: '``clearqueue`` ``filters`` ``loop`` ``nowplaying`` ``pause`` ``play`` ``queue`` ``remove`` ``resume`` ``seek`` ``shuffle`` ``skip`` ``skipto`` ``stop`` ``volume``', inline: false },
						{ name: 'Utility Commands [5]', value: '``botstats`` ``changelogs`` ``help`` ``ping``', inline: false },

					),
	
			];
	
			await pagination(message, embeds);

		} else {
			let cots = [];
			let catts = [];
        
            readdirSync("./src/commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;

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
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                  	(c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
        
            if (!command) {
				const embed = new MessageEmbed()
					.setDescription(`Invalid command! Please use \`\`${p}help\`\` to see al avable commands.`)
					.setColor(embedError)
					
				return message.reply( { embeds: [embed] })
			}
        
            const embed = new MessageEmbed()
				.setDescription(command.name ? `Command: **${command.name}**` : 'Command: No name.')
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
				.addFields(
					{ name: 'Description:', value: command.description ? `\`\`\`${command.description}\`\`\`` : 'No description for this command.',inline: false },
					{ name: 'Usage:', value: command.usage ? `\`\`\`${p}${command.name} ${command.usage}\`\`\`` : `\`\`\`${p}${command.name}\`\`\``,inline: false },
					{ name: 'Aliases:', value:command.aliases ? `\`\`\`${command.aliases.join(', ')}\`\`\`` : 'No aliases for this command.', inline: false }
				)

            return message.reply({ embeds: [embed] });
        }
    },
};

async function pagination(interaction, embeds) {
	let allbuttons = new MessageActionRow().addComponents([
//		new MessageButton().setStyle("SECONDARY").setCustomId("0").setLabel("<<"),
		new MessageButton().setStyle("SECONDARY").setCustomId("1").setLabel("<"),
		new MessageButton().setStyle("SECONDARY").setCustomId("3").setLabel(">"),
//		new MessageButton().setStyle("SECONDARY").setCustomId("4").setLabel(">>"),
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

	if (interaction.deferred) {
		sendMsg = await interaction.followUp({
			embeds: [embeds[0]],
			components: [allbuttons],
		})

	} else {
		sendMsg = await interaction.reply({
			embeds: [embeds[0]],
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
