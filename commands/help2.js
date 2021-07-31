const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const customisation = require('../customisation.json');
const settings = require('../settings.json');
const fs = require('fs');
const paginationEmbed = require('discord.js-pagination');
exports.run = (client, message, args) => {
  message.delete();
  if(!args[0]){

      const embed1 = new Discord.MessageEmbed()
      .setTitle('__***Help Page 1 (Introduction)***__')
      .setAuthor(`${message.author.username}`)
      .setDescription('Hi There! \n I am **RightLife RP Assistant** made by Jordan.#2139 I am here to help you whilst you are in RLRP and make everyone\'s lives nice and easy. \n\n • *To cycle through the pages please react accordingly below.* \n\n __***Notes:***__\n • When executing a command do not include the `<>` they simply indicate required data. \n • If a commands usage description contains `|` this means or (in the ban command you can use <@user> | <userid>) \n • When exectuting a command do not include `[]` they simply indicate optional data. \n • Timed commands require.. well a time to be specified, acceptable times are in the format of <number><unit-of-time> \n    • Accepted units of time are H- hours, M- minutes & S- seconds. \n • Do not abuse/ spam the commands. Commands are expected to only be used in the <#751343718962954330> channel. \n    • Improper use will result in a blacklist from the bot.')
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`)
      .setColor(Math.floor(Math.random()*16777215))
      .setThumbnail(`${message.author.avatarURL()}`)

      const embed2 = new Discord.MessageEmbed()
      .setTitle('__***Help Page 2 (Moderation)***__')
      .setAuthor(`${message.author.username}`)
      .setDescription('The commands listed below are be basic moderation functions of this bot that staff members will use to ensure everyone a safe and stable community.')
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`)
      .setColor(Math.floor(Math.random()*16777215))
      .addField('`addrole`, `buff`', 'addrole <@user> | <userid> <role**NAME**> | Co-Owner+ can use this command to give someone a role. If you need to give department roles use <@700972676910678038> DO NOT MENTION THE ROLE.')
      .addField('`ban`, `bigyeet`', 'ban <@user> | <userid> [reason] | Management+ can use this command in the event that someone breaks the rules and deserves a ban.')
      .addField('`clearwarns`', 'clearwarns <@user> | <userid> | Management+ can use this command in the event that someone becomes a functioning member of society and deserves a restart.')
      .addField('`kick`, `yeet`', 'kick <@user> | <userid> [reason] | Management+ can use this command in the event that someone breaks the rules and deserves a kick.')
      .addField('`lockdown`, `ld`', 'lockdown | Staff+ can use this command to lockdown a channel in the event of a raid, argument, or utter toxicity.')
      .setThumbnail(`${message.author.avatarURL()}`)

      const embed3 = new Discord.MessageEmbed()
      .setTitle('__***Help Page 3 (Moderation)***__')
      .setAuthor(`${message.author.username}`)
      .setDescription('The commands listed below are be basic moderation functions of this bot that staff members will use to ensure everyone a safe and stable community.')
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`)
      .setColor(Math.floor(Math.random()*16777215))
      .addField('`mute`', 'mute <@user> | <userid> [reason] | Staff+ can use this command to mute a peron(s) in the event of an argument, spamming, or utter toxicity.')
      .addField('`purge`, `clear`', 'purge <all | bots | users> <amount(max 100)> | Staff+ can use this command to purge a channel in the event of an argument, spamming, or utter toxicity.')
      .addField('`removerole`, `nerf`', 'removerole <@user> | <userid> <role**NAME**> | Co-Owner+ can use this command to remove someone\'s role. If you need to give department roles use <@700972676910678038> DO NOT MENTION THE ROLE.')
      .addField('`rename`', 'rename <@user> | <userid> | Admin+ can use this to rename a member in the event of a toxic, or disallowed nickname.')
      .addField('`softban`', 'softban <@user> | <userid> [reason] | Management+ can use this command in the event that someone deserves a kick but also needs their previous messages deleted.')
      .setThumbnail(`${message.author.avatarURL()}`)

      const embed4 = new Discord.MessageEmbed()
      .setTitle('__***Help Page 4 (Moderation)***__')
      .setAuthor(`${message.author.username}`)
      .setDescription('The commands listed below are be basic moderation functions of this bot that staff members will use to ensure everyone a safe and stable community.')
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`)
      .setColor(Math.floor(Math.random()*16777215))
      .addField('`tempmute`, `softmute`, `tmute`, `tempm`', 'tempmute <@user> | <userid> <time> [reason] | Staff+ can use this command to mute a peron(s) in the event of an argument, spamming, or utter toxicity for a certain amount of time.')
      .addField('`timedlockdown`, `tld`', 'timedlockdown <time> | Staff+ can use this command to lockdown a channel for a specific amount of time in the event of a raid, argument, or utter toxicity.')
      .addField('`unban`', 'unban <userid> [reason] | Management+ can use this command in the event that someone deserves an unban.')
      .addField('`unlockdown`, `uld`', 'unlockdown | Staff+ can use this command to unlockdown a channel.')
      .addField('`unmute`', 'unmute <@user> | <userid> [reason] | Staff+ can use this command to unmute a peron(s) when the decide to become less toxic.')
      .setThumbnail(`${message.author.avatarURL()}`)

      const embed5 = new Discord.MessageEmbed()
      .setTitle('__***Help Page 5 (Moderation)***__')
      .setAuthor(`${message.author.username}`)
      .setDescription('The commands listed below are be basic moderation functions of this bot that staff members will use to ensure everyone a safe and stable community.')
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`)
      .setColor(Math.floor(Math.random()*16777215))
      .addField('`votekick`', 'votekick <@user> | <userid> | Management+ can use this command in the event that someone breaks the rules and would like a staff decision for the kick.')
      .addField('`warn`, `smolyeet`', 'warn <@user> | <userid> <reason> | Staff+ can use this command to warn members for an infraction.')
      .addField('`warnlevel`', 'warnlevel <@user> | <userid> | Staff+ can check the amount of warns that a member has and the reasoning for their warns.')
      .setThumbnail(`${message.author.avatarURL()}`)

      const embed6 = new Discord.MessageEmbed()
      .setTitle('__***Help Page 6 (User Interaction)***__')
      .setAuthor(`${message.author.username}`)
      .setDescription('The commands listed below are basic user interaction commands.')
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`)
      .setColor(Math.floor(Math.random()*16777215))
      .addField('`avatar`, `pfp`, `av`', 'av [@user] | This command will either show your avatar or the avatar of the person that you ping.')
      .addField('`commend`', 'commend <@user> <reason> | This command is used to commend someone for good RP, or just being a good person.')
      .addField('`cuddle`', 'cuddle <@user> | This command is used to cuddle with people.')
      .addField('`feed`', 'feed <@user> | Feed the pinged user. Om! Nom! Nom!')
      .addField('`fight`', 'fight <@user> | Fight the pinged user.')
      .setThumbnail(`${message.author.avatarURL()}`)

      const embed7 = new Discord.MessageEmbed()
      .setTitle('__***Help Page 7 (User Interaction)***__')
      .setAuthor(`${message.author.username}`)
      .setDescription('The commands listed below are basic user interaction commands.')
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`)
      .setColor(Math.floor(Math.random()*16777215))
      .addField('`hammer`', 'hammer <@user> | Throw a hammer at someone when their being a dick.')
      .addField('`hug`', 'hug <@user> | Give someone a hug.')
      .addField('`kiss`', 'kiss <@user> |  Give the pinged user a kiss.')
      .addField('`pat`', 'pat <@user> | Give the pinged user a pat pat.')
      .addField('`slap`', 'slap <@user> | Give someone a big ole slaparooni')
      .setThumbnail(`${message.author.avatarURL()}`)

      const embed8 = new Discord.MessageEmbed()
      .setTitle('__***Help Page 8 (User Interaction)***__')
      .setAuthor(`${message.author.username}`)
      .setDescription('The commands listed below are basic user interaction commands.')
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`)
      .setColor(Math.floor(Math.random()*16777215))
      .addField('`smack`', 'smack <@user> | Give someone a nice big smack.')
      .addField('`spank`', 'spank <@user> | Spank a bad boy.')
      .addField('`touch`', 'touch <@user> | Touch someone.')
      .addField('`userinfo`, `whois`', 'userinfo [@user] | [userid] | This command with either show your info or the info of the person you ping.')
      .addField('`woosh`', 'woosh <@user> | r/woosh')
      .setThumbnail(`${message.author.avatarURL()}`)





      pages = [
          embed1,
          embed2,
          embed3,
          embed4,
          embed5,
          embed6,
          embed7,
          embed8
      ];

      emojiList = ['⏪', '⏩'];
      timeout = ['300000'];

      paginationEmbed(message, pages, emojiList, timeout);


    }else{
      let command = args[0];
      if (client.commands.has(command)) {
        cmd = client.commands.get(command);
        return message.channel.send("```" + `\n` + "Description: " + cmd.help.description + `\n` + "Usage: " + cmd.help.usage + "```")
      } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
        return message.channel.send("```" + `\n` + "Description: " + cmd.help.description + `\n` + "Usage: " + cmd.help.usage + "```")
      } else {
        return message.reply("That command doesn't exist!")
      }
    }
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h2', 'halp2'],
  permLevel: 0
};

exports.help = {
  name: 'help2',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};