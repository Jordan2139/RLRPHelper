const Discord  = require('discord.js');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');


const agree    = "✅";
const disagree = "❎";

exports.run = async (bot, message, args) => {

  const kickmember = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kickmember){
    message.reply(":x: " + "| That User Does Not Seem Valid!");
  }

  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
    return message.reply(":x: " + "| I need the \"KICK_MEMBERS\" permission!").catch(console.error);
  }

  let msg = await message.channel.send(`Vote to kick ${kickmember.username}${kickmember.discriminator}(5 minutes)`);
  await msg.react(agree);
  await msg.react(disagree);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 300000});
  msg.delete();

  var NO_Count = reactions.get(disagree).count;
  var YES_Count = reactions.get(agree);

  if(YES_Count == undefined){
    var YES_Count = 1;
  }else{
    var YES_Count = reactions.get(agree).count;
  }

  var sumsum = new Discord.MessageEmbed()
  
            .addField("Voting Finished:", "----------------------------------------\n" +
                                          "Total votes (Yes): " + `${YES_Count-1}\n` +
                                          "Total votes (NO): " + `${NO_Count-1}\n` +
                                          "----------------------------------------\n" +
                                          "NOTE: Votes needed to kick (3+)\n" +
                                          "----------------------------------------", true)

      .setColor(botconfig["bot_setup"].main_embed_color)
            .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
  await message.channel.send({embed: sumsum});

  if(YES_Count >= 4 && YES_Count > NO_Count){

    kickmember.kick().then(member => {
      message.reply(`${member.user.username} was succesfully kicked`)
    })
  }else{

    message.channel.send("\n" + "SAFE..... FOR NOW");
  }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'votekick',
    description: 'Vote to kick someone.',
    usage: 'votekick'
  };
  