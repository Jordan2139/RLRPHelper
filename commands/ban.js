const Discord = require('discord.js');
const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  const user = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]));
  let logchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].ban_logs_channel);
  if (!logchannel) return message.channel.send('I cannot find a logs channel');
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
  if (!user) return message.channel.send('You must mention someone to ban them.').catch(console.error);
  if (user.id === message.author.id) return message.channel.send('I can\' let you do that, self-harm is bad:facepalm:');
  if (user.id === client.user.id) return message.channel.send("You pleblord, how can you use a bot to ban itself?:joy:");
  if (user.id === "353020749126041602") return message.channel.send("You can't ban my Developer:wink:");
  if (reason.length < 1) reason = 'No reason supplied.';
  if (!message.guild.member(user).bannable) {
    message.channel.send(`:redTick: I cannot ban that member. My role might not be high enough or it's an internal error.`);
    return
  }else{
    const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setTitle("User Has Been Banned!")
    .addField('Action:', 'Ban')
    .addField('User:', `${user.user.username}#${user.user.discriminator} (${user.user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    let logchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].ban_logs_channel);
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
  }).then(user.ban({days: 7, reason: `${reason}`}))
}
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bigyeet"],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban [mention] [reason]'
};
