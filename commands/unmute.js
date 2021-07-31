const Discord = require('discord.js');
const customisation = require('../customisation.json');
const settings = require('../settings.json');

exports.run = async (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  const user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  let muteRole = message.guild.roles.cache.find(r => r.name == "Muted");
  let regRole = message.guild.roles.cache.find(r => r.name == "RLRP Member");
  if(user.id === "353020749126041602") return message.reply('You can\'t mute him you pleblord.:facepalm:')
  if(message.author.id === message.mentions.users.first()) return message.reply("You can't mute yourself:facepalm:");
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("❌**Error:** You don't have the **Manage Roles** permission!");
  if (reason.length < 1) reason = 'No reason Supplied';
  if (!user) return message.channel.send('You must mention someone to ban them.').catch(console.error);
  const embed = new Discord.MessageEmbed()
    .setColor(0x00FFFF)
    .setTimestamp()
    .addField('Action:', 'Unmute')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply(':x: I do not have the correct permissions.').catch(console.error);
  let logchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].mute_logs_channel);
  if  (!logchannel){
      message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
    }else{
      message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
      client.channels.cache.get(logchannel.id).send({embed});
    };
      message.guild.member(user).roles.add(regRole)
      message.guild.member(user).roles.remove(muteRole)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unmute',
  description: 'unmutes a mentioned user',
  usage: 'unmute [mention] [reason]'
};
