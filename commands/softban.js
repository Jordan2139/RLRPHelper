const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  const user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  let logchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].ban_logs_channel);
  if (!logchannel) return message.reply('I cannot find a logs channel');
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
  if (!user) return message.reply('You must mention someone to soft ban them.').catch(console.error);
  if (user.id === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  if (user.id === "353020749126041602") return message.reply("You can't ban my Developer:wink:");
  if (reason.length < 1) reason = 'No reason supplied.';

  if (!message.guild.member(user).bannable) return message.reply(`:redTick: I cannot ban that member`);
  message.guild.member(user).ban({reason});
  message.guild.members.unban(user, {reason: reason.length < 1 ? 'No reason supplied.': reason});

  const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action:', ' Soft Ban')
    .addField('User:',  `${user.user.username}#${user.user.discriminator} (${user.user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    if  (!logchannel){
    message.channel.send({embed})
    message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
  }else{
    message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
    client.channels.cache.get(logchannel.id).send({embed});
  }
  if(user.bot) return;
  return user.send({embed}).catch(e =>{
    if(e) return
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'softban',
  description: 'Soft Bans the mentioned user.',
  usage: 'softban [mention] [reason]'
};
