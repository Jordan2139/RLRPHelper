const Discord =  require('discord.js');
const botconfig = require('../settings.json');
exports.run = (client, message, args) => {
    message.delete();
    const welbed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setTitle(`How To Fix In-Game Permission Issues`)
    .setDescription(`Having trouble with permissions in-game? Follow these steps to fix your problem,

        1) Open task manager
        2) Close FiveM
        3) Close Discord
        4) Close steam
        5) Relaunch everything up and reconnect to the server
        6) If the problem persists please open a <#731152141800046622>`)
    .setTimestamp()
    .setFooter("Made By Jordan.#2139 | Customized For RLRP")
    message.channel.send(welbed);

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'dperms',
  description: 'Fix permissions in game',
  usage: 'dperms'
};