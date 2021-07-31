const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let stickies = JSON.parse(fs.readFileSync("./stickyones.json", "utf8"));

exports.run = async (bot, message, args) => {
    let stickies = JSON.parse(fs.readFileSync("./stickyones.json", "utf8"));
    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions.").then(msg => msg.delete({timeout:10000}));

    
    if(stickies[message.channel.id]) { // Already a sticky
        delete stickies[message.channel.id];
        fs.writeFile("./stickyones.json", JSON.stringify(stickies), (err) => {
            if (err) console.log(err)
        });
        return message.channel.send("Sticky message removed.").then(msg => msg.delete({timeout:10000}));
    } else { // No sticky yet
        return message.channel.send("There's no sticky set in this channel.").then(msg => msg.delete({timeout:10000}));
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['stickyremove', 'unstick', 'unsticky'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'removestick',
    description: 'Removes Sticky Messages',
    usage: 'removesticky'
  };