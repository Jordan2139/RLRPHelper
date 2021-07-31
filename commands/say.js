exports.run = (client, message) => {
    let args = message.content.split(" ").slice(1);
    message.delete();
    let statement = args.slice(0).join(' ');
    if (args.join(" ") === "@everyone" || args.join(" ") === "@here") return message.channel.send("You ain't making me Ping anyone BOI!");
    if (!statement) return message.channel.send('breh whatchu want me to say?')
    message.channel.send(statement);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "say",
    description: "Makes the bot repeat your message.",
    usage: "say [message]"
};
