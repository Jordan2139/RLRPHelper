const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args, utils) => {
  let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`);
  message.channel.send(moneyEmbed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bal"],
  permLevel: 0
};

exports.help = {
  name: 'balance',
  description: 'Get your balance',
  usage: 'balance'
};
