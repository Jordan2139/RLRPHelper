const Discord = require('discord.js');
const customisation = require('../customisation.json');
const settings = require('../settings.json');

exports.run = (client, message, args) => {
    message.delete()
    let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.first().id === message.author.id) return message.reply('I can\' let you do that, you can\'t commend yourself. That\'s bias silly :facepalm:');
  if (reason.length < 1) return message.reply("You must have a reason to commend them!");
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to commend them.').catch(console.error);
  const embed = new Discord.MessageEmbed()
    .setColor(0x00FFFF)
    .setTimestamp()
    .setTitle('Player Commened - Good Work!')
    .setDescription(`Congratulations to **<@${user.id}>**; aka **${user.username}**.
They have recived a **commendation** from **${message.author.username}** for **${reason}**`)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    const channel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].commend_channel);
channel.send(embed).then( (message) => {
message.react('739290892724207707')
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'commend',
  description: 'commends a mentioned user',
  usage: 'commend [mention] [reason]'
};
