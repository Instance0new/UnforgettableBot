const Discord = require('discord.js')

module.exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Hey you're silly, commands are for admins ${message.author}.`);
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22);
    if(kUser.hasPermission("KICK_MEMBERS"))return message.channel.send(`Oh no, ${message.author} just tried to kick an admin. Ooooooo, they're are in trouble. :O`);
    message.delete().catch(O_o=>{})
    let kembed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${kUser.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time",message.createdAt)
    .addField("Reason", reason);

    let kchannel = message.guild.channels.find(`name`,"incidents")
    if(!kchannel)return message.send("Could't find #incidents channel.")

    message.guild.member(kUser).kick(reason)

    kchannel.send(kembed)

    return;
}

module.exports.help = {
    name: 'kick'
}