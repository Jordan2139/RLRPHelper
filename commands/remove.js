const Discord = require("discord.js");
const botconfig = require("../settings.json");

exports.run = (client, message, args) => {
    message.delete();
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Your not in a ticket channel.`).then(msg => msg.delete(5000));
    let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    if(aUser.roles.find(r => r.id === botconfig["ticket_system"].support_role)) return message.channel.send(`Invalid permissions.`).then(msg => msg.delete(5000));
    message.channel.overwritePermissions(aUser, {
        SEND_MESSAGES: false,
        READ_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
    });

    const embed = new Discord.MessageEmbed()
      .setColor(botconfig["bot_setup"].main_embed_color)
    .setDescription(`Removed **${aUser} (${aUser.user.tag})** to the ticket.`)

    message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['removeuser'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'remove',
    description: 'Removes Users From Tickets',
    usage: 'Remove'
  };