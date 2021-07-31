const Discord = require('discord.js');
const customisation = require('../customisation.json');
exports.run = (client, msg, args) => {
  msg.delete();
  const embed = new Discord.MessageEmbed()
  .setColor(0xFFFF00)
  .setAuthor(`${msg.author.username}`,`${msg.author.avatarURL()()}`)
  .addField('About The Bot', `I am a bot created by ${customisation.ownername}, made for any discord server that needs moderating. It is written with Discord.js. To see more info about the bot, type >info in <#699520978677530634>`)
  .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${msg.guild.iconURL()}`);
  msg.channel.send({embed});
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'about',
    description: 'About the bot.',
    usage: 'about'
  };