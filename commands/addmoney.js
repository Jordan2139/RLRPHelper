const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {

    let ownerID = '353020749126041602'
    if(message.author.id !== ownerID) return;
  
    let user = message.mentions.members.first() || message.author;
    let amount = args[1]
  
      if (isNaN(args[1])) return;
      db.add(`money_${message.guild.id}_${user.id}`, amount)
      let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
  
      let moneyEmbed = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<:Check:618736570337591296> Added ${amount} coins\n\nNew Balance: ${bal}`);
      message.channel.send(moneyEmbed)
  

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'addmoney',
    description: 'Pay people',
    usage: 'addmoney'
  };
  
