const Discord = require('discord.js');
const superagent = require('superagent');
const sf = require("snekfetch");
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


exports.run = async (client, message, args) => {
  message.delete();
    if(!args[0] || args[0] === 'help') return message.reply("Please provide a valid hex code without the #")
    var isOk = /^[0-9A-F]{6}$/i.test(args[0])
    if (isOk === false) return message.reply("Please provide a valid hex code without the #")
    
    const { body } = await superagent
    .get(`https://api.alexflipnote.dev/color/` + args[0]);

    const embed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setTitle(body.name)
    .setDescription("Hex: " + body.hex + '\n' + "RGB: " + body.rgb)
    .setImage(body.image) 
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hex'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'colorsearch',
    description: 'Search a color',
    usage: 'colorsearch (hexcode)'
  };