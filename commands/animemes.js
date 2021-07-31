const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
  message.delete();
    randomPuppy('animemes')
    .then(url => {
        const embed = new Discord.MessageEmbed()
        .setImage(url)
        .setColor('#ff9900')
        .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);
     return message.channel.send({ embed });
})
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['amemes'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'animemes',
    description: 'Sends a random post from r/animemes',
    usage: 'animemes'
  };