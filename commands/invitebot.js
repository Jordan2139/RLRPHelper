const Discord = require('discord.js')
const info = require('../data/infoMsgs.json');
const customisation = require('../customisation.json');

exports.run = (client, message) => {
  message.delete();
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":no_entry_sign: **Error:** This command is currently private!");
  const embed = new Discord.MessageEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setTitle("TJH Essential Bot Info:", '')
  .addField('Important Information',info.infoMsg1)
  .addField('Inviting the Bot',info.infoMsg2)
  .addField('Neat Links',info.infoMsg3)
  .setFooter(`Made By Jordan.#2139 | Customized For RLRP`);

  message.author.send({embed}).catch(e =>{
    if (e) {
    message.channel.send(`Error. You seem to be locking your DMs so I'll send it here instead.`);
    message.channel.send({embed});
    }
  });
  message.reply("Check your DMs!");  
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['info'],
  permLevel: 0
};

exports.help = {
  name: 'invitebot',
  description: 'DMs you the bot\'s invite link.',
  usage: 'invitebot'
};
