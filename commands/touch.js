const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');
const botconfig = require('../settings.json');

exports.run = async (client, message, args) => {
    message.delete();
    let replies = [
        'penis',
        'left arm',
        'right arm',
        'hair',
        'left nostril',
        'right nostril',
        'left ear',
        'right ear',
        'uvula',
        'forearm',
        'gooch',
        'scrotum',
        'ballsack',
        'vageen',
        'cerebelum',
        'spinal cord',
        'anal exterior',
        'big toe',
        'finger crack',
        'toe cheese',
        'eyeball',
        'crainial cavity',
        'weenis',
        'tonsils',
        'armpit',
        'colon',
        'temples',
        'lips',
        'AID\s',
        'clamydia',
        'stink hole',
        'clap',
        'tail',
        'the thing that dangles in the back of their throat',
        'paw',
        'leg hair',
        'cooch',
        'tounge',
        'teeth',
        'nipple',
        'nipple hair',
        'areola',
        'foreskin',
        'double chin',
        'double stuff ass',
        'arse',
        'sphincter',
        'achelie\'s heel',
        'dingle berries',
        
        
    ];

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/poke");

    let result = Math.floor((Math.random() * replies.length));
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to touch them");
    if(message.mentions.users.first().id === "353020749126041602") return message.reply('You can\'t touch my Dev you pleblord.:facepalm: *can\'t touch this starts playing*');
    let embed = new Discord.MessageEmbed()
    .setTitle(`OwO, ${message.author.username} touched ${message.mentions.users.first().username}'s ${replies[result]}`)
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setImage(body.url) 
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);

    message.channel.send({embed});
}



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'touch',
    description: 'Touch a random body part',
    usage: 'touch'
  };