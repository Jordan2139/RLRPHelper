exports.run = function(client, message, args) {
  message.delete();
  const Discord = require('discord.js');
  const botconfig = require('../settings.json');
  const settings = require('../settings.json');

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌**Error:** You don't have the **Manage Messages** permission!");
  if(!args[0]) return message.reply('Usage: purge all|bots|user|images <amount>')
  if(!args[1]) return message.channel.send("You need to specify an amount");
  if(parseInt(args[1]) == NaN) return message.channel.send("You need to specify a valid amount");
  if(args[0] === 'all') {
    let messagecount = parseInt(args[1]);
    message.channel.messages.fetch({
      limit: 100
    }).then(messages => message.channel.bulkDelete(messagecount))
    .catch(e => {
      if(e) return message.channel.send("Error: ", e)
    })
  }
  else if(args[0] === 'bots') {
    message.channel.messages.fetch({
      limit: args[1]
    }).then(messages => {
      const userMessages = messages.filter(message => message.author.bot) 
      message.channel.bulkDelete(userMessages)
    }).catch(e => {
      if(e) return message.channel.send("Error: ", e)
    })
  }
  else if(args[0] === 'user') {
    message.channel.messages.fetch({
      limit: args[1]
    }).then(messages => {
      const userMessages = messages.filter(message => !message.author.bot) 
      message.channel.bulkDelete(userMessages)
    }).catch(e => {
      if(e) return message.channel.send("Error: ", e)
    })
  }
  else if(args[0] === 'image') {
    message.reply("Upcoming feature :wink:")
  }
  else {
    message.reply('Usage: purge all|bots|user|images <amount>')
  }
  let messagecount = parseInt(args[1]);
  const wait = require('util').promisify(setTimeout);
  const wembed = new Discord.MessageEmbed()
  .setColor(botconfig["bot_setup"].main_embed_color)
  .setTitle("Chat Has Been Purged!")
  .setDescription(`Whoa there! ${message.author} just purged ${messagecount} messages in ${message.channel}!`)
  .setFooter(`Made By Jordan.#2139 | Customized For RLRP`);
  const lembed = new Discord.MessageEmbed()
  .setColor(botconfig["bot_setup"].main_embed_color)
  .setTitle("Chat Has Been Purged!")
  .setDescription(`Whoa there! ${message.author} just purged ${messagecount} messages!`)
  .setFooter(`Made By Jordan.#2139 | Customized For RLRP`);
  wait(4000).then(() => {
    let logchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].general_logs_channel);
      if  (!logchannel){
    message.channel.send(lembed).then(msg => msg.delete({timeout:30000}));
  }else{
    message.channel.send(lembed).then(msg => msg.delete({timeout:30000}));
        client.channels.cache.get(logchannel.id).send(wembed);
  }
})
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['clear'],
  permLevel: 0
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge all|bots|user|images <amount>'
};
