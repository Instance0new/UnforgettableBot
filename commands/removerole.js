const Discord = require('discord.js')

module.exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Silly, you're not an admin.");
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let role = args.join(" ").slice(22);
    if(!role) return message.channel.send("Please specify a role.");
    let grole = message.guild.roles.find(`name`, role);
    if(!grole) return message.channel.send("That role doesn't exist.");

    if(!rUser.roles.has(grole.id)) return message.reply(`<@${rUser.id}> doesn't have that role!`);
    await(rUser.removeRole(grole.id));

    try{
        await rUser.send(`RIP, you have lost the role, ${grole.name}`)
    }catch(e){
        message.channel.send(`RIP <@${rUser.id}>, you have lost the role, ${grole.name}`)
    }
    message.delete().catch(O_o=>{})
}

module.exports.help = {
    name: 'removerole'
}