const Discord = require("discord.js");
const ms = require("ms");
const customisation = require('../customisation.json');
const settings = require('../settings.json');


exports.run = async (client, message, args) => {
    message.delete();

    const tomute = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if(!tomute) return message.reply("Couldn't find dat boi.");
    if(message.author.id === tomute) return message.reply("You can't mute yourself:facepalm:");
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You don't have the permission to do that:facepalm:");
    let muteRole = message.guild.roles.cache.find(r => r.name == "Muted");
    let regRole = message.guild.roles.cache.find(r => r.name == "RLRP Member");
      if (!muteRole) {
        try {
            muteRole = await message.guild.createRole({
                name:"Muted",
                color: "#000000",
                permissions:[]
            });
    
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                    READ_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didnt specify a time for temporary mute.");
    
    const embed = new Discord.MessageEmbed()
    .setColor(0x00FFFF)
    .setTimestamp()
    .addField('Action:', 'Temp Mute')
    .addField('User:', `${tomute.username}#${tomute.discriminator} (${tomute.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Length', ms(ms(mutetime)))
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    let logchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].mute_logs_channel);
    if  (!logchannel){
        message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
      }else{
        message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
        client.channels.cache.get(logchannel.id).send({embed});
      };

      message.guild.member(tomute).roles.remove(regRole)
      message.guild.member(tomute).roles.add(muteRole)
    setTimeout(function(){
        message.guild.member(tomute).roles.remove(muteRole)
        message.guild.member(tomute).roles.add(regRole)
        message.channel.send(`<@${tomute.id}> has been unmuted`).then(msg => msg.delete({timeout:30000}));
    }, ms(mutetime));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['softmute','tempm', 'tmute'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'tempmute',
    description: 'Temporary mute the mentioned user',
    usage: 'tempmute @user (time)'
  };