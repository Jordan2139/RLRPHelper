const Discord = require("discord.js")
const botconfig = require('../settings.json');



exports.run = async (bot, message, args) => {
    message.delete();
    let question = args.slice(0).join(" ");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
    if (args.length === 0)
    return message.reply('**Invalid Format:** `>Poll <Question>`')

    const embed = new Discord.MessageEmbed()
    .setTitle("A Poll Has Been Started!")
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setDescription(`${question}`)
    .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL()}`)
  
    message.channel.send({embed}).then( (message) => {
        message.react('👍')
        .then(() => message.react('👎'))
    });

}

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: 0
      };
      
      exports.help = {
        name: 'poll',
        description: 'poll for the message above.',
        usage: 'poll <poll>'
      };