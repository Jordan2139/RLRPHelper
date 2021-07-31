const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

exports.run = (client, message, args) => {
  message.delete()
  let newname = args.slice(1).join(' ');
  const user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("❌**Error:** You don't have the **Manage Nicknames** permission!");
  if (!user) return message.reply('You must Tag someone for me to rename them.').catch(console.error);
  if (user.id === "353020749126041602") return message.reply("You can't rename my Developer:wink:");
  if (user === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  message.guild.member(user).setNickname(newname).catch(console.error);
  message.channel.send("Done.");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'rename',
  description: 'Rename the mentioned user.',
  usage: 'rename @user newname'
};
