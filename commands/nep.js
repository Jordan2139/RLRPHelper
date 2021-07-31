const nep = require('../data/nep.json');
const Discord = require('discord.js');
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
  message.delete();
    args = args.join(" ");
    const embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setTitle("NEP NEP TOP NEP")
    .setImage(`${nep[Math.floor(Math.random() * nep.length)]}`)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send({embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'nep',
  description: 'Sends a random nep gif or image.',
  usage: 'nep'
};
