const Discord = require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');
const db = require('quick.db');

exports.run = async (bot, message, args, prefix) => {
  message.delete();

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`:facepalm: You can't do that BOIII! :facepalm:`);
  if(!args[0] || args[0 == "help"]) return message.reply(`Usage: [p]prefix <desired prefix here> ([p] is the bot original prefix or the prefix previously set)\n [p]prefix clear (to clear the customised prefix and reset it to /)`);

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  //prefixes[message.guild.id] = {
  //  prefixes: args[0]
  //};
  //fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) =>{
  //  if (err) console.log(err)
  //});
  if(args[0] === 'clear'){
    db.set(`prefix_${message.guild.id}`, '?')
        message.channel.send("Success, Cleared customised prefix. Reset to /")
        return
    }else{
    db.set(`prefix_${message.guild.id}`, args[0])
  

    let embed = new Discord.MessageEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setTitle("Prefix Changed")
    .setDescription(`Set to ${args[0]}`)
    .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`);

    message.channel.send({embed});
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'prefix',
    description: 'Changes the prefix for the server.',
    usage: 'prefix <prefix>'
  };