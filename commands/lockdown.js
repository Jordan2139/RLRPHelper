exports.run = (client, message, args) => {
  message.delete();
  if (!client.lockit) client.lockit = [];
  if (!message.member.hasPermission("MUTE_MEMBERS")) return msg.reply("❌**Error:** You don't have the permission to do that!");

  message.channel.overwritePermissions([
    {
    id: message.guild.roles.cache.get('705706822492749865'),
    deny: ['SEND_MESSAGES']
    }
  ])
      message.channel.send(`Damnn, **${message.author.username}** just locked the channel down. Don't worry, Admins will soon open the chat again so be patient.`);
  };
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ld'],
  permLevel: 0
};

exports.help = {
  name: 'lockdown',
  description: 'This will lock a channel down.',
  usage: 'lockdown'
};
