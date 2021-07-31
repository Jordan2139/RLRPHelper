const settings = require('../settings.json');
exports.run = (client, message, args) => {
  message.delete();
  const Discord = require('discord.js');
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply(":no_entry_sign: **Error:** I don't have the **Manage Roles** permission!");
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(":no_entry_sign: **Error:** You don't have the **Manage Roles** permission!");
    const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.reply(":no_entry_sign: Please mention a user to remove the role from.");
    if (!member) return message.reply(":no_entry_sign: **Error:** That user does not seem valid.");
    let name = message.content.split(" ").splice(2).join(" ");
    let role = message.guild.roles.cache.find(r => r.name == name);
    member.roles.remove(role).catch(e => {
        message.channel.send(":no_entry_sign: There was an error! It most likely is that the role you are trying to add is higher than the the role I have!");
    });
    const user = message.mentions.users.first();
    const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setTitle("Role Removed!")
    .addField('Action:', 'Role Removed')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Role Removed:', role)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    let logchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].general_logs_channel);
      if  (!logchannel){
    message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
  }else{
    message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
    client.channels.cache.get(logchannel.id).send({embed});
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nerf"],
  permLevel: 0
};

exports.help = {
  name: 'removerole',
  description: 'Removes a role. It\'s as simple as adding a role.',
  usage: 'removerole'
};
