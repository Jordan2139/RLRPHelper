const Discord = require('discord.js');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


exports.run = async (client, message, args) => {
  message.delete()
    if (!args[0]) return message.reply('Provide a truth!')
    const embed = new Discord.MessageEmbed()
       .setColor(botconfig["bot_setup"].main_embed_color)

    .setImage(`https://api.alexflipnote.dev/scroll?text=` + args.join('%20')) 
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
    name: 'truth',
    description: 'Sends a scroll truth',
    usage: 'truth (truth)'
  };
   