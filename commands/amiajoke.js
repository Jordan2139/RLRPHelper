const Discord = require('discord.js');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');

exports.run = async (client, message, args) => {
  message.delete();
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL()() : message.author.avatarURL()();
    
    const embed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setImage(`https://api.alexflipnote.dev/amiajoke?image=` + avatar) 
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'amiajoke',
    description: 'Am I A Joke to You?',
    usage: 'amiajoke (w or w/o @mention)'
  };
   