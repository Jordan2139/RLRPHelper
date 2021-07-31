const Discord = require('discord.js');
const customisation = require('../customisation.json');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  const user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!user) return message.reply('You must mention someone to kick them.').catch(console.error);
  if (user.id === message.author.id) return message.reply("I can't let you do that, self-harm is bad :facepalm:");
  if (user.id === client.user.id) return message.reply("You pleblord, how can you use a bot to kick itself? :joy:");
  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
  
  if (user.id === "353020749126041602") return message.reply("You can't kick my Developer :wink:");
  if (reason.length < 1) reason = 'No reason supplied';

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  message.guild.member(user).kick();

  const embed = new Discord.MessageEmbed()
    .setColor(0x0000FF)
    .setTimestamp()
    .setTitle("User Has Been Kicked!")
    .addField('Action:', 'Kick')
    .addField('User:', `${user.user.username}#${user.user.discriminator} (${user.user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    let logchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].kick_logs_channel);
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
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yeet"],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user.',
  usage: 'kick [mention] [reason]'
};
