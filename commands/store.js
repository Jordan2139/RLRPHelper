const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {


    let embed = new Discord.MessageEmbed()
    .setDescription("**VIP Ranks**\n\nBronze: 3500 Coins [m!buy bronze]\n\n**Lifestyle Items**\n\nFresh Nikes: 600 [m!buy nikes]\nCar: 800 [m!buy car]\nMansion: 1200 [m!buy mansion]")
    .setColor("#FFFFFF")
    message.channel.send(embed)




}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["st"],
  permLevel: 0
};

exports.help = {
  name: 'store',
  description: 'Access the store',
  usage: 'store'
};
