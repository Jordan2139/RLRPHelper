const Discord = require("discord.js")
const botconfig = require("../settings.json");

exports.run = (client, message, args) => {
    message.delete();
         
    if (!message.guild.roles.cache.find(role => role.id === botconfig["ticket_system"].support_role)) return message.channel.send(`No role to create ticket. Please contact the server owner.`).then(msg => msg.delete({timeout:15000}));
            let roleSupportRole = message.guild.roles.cache.find(role => role.id === botconfig["ticket_system"].support_role);
    message.guild.channels.create(`ticket-${message.author.username}`, {
        type: 'text',
        permissionOverwrites: [
            
            {id: roleSupportRole, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']},

            {id: message.guild.roles.cache.get('705706822492749865'), deny: ['VIEW_CHANNEL']},

            {id: message.author.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}
        ],
    }).then(c => {
        moveTicket(c)
            c.setTopic(`Ticket ID: ${message.author.id} | Creator: ${message.author.username}`)
        message.channel.send(`:white_check_mark: ***<@${message.author.id}> Your ticket has been created, <#${c.id}>.***`).then(msg => msg.delete({timout:15000}));
        const embed = new Discord.MessageEmbed()
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setDescription(`**Dear <@${message.author.id}>!**\n\nThank you for reaching out to our support team! \n\n We will get back to you as soon as possible.\n To close this ticket use \`?close\`.`)
            .setTimestamp()
            .setFooter(`Made By Jordan.#2139 | Customized For RLRP`, `${message.guild.iconURL()}`)
        c.send(embed)

        if(botconfig["ticket_system"].auto_reply) {
            if(!message.guild.channels.cache.find(channel => channel.name === c.id)) return
            const filter = m => m.author.id === message.author.id;
            c.awaitMessages(filter, { max: 1, time: ms('1d') }).then(idfk => {
                c.send(botconfig["ticket_system"].auto_reply_message)
            })
        }
    }).catch(console.error);
    async function moveTicket(c) {
        await c.setParent(botconfig["channel_setup"].ticket_category);
    };
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['tic'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ticket',
    description: 'Create Tickets',
    usage: 'Ticket'
  };