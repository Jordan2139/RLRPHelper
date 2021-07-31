exports.run = (client, message, args) => {
  message.delete();
  let settings = require('../settings.json');
  if (!message.author.id === settings.ownerid) return message.channel.send(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
  if(!args[0]) return message.reply('Tell me a status boi.');
  if(args[0] === 'status') return message.reply('Come on boi. The statuses are Online, Idle, DND, and Offline.');
  args.join(" ");
  message.reply(`I am now \`${args}\`.`);
  client.user.setPresence({ status: `${args}` });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'setstatus',
  description: 'Sets the bot\'s status.',
  usage: 'setstatus <status>'
};
