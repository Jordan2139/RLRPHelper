const Discord = require('discord.js');

exports.run = (client, message, args) => {
    message.delete();
    if(!args[0]) return message.channel.send("Please specify a channel name. Use a \`-\` at the start to add to the existing name.");
    let channelRename = args.join('-')

    if (message.channel.name.startsWith(`ticket-`)) {
        if(channelRename.startsWith(`-`)) {
            message.channel.setName(`${message.channel.name}${channelRename}`)
            message.channel.send(`<@${message.author.id}> Renamed the channel to: *${message.channel.name}${channelRename}*`)
        } else {
            message.channel.setName(`ticket-${channelRename}`)
            message.channel.send(`<@${message.author.id}> Renamed the channel to: *ticket-${channelRename}*`)
        }
    } else {
        return message.channel.send(`Your not in a ticket channel.`).then(msg => msg.delete(5000));
    }



}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tickrename'],
  permLevel: 0
};

exports.help = {
  name: 'ticrename',
  description: 'Rename Tickets',
  usage: 'ticrename <name>'
};