const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');



exports.run = async(client, message, args, tools) => {
    message.delete();
    const { body } = await superagent
        .get("https://random-d.uk/api/v2/quack");

    const embed = new Discord.MessageEmbed()
        .setColor(botconfig["bot_setup"].main_embed_color)

    .setTitle(`Quack Quack Crack`)
        .setAuthor(`Here ya go ${message.author.username}`, `${message.author.avatarURL()}`)
        .setImage(body.url)
        .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["duck"],
    permLevel: 0
};

exports.help = {
    name: 'quack',
    description: 'Quack',
    usage: 'quack'
};