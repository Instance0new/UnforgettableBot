const Discord = require('discord.js');
const prefix = '?'

module.exports.run = async (bot,message,args) => {
    let hicon = `https://banner2.kisspng.com/20180401/orq/kisspng-comics-comic-book-text-cartoon-help-5ac10c016b1399.1759756515226009614386.jpg`;
    let hembed = new Discord.RichEmbed()
    .setDescription("Commands")
    .setColor("#00ffff")
    .setThumbnail(hicon)
    .addField(`${prefix}botinfo`, `Information about ${bot.user.username}.`)
    .addField(`${prefix}serverinfo`, `Information about ${message.guild.name}.`)
    .addField(`${prefix}report`, `Report a user if they break the rules. Use : ${prefix} [mention user] [reason]`)
    .addField(`${prefix}addrole`, `Add a role to someone. Use : ${prefix}addrole [mention user] [role name]`)
    .addField(`${prefix}removerole`, `Remove a role from someone. Use : ${prefix}removerole [mention user] [role name]`)
    .addField(`${prefix}tempmute`, `Temperarily mute a user. Use : ${prefix}tempmute [mention user] [time (ex. 10s/10m/10h/10d)]`)
    .addField(`${prefix}ban`, `Ban a user. Use : ${prefix}ban [mention user] [reason]`)
    .addField(`${prefix}kick`, `Kick a user. Use : ${prefix}kick [mention user] [reason]`)
    .addField(`${prefix}clear`, `Clear messages in a channel. Use : ${prefix}clear [number of mesages]`)

    try{
        await message.author.send(hembed);
        message.reply("Check your Dm's.").then(msg => msg.delete(5000));
    }catch(e){
        message.channel.send(hembed)
    }
}

module.exports.help = {
    name: 'help'
}