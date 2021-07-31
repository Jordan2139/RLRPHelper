const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  message.delete();
  const Discord = require('discord.js');
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("❌**Error:** I don't have the **Manage Roles** permission!");
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("❌**Error:** You don't have the **Manage Roles** permission!");
    const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.reply("❌Please mention a user to give the role to.\nExample: `addrole @user Members`");
    if (!member) return message.reply("❌**Error:** That user does not seem valid.");
    let name = message.content.split(" ").splice(2).join(" ");
    const role = message.guild.roles.cache.find(r => r.name === name) || message.guild.roles.cache.get('id');
    if (!role) return message.reply(`❌**Error:** ${name} isn't a role on this server!`);
    let botRolePosition = message.guild.member(client.user).roles.highest.position;
    let rolePosition = role.position;
    let userRolePossition = message.member.roles.highest.position;
    if (userRolePossition <= rolePosition) return message.channel.send("❌**Error:** Failed to add the role to the user because your role is lower than the specified role.")
    if (botRolePosition <= rolePosition) return message.channel.send("❌**Error:** Failed to add the role to the user because my highest role is lower than the specified role.");
    member.roles.add(role).catch(e => {
        return message.channel.send(`❌**Error:**\n${e}`);
    });
    const user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    const embed = new Discord.MessageEmbed()
    .setColor(0x0000FF)
    .setTimestamp()
    .setTitle("New Role Assigned!")
    .addField('Action:', 'Role Added')
    .addField('User:', `${user.user.username}#${user.user.discriminator} (${user.user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Role Added:', role)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
    let logchannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].general_logs_channel);
    if (!logchannel){
    message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
  }else{
    message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
    client.channels.cache.get(logchannel.id).send({embed});
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["buff"],
  permLevel: 0
};

exports.help = {
  name: 'addrole',
  description: 'Adds a role. It\'s that simple.',
  usage: 'addrole [mention] [role name (don\'t mention the role)]'
};
