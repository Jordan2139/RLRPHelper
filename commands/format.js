const Discord =  require('discord.js');
const botconfig = require('../settings.json');
exports.run = (client, message, args) => {
    message.delete();
    const welbed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setTitle(`RightLife Roleplay Donation Format`)
    .setDescription(`__**Dono Format:**__

    Date of dono:
    Name on PayPal:
    Donation amount:
    Transaction ID:
    Link to item:`)
    .setTimestamp()
    .setFooter("Made By Jordan.#2139 | Customized For RLRP")
    message.channel.send(welbed);

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'format',
  description: 'Our format for donations',
  usage: 'format'
};