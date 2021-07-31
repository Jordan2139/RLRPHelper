const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


exports.run = (client, message, args) => {
    message.delete()
    const embed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setAuthor(`${message.author.username}`,`${message.author.avatarURL()}`)
    .setTitle('**Public Cop Information**')
    .addField('[**Get The Role**]', '```Make sure to react to the message in the Public Cop channel``` \n*For more information please check <#747302388959936602>*')
    .addField('[**Get Ready For Patrol**]', '```Once in game, type in chat /pubcop. This will provide you with all the necessary equipment and vehicles for your patrol.```')
    .addField('[**Joining RTO**]', '```Join our Discord RTO and setup Push To Talk. Once complete, join the RTO and establish a callsign using the following format. Replacing the # with numbers of your choice. CO-##(#)```')
    .addField('[**Fueling Up & Making That Vehicle Right**]', '```Ensure that you\'ve got all the available extras on your vehicle, and to only use the weapons that have been provided to you.```')
    .addField('[**Radio Chatter**]', '```Now that you\'ve got everything setup, make sure your fluent with all the 10-Codes``` \n*10-Codes are located in <#705642453629403167>*')
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['pub', 'publiccop'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'pubcop',
    description: 'Become a pubcop on our FiveM server!',
    usage: 'pubcop'
  };