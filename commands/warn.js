const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
//const mysql = require('mysql');
//const file = require('../mysql.json');
const customisation = require('../customisation.json');
const settings = require('../settings.json');


exports.run = async (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  const user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  //let logchannel = message.guild.channels.cache.find('name', 'logs');
  if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
  if (!user) return message.reply('You must mention someone to warn them.').catch(console.error);
  if (user.id === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  if (user.id === "353020749126041602") return message.reply("You can't warn my Developer:wink:");
  //if (!logchannel) return message.channel.send('I cannot find a logs channel');
  if (reason.length < 1) reason = 'No reason supplied.';
  
  if(!warns[`${user.id}, ${message.guild.id}`]) warns[`${user.id}, ${message.guild.id}`] = {
    warns: 0
  };

  warns[`${user.id}, ${message.guild.id}`].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if(err) throw err;
  });

  const embed = new Discord.MessageEmbed()
  .setColor(0xFFFF00)
  .setTimestamp()
  .addField('Action:', 'Warning')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Number of warnings:', warns[`${user.id}, ${message.guild.id}`].warns)
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
  message.mentions.users.first().send({embed}).catch(e =>{
    if(e) return 
  });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["smolyeet"],
  permLevel: 0
};

exports.help = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user.',
  usage: 'warn [mention] [reason]'
};
