const Discord =  require('discord.js');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');
const settings = require('../settings.json');


exports.run = (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry_sign: **Error:** You don't have the permission to do that!");
    message.delete();
    let time = args.slice(0).join(' ');
    const rpchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].rp_accounce_channel);
    if (time.length < 1) return message.reply('You must set a time for the RP Session!');
    rpchannel.send("|| <@&705752116118945842> ||")
    const welbed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setTitle(`__***RP SESSION***__`)
    .addField(`RP Session at \`${time}\` EST`, `\nGo check out <#724409180345204816> to join!!! or look up \"RightLife RP\" \n\nPlease React below with <:rlrp:739280972406718494> if you plan to attend so we can plan accordingly. \n\n*Hope to see you there!*`)
    .setTimestamp()
    .setAuthor(`RP hosted by: ${message.author.username}`,`${message.author.avatarURL()}`)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    rpchannel.send(welbed).then( (message) => {
    message.react('739280972406718494')
    });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['announce'],
  permLevel: 0
};

exports.help = {
  name: 'rpsession',
  description: 'Make our announcments for us',
  usage: 'rpsession'
};