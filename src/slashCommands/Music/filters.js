const { EmbedBuilder } = require("discord.js");
const { embedSuccess } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
	name: "filters",
    description: "Adjusts how song sounds",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    options: 
        [
            {
                name: "preset",
                description: "The preset you want for EQ",
                type: 3,
                required: true,
                choices:
                    [
                        {
                            name: 'party',
                            value: 'party',
                        },
                        {
                            name: 'bass',
                            value: 'bass',
                        },
                        {
                            name: 'radio',
                            value: 'radio',
                        },
                        {
                            name: 'pop',
                            value: 'pop',
                        },                        
                        {
                            name: 'trablebass',
                            value: 'trablebass',
                        },     
                        {
                            name: 'bassboost',
                            value: 'bassboost',
                        },                    
                        {
                            name: 'soft',
                            value: 'soft',
                        },                        
                        {
                            name: 'off',
                            value: 'off',
                        },
                    ]
            },
        ],
        run: async (client, interaction) => {
        
        const player = interaction.client.manager.get(interaction.guild.id);

        let option = interaction.options.getString('preset')

        if (!player.queue.current) {
			let embed = new EmbedBuilder()
                .setDescription(`There is no song playing!`)
                .setColor(embedError)

		    return interaction.reply( { embeds: [embed] })
        }

        let embed = new EmbedBuilder()
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
            .setColor(embedSuccess)

        if (option == 'party') {
            var bands = [
                { band: 0, gain: -1.16 },
                { band: 1, gain: 0.28 },
                { band: 2, gain: 0.42 },
                { band: 3, gain: 0.5 },
                { band: 4, gain: 0.36 },
                { band: 5, gain: 0 },
                { band: 6, gain: -0.3 },
                { band: 7, gain: -0.21 },
                { band: 8, gain: -0.21 } 
            ];

            embed.setDescription(`Party mode is ON.`);
            player.setEQ(...bands);

        } else if (option == 'bass') {
            var bands = [
                { band: 0, gain: 0.6 },
                { band: 1, gain: 0.7 },
                { band: 2, gain: 0.8 },
                { band: 3, gain: 0.55 },
                { band: 4, gain: 0.25 },
                { band: 5, gain: 0 },
                { band: 6, gain: -0.25 },
                { band: 7, gain: -0.45 },
                { band: 8, gain: -0.55 },
                { band: 9, gain: -0.7 },    
                { band: 10, gain: -0.3 },    
                { band: 11, gain: -0.25 },
                { band: 12, gain: 0 },   
                { band: 13, gain: 0 },
                { band: 14, gain: 0 }    
            ];

            embed.setDescription(`Bass mode is ON.`);
            player.setEQ(...bands);

        } else if (option == 'radio') {
            var bands = [
                { band: 0, gain: 0.65 },
                { band: 1, gain: 0.45 },
                { band: 2, gain: -0.45 },
                { band: 3, gain: -0.65 },
                { band: 4, gain: -0.35 },
                { band: 5, gain: 0.45 },
                { band: 6, gain: 0.55 },
                { band: 7, gain: 0.6 },
                { band: 8, gain: 0.6 },
                { band: 9, gain: 0.6 },    
                { band: 10, gain: 0 },    
                { band: 11, gain: 0 },
                { band: 12, gain: 0 },   
                { band: 13, gain: 0 },
                { band: 14, gain: 0 }  
            ];

            embed.setDescription(`Radio mode is ON.`);
            player.setEQ(...bands);

        } else if (option == 'pop') {
            var bands = [
                { band: 0, gain: -0.25 },
                { band: 1, gain: 0.48 },
                { band: 2, gain: 0.59 },
                { band: 3, gain: 0.72 },
                { band: 4, gain: 0.56 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.24 },
                { band: 7, gain: -0.24 },
                { band: 8, gain: -0.16 },
                { band: 9, gain: -0.16 },    
                { band: 10, gain: 0 },    
                { band: 11, gain: 0 },
                { band: 12, gain: 0 },   
                { band: 13, gain: 0 },
                { band: 14, gain: 0 }
            ];

            embed.setDescription(`Pop mode is ON.`);
            player.setEQ(...bands);

        } else if (option == 'trablebass') {
            var bands = [
                { band: 0, gain: 0.6 },
                { band: 1, gain: 0.67 },
                { band: 2, gain: 0.67 },
                { band: 3, gain: 0 },
                { band: 4, gain: -0.5 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.45 },
                { band: 7, gain: 0.23 },
                { band: 8, gain: 0.35 },
                { band: 9, gain: 0.45 },
                { band: 10, gain: 0.55 },
                { band: 11, gain: 0.6 },
                { band: 12, gain: 0.55 },
                { band: 13, gain: 0 },
                { band: 14, gain: 0 }
            ];

            embed.setDescription(`Trablebass mode is ON.`);
            player.setEQ(...bands);

        } else if (option == 'bassboost') {
            var bands = new Array(7).fill(null).map((_, i) => (
                { band: i, gain: 0.25 }
            ));

            embed.setDescription(`Bassboost mode is ON.`);
            player.setEQ(...bands);

        } else if (option == 'soft') {
            var bands =  [
                { band: 0, gain: 0 },
                { band: 1, gain: 0 },
                { band: 2, gain: 0 },
                { band: 3, gain: 0 },
                { band: 4, gain: 0 },
                { band: 5, gain: 0 },
                { band: 6, gain: 0 },
                { band: 7, gain: 0 },
                { band: 8, gain: -0.25 },
                { band: 9, gain: -0.25 },    
                { band: 10, gain: -0.25 },    
                { band: 11, gain: -0.25 },
                { band: 12, gain: -0.25 },   
                { band: 13, gain: -0.25 },   
                { band: 14, gain: -0.25 } 
            ];

            embed.setDescription(`Soft mode is ON.`);
            player.setEQ(...bands);

        } else if (option == 'off') {
            embed.setDescription(`Equalizer mode is OFF.`);
            player.clearEQ();
        }
        
        return interaction.reply({embeds: [embed]});
    }
};