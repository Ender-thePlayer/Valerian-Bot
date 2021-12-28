// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const pre = require("../../schema/prefix.js");
const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");

// command \\

module.exports = {
    name: "help",
    category: "Utility",
    aliases: ['h'],
    description: "Help Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message , args, client) => {

        const res = await pre.findOne({ guildid: message.guild.id })
        let p;
        if (!res) p = prefix
        else p = res.prefix;

        let introduction = new MessageEmbed()
            .setColor(embedNeutral)
            .setTitle('**Help Command**')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`**Valerian Bot** is a multipurpose discord bot made for you!\nMy prefix on \`\`${message.guild.name}\`\` is \`\`${p}\`\`\n\nType \`\`${p}help <command>\`\` for more details about a specific command or type \`\`${p}aliases\`\` to see the list of valid commands shortcuts.\n\n**Please Choose a category using the buttons below**\n*You use them to navigate*`)
            .setTimestamp()

        let embedone = new MessageEmbed()
            .setColor(embedNeutral)
            .setTitle('**Help Command**')
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Utility Commands [7]', value: '``about`` ``changelogs`` ``ping`` ``help`` ``aliases`` ``info`` ``ping``', inline: true },
                { name: 'Fun Commands [5]', value: '``howgay`` ``meme`` ``8ball`` ``f`` ``rickroll``', inline: true },
                { name: 'Admin Commands [4]', value: '``clear`` ``slowmode`` ``kick`` ``ban``', inline: true },
                { name: 'Music Commands [3]', value: '``247`` ``clearqueue`` ``play``', inline: true },
                { name: 'Guild Commands [4]', value: '``serverinfo`` ``userinfo`` ``ticket`` ``avatar``', inline: true },
                { name: 'Config Commands [1]', value: '``setprefix``', inline: true },
            )

        const button1 = new MessageButton()
            .setCustomId("previousbtn")
            .setLabel("Home")
            .setStyle("SUCCESS");
      
        const button2 = new MessageButton()
            .setCustomId("nextbtn")
            .setLabel("Next")
            .setStyle("PRIMARY");
      
        const pages = [
            introduction,
            embedone,
            ];

        const buttonList = [button1, button2];

        const timeout = 120000

        let page = 0;

        const row = new MessageActionRow().addComponents(buttonList);
        const curPage = await message.reply({
          embeds: [pages[page].setFooter(`@${message.author.tag} - Page ${page + 1} / ${pages.length}`, message.author.displayAvatarURL({dynamic : true}))],
          components: [row],
        })

        const collector = curPage.createMessageComponentCollector({
            filter: (b) => {
                if(b.user.id === message.author.id) {
                    b.customId === buttonList[0].customId ||
                    b.customId === buttonList[1].customId;
                    return true;
                }
                    else {
                b.reply({ ephemeral: true, content: `Only **${message.author.tag}** can use this button, if you want then you have to run the command yourself.`}); return false;
                    }

                },

            time: timeout,
        });

        collector.on("collect", async (i) => {
            switch (i.customId) {
            case buttonList[0].customId:
                page = page > 0 ? --page : pages.length - 1;
                break;
            case buttonList[1].customId:
                page = page + 1 < pages.length ? ++page : 0;
                break;
            default:
                break;
            }
            await i.deferUpdate();
            await i.editReply({
            embeds: [pages[page].setFooter(`@${message.author.tag} - Page ${page + 1} / ${pages.length}`, message.author.displayAvatarURL({dynamic : true}))],
            components: [row],
            });
            collector.resetTimer();
        });
        
        collector.on("end", () => {
            if (!curPage.deleted) {
            const disabledRow = new MessageActionRow().addComponents(
                buttonList[0].setDisabled(true),
                buttonList[1].setDisabled(true)
            );
            
            curPage.edit({
                embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
                components: [disabledRow],
            }).then(setTimeout(() => message.delete())).then(msg =>{
                setTimeout(() => msg.delete())});
            }
        });
         
        return curPage;
}};