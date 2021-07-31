const Discord = require('discord.js')
const fs = require("fs");
const customisation = require('../customisation.json');

exports.run = (client, message) => {
  message.delete();
  let info = JSON.parse(fs.readFileSync("./halloffame.json", "utf8"));
  const embed = new Discord.MessageEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setTitle("Bot Contributers:", '')
  .addField('ULTIMATE FAM (Owner)', customisation.ownername)
  .addField('Big Fam:', info.bigfam)
  .addField('Smol Fam:', info.smolfam + `\n\n Do >suggest <suggestion> or >bug <bug> and if you got approved you will be listed on this list!`)
  .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);

  message.channel.send({embed});
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hof', 'credit'],
  permLevel: 0
};

exports.help = {
  name: 'credits',
  description: 'Bot contributors!',
  usage: 'credits'
};
