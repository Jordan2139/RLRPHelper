const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const botconfig = require('./settings.json');
const db = require("quick.db");
const ytdl = require('ytdl-core');
const prefix = '?';
const escapeRegex = str => str.replace(/[.*+?^>${}()|[\]\\]/g, '\\$&');
require('./util/eventLoader')(client);

//loading messages
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Command Loaded! ${props.help.name} ;)`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.on('guildMemberAdd', member => {                                                                                         
  const channel = member.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].welcome_channel);
  let user = member.user;
  const welbed = new Discord.MessageEmbed()
  .setColor(botconfig["bot_setup"].main_embed_color)
  .setAuthor(`${user.username}#${user.discriminator}`, `${user.avatarURL()}`)
  .setDescription(`${user.username}... Are you lost? Oh? You're not? Well then welcome to RightLife RP, home of the best roleplay! \n\nThere's a few thing we need from you before you can fully join us. \n\n**1. Please change your nickname to match your name on your Application**\n**2. Please send a link to your forum profile**\n**3. Along with your profile please link us ypir application**\n**4. Last Thing! What department are you joining? If you change during your interview this will be your last chance to state the correct one!**\n\nGot all this done? Perfect! Sit tight and staff will be with you soon! :stuck_out_tongue_winking_eye:`)
  .setTimestamp()
  .setFooter(`ID: ${user.id} | #${user.discriminator}`)
  channel.send(`<@${user.id}>`)
  channel.send(welbed);
  member.roles.add('787899829937635359');
});


const activities_list = [
  "with the ?help command.", 
  "with the developers console",
  "with ?info", 
  "with JavaScript",
  "with ?about",
  "Monitoring RightLife Roleplay",
  "with ?botstats",
  "with ?info",
  ]; 

client.on('ready', () => {
  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
      client.user.setActivity(activities_list[index]); 
  }, 10000); 
});


if(botconfig["module_toggles"].filter_lang_links) {
  client.on("message", message => {
      if(message.channel.type === 'dm') return;
      if (message.author.bot) return;
      if (!message.guild) return;
      if(message.member.hasPermission("ADMINISTRATOR")) return; // This may crash or give errors. Not 100% sure why...
      let allowedRole = message.guild.roles.cache.find(role => role.name === botconfig["filter_module"].language_bypass_role);
      switch (true) {
          case message.member.roles.cache.has(allowedRole):
              return;
          case new RegExp(botconfig["filter_module"].filter_words.join("|")).test(message.content.toLowerCase()):
              message.delete();
              return message.channel.send(`You are not authorized to use that language here!`).then(msg => msg.delete({ timeout: 10000 }));
      };
  });

  client.on("message", message => {
      if(message.channel.type === 'dm') return;
      if (message.author.bot) return;
      if (!message.guild) return;
      if(message.member.hasPermission("ADMINISTRATOR")) return; // This may crash or give errors. Not 100% sure why...
      let allowedRole = message.guild.roles.cache.find(role => role.name === botconfig["filter_module"].link_bypass_role);
      switch (true) {
          case message.member.roles.cache.has(allowedRole): // Debug Error Code: ERRID08
              return;
          case new RegExp(botconfig["filter_module"].filter_links.join("|")).test(message.content.toLowerCase()):
              message.delete();
              return message.channel.send(`You are not authorized to use post that language here!`).then(msg => msg.delete({ timeout: 10000 })); 

      };
  });
}

//command reload
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig["bot_setup"].prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if (!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);

  // Bot Command Logs
  if(botconfig["module_toggles"].mod_logs) {
      const cmdChannel = message.guild.channels.cache.find(channel => channel.id === botconfig["channel_setup"].command_logs_channel);
      if(!cmdChannel) return console.log("Channel not found (Config: 'commands_logs_channel')");
      const logEmbed = new Discord.MessageEmbed()
      .setAuthor("Command Logs")
      .setColor(botconfig["bot_setup"].main_embed_color)
      .setDescription(`**${message.author} (${message.author.tag})** used command: \n\`\`\`css\n${cmd} ${args}\`\`\``.split(',').join(' '))
      .setTimestamp()
      cmdChannel.send(logEmbed)
  }
});


let stickies = JSON.parse(fs.readFileSync("./stickyones.json", "utf8"));
client.on('message', async (message) => {
    if (message.author.id == client.user.id) return;
    if(!message.guild) return
    let stickies = await JSON.parse(fs.readFileSync("stickyones.json", "utf8"));

    if(stickies[message.channel.id]) {
        let lastMessage = await message.channel.messages.fetch(stickies[message.channel.id].lastId);
        lastMessage.delete();
        let newMessage = await message.channel.send(`:warning: __***Sticky Message, Read Before Typing!***__ :warning:\n${stickies[message.channel.id].message}`);

        stickies[message.channel.id] = {
            lastId: newMessage.id,
            message: stickies[message.channel.id].message
        };
        fs.writeFile("stickyones.json", JSON.stringify(stickies), (err) => {
            if (err) console.log(err)
        });
    }
});


// Leveling System
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = botconfig.prefix
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
  let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)

  let messages;
  if (messagefetch == 5) messages = 5; //Level 1
  else if (messagefetch == 13) messages = 13; // Level 2
  else if (messagefetch == 23) messages = 23; // Level 3
  else if (messagefetch == 39) messages = 39; // Level 4
  else if (messagefetch == 50) messages = 50; // Level 5
  else if (messagefetch == 75) messages = 75; // Level 6
  else if (messagefetch == 100) messages = 100; // Level 7
  else if (messagefetch == 135) messages = 135; // Level 8
  else if (messagefetch == 190) messages = 190; // Level 9
  else if (messagefetch == 250) messages = 250; // Level 10
  else if (messagefetch == 350) messages = 350; // Level 11
  else if (messagefetch == 450) messages = 450; // Level 12
  else if (messagefetch == 550) messages = 550; // Level 13
  else if (messagefetch == 650) messages = 650; // Level 14
  else if (messagefetch == 750) messages = 750; // Level 15
  else if (messagefetch == 850) messages = 850; // Level 16
  else if (messagefetch == 950) messages = 950; // Level 17
  else if (messagefetch == 1000) messages = 1000; // Level 18
  else if (messagefetch == 1150) messages = 1150; // Level 19
  else if (messagefetch == 1250) messages = 1250; // Level 20
  else if (messagefetch == 1350) messages = 1350; // Level 21
  else if (messagefetch == 1450) messages = 1450; // Level 22
  else if (messagefetch == 1550) messages = 1550; // Level 23
  else if (messagefetch == 1650) messages = 1650; // Level 24
  else if (messagefetch == 1750) messages = 1750; // Level 25


  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)
   const channel = await message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].level_channel);
  channel.send(`GG ${message.author}, You have leveled up to level ${levelfetch}`)
  }
});



// Message Delete Logger
client.on("messageDelete", message => {
  if(settings["module_toggles"].logs) {
      if (message.channel.type === 'dm') return;
      if (message.content.startsWith("!")) return undefined;
      if (message.content.startsWith(".")) return undefined;
      if (message.content.startsWith("?")) return undefined;
      if (message.content.startsWith("-")) return undefined;
      if (message.author.bot) return undefined;
      if (message.content.length > 1020) return undefined;

      let logEmbed = new Discord.MessageEmbed()
      .setAuthor("Action Logs", client.user.avatar_url)
      .setColor(settings["bot_setup"].main_embed_color)
      .setTimestamp()
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`)

      .setDescription("**Action:** Message Delete")
      .addField("Message Author:", `${message.author.toString()} - Hash: ${message.author.tag} - ID: ${message.author.id}`)
      .addField("Channel:", message.channel)
      .addField("Message Content:", `${message.content}.`)

      let logChannel = message.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].general_logs_channel);
      if (!logChannel) return console.log("leave channel not found (Config: 'general_logs_channel')");
      logChannel.send(logEmbed);
  }
});

// Reaction Roles
const roleReactionArray = [
  "messageId:reaction:addRoleId:removeRoleId",
  "788402466877079552:🛠️:788239125764374548:NA",
  "788402466877079552:👪:788239126755278888:NA",
  "788402466877079552:🔴:788239126943367178:NA",
  "788402466877079552:🚗:788239127870701608:NA",
  "788402466877079552:🤗:788240086671818782:NA",
  "789336671514525757:789336671514525757:789330663206682646:NA",
]


client.on('raw', pack => {
  if (!['MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_ADD'].includes(pack.t)) return;
  const channel = client.channels.cache.get(pack.d.channel_id);
  if (channel.messages.cache.has(pack.d.message_id)) return;
  channel.messages.fetch(pack.d.message_id).then(message => {
      const emoji = pack.d.emoji.id ? `${pack.d.emoji.name}:${pack.d.emoji.id}` : pack.d.emoji.name;
      const reaction = message.reactions.cache.get(emoji); // Debug 
      if (reaction) reaction.users.cache.set(pack.d.user_id, client.users.cache.get(pack.d.user_id));
      if (pack.t === 'MESSAGE_REACTION_ADD') {
        client.emit('messageReactionAdd', reaction, client.users.cache.get(pack.d.user_id));
      }
      if (pack.t === 'MESSAGE_REACTION_REMOVE') {
        client.emit('messageReactionRemove', reaction, client.users.cache.get(pack.d.user_id));
      }
  });
});

client.on("messageReactionAdd", async (reaction, user) => {
  if(!user) return;
  if(user.bot) return;
  if(!reaction.message.channel.guild) return;

  roleReactionArray.forEach(item => {
      let itemContent = item.split(":");
      let reactMessageId = itemContent[0]
      let reactReaction = itemContent[1]
      let reactAddRole = itemContent[2]
      let reactRemoveRole = itemContent[3]
      if(reaction.message.id == reactMessageId) {
          if(reaction.emoji.name == reactReaction) {
              if(reactAddRole != "NA") {
                  var role = reaction.message.guild.roles.cache.find(role => role.id === reactAddRole);
                  reaction.message.guild.member(user).roles.add(role).catch(console.error);
              }
              if(reactRemoveRole != "NA") {
                  var role = reaction.message.guild.roles.cache.find(role => role.id === reactRemoveRole);
                  reaction.message.guild.member(user).roles.remove(role).catch(console.error);
              }
              // Debug Code 
              }
      }
  });
});

client.on("messageReactionRemove", async (reaction, user) => {
  if(!user) return;
  if(user.bot) return;
  if(!reaction.message.channel.guild) return;

  roleReactionArray.forEach(item => {
      let itemContent = item.split(":");
      let reactMessageId = itemContent[0]
      let reactReaction = itemContent[1]
      let reactAddRole = itemContent[2]
      let reactRemoveRole = itemContent[3]
      if(reaction.message.id == reactMessageId) {
          if(reaction.emoji.name == reactReaction) {
              if(reactAddRole != "NA") {
                  var role = reaction.message.guild.roles.cache.find(role => role.id === reactAddRole);
                  reaction.message.guild.member(user).roles.remove(role).catch(console.error);
              }
              if(reactRemoveRole != "NA") {
                  var role = reaction.message.guild.roles.cache.find(role => role.id === reactRemoveRole);
                  reaction.message.guild.member(user).roles.add(role).catch(console.error);
              }
              // Debug Code 
            }
      }
  });
});

// Message Edit Logger
client.on("messageUpdate", (oldMessage, newMessage) => {
  if(settings["module_toggles"].logs) {
      if (oldMessage.author.bot) return undefined;
      if (oldMessage.content.length > 1020) return undefined;
      if (newMessage.content.length > 1020) return undefined;
      if (!oldMessage.guild) return undefined;

      let logEmbed = new Discord.MessageEmbed()
      .setAuthor("Action Logs", client.user.avatar_url)
      .setColor(settings["bot_setup"].main_embed_color)
      .setTimestamp()
      .setFooter(`Made By Jordan.#2139 | Customized For RLRP`)

      .setDescription("**Action:** Message Edited")
      .addField("Old Content", `${oldMessage.content}`)
      .addField("New Content", `${newMessage.content}.`)
      .addField("Message Author:", `${newMessage.author.toString()} - Hash: ${newMessage.author.tag} - ID: ${newMessage.author.id}`)
      .addField("Channel", oldMessage.channel)

      let logChannel = newMessage.guild.channels.cache.find(channel => channel.id === settings["channel_setup"].general_logs_channel);
      if (!logChannel) return console.log("leave channel not found (Config: 'general_logs_channel')");
      logChannel.send(logEmbed);
  }
});

// Member Update Logger
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  setTimeout(async () => {
      var Change = {
          rolesGiven: {
              update: false,
              updateArray: ""
          },
          rolesRemoved: {
              update: false,
              updateArray: ""
          },
          nickname: {
              update: false,
              updateArray: []
          }
      };

      const entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_UPDATE' }).then(audit => audit.entries.first())

      oldMember.roles.cache.forEach(function(rInfo) {
          if (newMember.roles.cache.find(roles => roles.id == rInfo.id) == null)
          {
              Change.rolesRemoved.updateArray = rInfo.id;
              Change.rolesRemoved.update = true;
          }
      });

      newMember.roles.cache.forEach(function(rInfo) {
          if (oldMember.roles.cache.find(roles => roles.id == rInfo.id) == null)
          {
              Change.rolesGiven.updateArray = rInfo.id;
              Change.rolesGiven.update = true;
          }
      });

      // Check If Member Has Been Given A New Nickname
      if (oldMember.nickname !== newMember.nickname) {
          Change.nickname.updateArray.push({newNickname: newMember.nickname != null ? newMember.nickname : newMember.guild.members.cache.get(newMember.id).user.username, oldNickname: oldMember.nickname != null ? oldMember.nickname : oldMember.guild.members.cache.get(oldMember.id).user.username});
          Change.nickname.update = true;
      }

      if (Change.nickname.update) {
          let cName = Change.nickname.updateArray[0];
          let oldName = cName.oldNickname;
          let newName = cName.newNickname;
          let member = newMember.guild.members.cache.get(entry.target.id);

          let logEmbed = new Discord.MessageEmbed()
          .setAuthor("Action Logs", client.user.avatarURL())
          .setColor(botconfig["bot_setup"].main_embed_color)
          .setTimestamp()
          .setFooter(`Made By Jordan.#2139 | Customized For RLRP`)

          logEmbed.setDescription("**Action:** Nickname Changed")
          if (entry.executor.id == newMember.id) {
              logEmbed.addField(`Changed By`, `${entry.executor} ( By Himself/Herself )`, true);
          } else {
              logEmbed.addField(`Changed By`, `${entry.executor}`, true);
          }
          logEmbed.addField("Target User", `${member} - ${member.user.tag}`, true)
          logEmbed.addField("Old Nickname", oldName)
          logEmbed.addField("New Nickname", newName)

          let logChannel = oldMember.guild.channels.cache.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
          if(!logChannel) return console.log("Channel not found (Config: 'general_logs_channel')");
          logChannel.send(logEmbed);
      }

      if (Change.rolesGiven.update) {
          let addedRole = Change.rolesGiven.updateArray;

          let logEmbed = new Discord.MessageEmbed()
          .setAuthor("Action Logs", client.user.avatarURL())
          .setColor(botconfig["bot_setup"].main_embed_color)
          .setTimestamp()
          .setFooter(`Made By Jordan.#2139 | Customized For RLRP`)

          logEmbed.setDescription("**Action:** Roles Added")
          logEmbed.addField("Target User", `${newMember} - ${newMember.user.tag}`, true)
          logEmbed.addField("Role Added", `<@&${addedRole}>`)

          let logChannel = oldMember.guild.channels.cache.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
          if(!logChannel) return console.log("Channel not found (Config: 'general_logs_channel')");
          logChannel.send(logEmbed);
      }

      if (Change.rolesRemoved.update) {
          let removedRole = Change.rolesRemoved.updateArray

          let logEmbed = new Discord.MessageEmbed()
          .setAuthor("Action Logs", client.user.avatarURL())
          .setColor(botconfig["bot_setup"].main_embed_color)
          .setTimestamp()
          .setFooter(`Made By Jordan.#2139 | Customized For RLRP`)

          logEmbed.setDescription("**Action:** Roles Removed")
          logEmbed.addField("Target User", `${newMember} - ${newMember.user.tag}`, true)
          logEmbed.addField("Role Removed", `<@&${removedRole}>`)

          let logChannel = oldMember.guild.channels.cache.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
          if(!logChannel) return console.log("Channel not found (Config: 'general_logs_channel')");
          logChannel.send(logEmbed);
      }
  }, 200);
});


client.elevation = message => {
  if (message.channel.type === 'dm') return;
  let permlvl = 0;
  let mod_role = message.guild.roles.cache.find(r => r.name === settings.modrolename);
  if (mod_role && message.member.roles.cache.has(mod_role.id)) permlvl = 1;
  let admin_role = message.guild.roles.cache.find(r => r.name === settings.adminrolename);
  if (admin_role && message.member.roles.cache.has(admin_role.id)) permlvl = 2;
  let manager_role = message.guild.roles.cache.find(r => r.name === settings.managerrolename);
  if (manager_role && message.member.roles.cache.has(manager_role.id)) permlvl = 3;
  let overlord_role = message.guild.roles.cache.find(r => r.name === settings.overlordrolename)
  if (overlord_role && message.member.roles.cache.has(overlord_role.id)) permlvl = 4;
  if (message.author.id === settings.ownerid) permlvl = 5;
  return permlvl;
};



//ping log 
//var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
//client.on('debug', e => {
// console.log(e.replace(regToken, 'that was redacted'));
//});


client.login(settings.token);
