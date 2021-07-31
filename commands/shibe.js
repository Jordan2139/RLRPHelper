const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


exports.run = async (client, message, args) => {
  message.delete();
   const { body } = await superagent
  .get(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`)

  const embed = new Discord.MessageEmbed()
       .setColor(botconfig["bot_setup"].main_embed_color)

    .setTitle("Here's Your Shibe")
    .setImage(body[0]) 
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
    name: 'shibe',
    description: 'Sends a random shibe',
    usage: 'shibe'
  };