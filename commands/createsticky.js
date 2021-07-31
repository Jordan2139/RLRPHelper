const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let stickies = JSON.parse(fs.readFileSync("./stickyones.json", "utf8"));

exports.run = async (bot, message, args) => {
    let stickies = JSON.parse(fs.readFileSync("./stickyones.json", "utf8"));
    message.delete();

    let setChannel = message.channel.id;
    let setMessage = args.join(" ");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));

    
    if(stickies[message.channel.id]) { // Already a sticky
        return message.channel.send("There's already a sticky message in this channel.").then(msg => msg.delete(10000));
    } else { // No sticky yet
        if(setMessage.length < 1) return message.channel.send("Please specify a message").then(msg => msg.delete(5000));
        let stickyMessage = setMessage.replace(/'/g, "’");
        let sentMessage = await message.channel.send(`:warning: __***Sticky Message, Read Before Typing!***__ :warning:\n${stickyMessage}`);

        stickies[message.channel.id] = {
            lastId: sentMessage.id,
            message: stickyMessage
        };
        fs.writeFile("./stickyones.json", JSON.stringify(stickies), (err) => {
            if (err) console.log(err)
        });
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['stickyadd'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'sticky',
    description: 'Creates Sticky Messages',
    usage: 'sticky'
  };