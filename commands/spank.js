const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


exports.run = async (client, message, args, tools) => {
  message.delete()
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to spank them");
    if(message.mentions.users.first().id === "353020749126041602") return message.reply('You can\'t spank my Dev you pleblord.:facepalm: He will spank your ass off XDD');
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/spank");
    
    const embed = new Discord.MessageEmbed()
       .setColor(botconfig["bot_setup"].main_embed_color)

    .setTitle(`${message.author.username} Spanked ${message.mentions.users.first().username} xDD`)
    .setImage(body.neko) 
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
    name: 'spank',
    description: 'Spanks someone xD',
    usage: 'spank'
  };