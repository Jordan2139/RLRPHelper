const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


exports.run = async (client, message, args, tools) => {
  message.delete();
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to slap them");
    if(message.mentions.users.first().id === "353020749126041602") return message.reply('You can\'t hurt him you pleblord.:facepalm:');
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/slap");
    
    const embed = new Discord.MessageEmbed()
       .setColor(botconfig["bot_setup"].main_embed_color)

    .setTitle(`OwO, ${message.mentions.users.first().username} You got slapped by ${message.author.username}`)
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
    name: 'slap',
    description: 'Slaps someone OwO',
    usage: 'slap'
  };