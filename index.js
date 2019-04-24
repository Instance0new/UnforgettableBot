const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const tokenfile = process.env.TOKEN;
const fs = require('fs');
require('dotenv/config');
const http = require('http')
const port = process.env.PORT || 3000
http.createServer().listen(port);
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Commands not found.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)

        bot.commands.set(props.help.name, props);
    })
})

bot.on("ready", async => {
    console.log(`${bot.user.username} loaded!`)
    bot.user.setActivity(`for ${botconfig.prefix}help`, {type: "WATCHING"})
})

bot.on("message", async message => {
    if(message.author.bot)return;
    if(message.channel.type === "dm")return;

    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(cmd.substring(0,1) === prefix){
        let comfile = bot.commands.get(cmd.slice(prefix.length));
        if(comfile) comfile.run(bot,message,args)
    }

    if(message.author.id === `357259124314210304`) return await message.author.send("Sending messages in my server makes me want to get inside of you even more, honey. Lemme take care of your kitten, sweet-cakes. :drooling_face: :weary: :kissing_heart: :sweat_drops:")
});

bot.on('error', err => {
    console.log(err)
})

bot.login(tokenfile.token);