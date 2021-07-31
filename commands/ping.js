exports.run = (client, message) => {
  message.delete();
  message.channel.send('Ping?').then(m => m.edit(`Roundtrip took: ${message.createdTimestamp - m.createdTimestamp}ms. Heartbeat: ${client.ws.ping}ms.`))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};
