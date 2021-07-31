exports.run = (client, message, args) => {
  message.delete();
  if (!message.mentions.users.first()) return message.reply("You need to mention someone to slap them");
  if(message.mentions.users.first().id === "353020749126041602") return message.reply('You can\'t hurt him you pleblord.:facepalm:');
  const { body } = await superagent
  .get("https://nekos.life/api/v2/img/slap");
  
  const embed = new Discord.MessageEmbed()
     .setColor("YELLOW")

  .setTitle(`OwO, ${message.mentions.users.first().username} You got slapped by ${message.author.username}`)
  .setImage(body.url) 
  .setFooter(`Made By Jordan.#2139 | Sentinel Services ©`, `${message.guild.iconURL()}`);
  message.channel.send({embed})
}
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'smack',
  description: 'Smacks a user.',
  usage: 'smack <user>'
};
