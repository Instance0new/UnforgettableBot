const Discord = require('discord.js')

module.exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Hey you're silly, commands are for admins ${message.author}.`);
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22);
    if(bUser.hasPermission("BAN_MEMBERS"))return message.channel.send(`Oh no, ${message.author} just tried to ban an admin. Ooooooo, they're are in trouble. :O`);
    message.delete().catch(O_o=>{})
    let bembed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${bUser.id}`)
    .addField("Banned In", message.channel)
    .addField("Time",message.createdAt)
    .addField("Reason", reason);

    let bchannel = message.guild.channels.find(`name`,"incidents")
    if(!bchannel)return message.send("Could't find #incidents channel.")

    message.guild.member(bUser).ban(reason)

    bchannel.send(bembed)

    return;
}

module.exports.help = {
    name: 'ban'
}