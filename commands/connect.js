const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


exports.run = (client, message, args) => {
    message.delete()
    const embed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setAuthor(`${message.author.username}`,`${message.author.avatarURL()}`)
    .setTitle('**FiveM Server Connection**')
    .setDescription("To **connect** to our **FiveM server** press **F8** and type \n```connect 51.81.77.166:30120```")
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'connect',
    description: 'Connect to our FiveM server!',
    usage: 'connect'
  };