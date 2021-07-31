const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


exports.run = (client, message, args) => {
    message.delete()
    const embed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setAuthor(`${message.author.username}`,`${message.author.avatarURL()}`)
    .setTitle('**cURL Error Help**')
    .setDescription(`**Offical response from cfx.re**
    > You are having an issue with your network. Make sure you disable any web filters, anti-virus, and firewall software. If that doesn't work, use a VPN.
    
    *There is sadly nothing we can do on our end to help you out with this error.*
    `)
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
    name: 'curl',
    description: 'Helps with the cURL error commonly found in FiveM',
    usage: 'curl'
  };