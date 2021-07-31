const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


exports.run = async (client, message, args, tools) => {
  message.delete();
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to cuddle them");
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/cuddle");
    
    const embed = new Discord.MessageEmbed()
       .setColor(botconfig["bot_setup"].main_embed_color)

    .setTitle(`OwO, ${message.author.username} cuddled ${message.mentions.users.first().username}`)
    .setImage(body.url) 
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'cuddle',
    description: 'Cuddles someone OwO',
    usage: 'cuddle'
  };