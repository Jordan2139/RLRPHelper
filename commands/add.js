const Discord = require("discord.js");
const botconfig = require("../settings.json");
const settings = require('../settings.json');


exports.run = (client, message, args) => {
    message.delete();
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Your not in a ticket channel.`).then(msg => msg.delete({timeout:5000}));
    let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    message.channel.overwritePermissions(aUser, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true,
        READ_MESSAGE_HISTORY: true
    });

    const embed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setDescription(`Added **${aUser} (${aUser.user.tag})** to the ticket.`)

    message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['adduser'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'add',
    description: 'Adds Users From Tickets',
    usage: 'add'
  };