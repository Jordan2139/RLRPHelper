const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
  message.delete();
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    const user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!user) return message.reply('You must mention someone to check their warns.').catch(console.error);
    if(!user) return message.reply("Couldn't find that user...");
    if(!warns[user.id]) warns[user.id] = {
      warns: 0
    };

    const embed = new Discord.MessageEmbed()
    .setColor(0xFFFF01)
    .setTimestamp()
    .addField('Action:', 'Warn Check')
    .addField('User:', `${user.username}#${user.discriminator}`)
    .addField('Number of warnings:', warns[`${user.id}, ${message.guild.id}`].warns)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
  }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'warnlevel',
    description: 'Show how many warnings a user have',
    usage: 'warnlevel [mention]'
  };
  //message.guild.member() || message.guild.members.cache.get(args[0])