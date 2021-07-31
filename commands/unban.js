const settings = require('../settings.json');
exports.run = (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  const Discord = require('discord.js');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  const user = args[0];
  
  let modlog = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].ban_logs_channel);
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
  if (!modlog) return message.channel.send('I cannot find a logs channel');
  if (reason.length < 1) reason = 'No reason supplied.';
  if (!user) return message.channel.send('You must supply a User Resolvable, such as a user id.').catch(console.error);
  message.guild.unban(user, {reason: reason.length < 1 ? 'No reason supplied.': reason}).then(() => {
      const embed = new Discord.MessageEmbed()
      .setTitle("Member Has Been Unbanned!")
      .setColor(0xFF0000)
      .setTimestamp()
      .addField('Action:', 'Unban')
      .addField('User:', `(${user.user.username})`)
      .addField('Reason', reason)
      .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
      if  (!modlog){
        message.channel.send({embed}).then(msg => msg.delete(30000));
        message.channel.send(embed).then(msg => msg.delete(30000));
      }else{
        message.channel.send(embed).then(msg => msg.delete(30000));
        client.channels.get(modlog.id).send({embed});
      }
    });
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unban',
  description: 'Unbans the user.',
  usage: 'unban [mention] [reason]'
};
