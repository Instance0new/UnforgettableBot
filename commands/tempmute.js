const Discord = require('discord.js')
const ms = require(`ms`)

module.exports.run = async (bot, message, args) => {

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("Couldn't find user.")
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Oh no, ${message.author} just tried to mute an admin. Ooooooo, they're are in trouble. :O`)
    let muterole = message.guild.roles.find(`name`,"Muted");

    if(!muterole){
        try{
            muterole = await message.guild.creatRole({
                name: "Muted",
                color: "#000000",
                permission: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS:false
                })
            })
        }catch(e){
            console.log(e.stack)
        }
    }
let mutetime = args[1]
if(!mutetime) return message.channel.send("Please specify a mute time.")

await(tomute.addRole(muterole.id));

message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}.`)

message.delete().catch(O_o=>{})

setTimeout(function(){
    tomute.removeRole(muterole.id)
    message.channel.send(`<@${tomute.id}> has been unmuted.`);
},ms(mutetime));

}

module.exports.help = {
    name: "tempmute"
}