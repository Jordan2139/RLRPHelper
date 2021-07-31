const Discord =  require('discord.js');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');
const settings = require('../settings.json');


exports.run = (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry_sign: **Error:** You don't have the permission to do that!");
    message.delete();
    const welbed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setTitle(`RightLife Roleplay Auto Roles`)
    .setTimestamp()
    .setDescription('__***Simply React Below To Gain The Respected Role***__\n\n')
    .addField('📢', '```Notified Of Announcements```')
    .addField('🥳', '```Giveaway Notified```')
    .addField('🕐', '```Restart Notified (Lots Of Pings)```')
    .addField('🔴', '```Media Notified```')
    .addField('🛠️', '```Change Log Notified```')
    .addField('🗳️', '```Vote Notified```')
    .addField('🐛', '```Bug Tester```')
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send(welbed).then( (message) => {
    message.react('📢')
    message.react('🥳')
    message.react('🕐')
    message.react('🔴')
    message.react('🛠️')
    message.react('🗳️')
    message.react('🐛')
    });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['announce'],
  permLevel: 0
};

exports.help = {
  name: 'send',
  description: 'Make our announcments for us',
  usage: 'send'
};