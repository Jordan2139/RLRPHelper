const Discord =  require('discord.js');
const botconfig = require('../settings.json');
exports.run = (client, message, args) => {
    message.delete();
    const welbed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setTitle(`RightLife Roleplay Donation Agreement`)
    .setDescription('By replying `Yes` you agree that all donation rewards are final and that if you so happen to be removed from the community by staff or yourself, you forfeit the rights to your items. If your spawn code gets leaked and or available to other people, it is on you and spawn codes will be renewed for a small fee. ($1)')
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
  name: 'agree',
  description: 'Our Agreement',
  usage: 'agree'
};