const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');



exports.run = async (client, message, args, tools) => {
  message.delete();
  const noembed = new Discord.MessageEmbed()
  .setTitle("Ping Me?!?")
  .setImage("https://media.giphy.com/media/XcR5GMGR0eq25DR0Ix/giphy.gif")
  .setColor(0xFF6BDF)
  .setFooter(`Made By Jordan.#2139 | Customized For RLRP`);
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to pat them");
    if (message.mentions.users.first().id === "696276363065163807") return message.channel.send(noembed);
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/poke");
    
    const embed = new Discord.MessageEmbed()
       .setColor(botconfig["bot_setup"].main_embed_color)

    .setTitle(`OwO, ${message.author.username} poked ${message.mentions.users.first().username}`)
    .setImage(body.url) 
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'poke',
    description: 'Pokes someone OwO',
    usage: 'poke'
  };
