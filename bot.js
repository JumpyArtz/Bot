const Discord = require('discord.js');
const client = new Discord.Client();

var commandIs = function(str, msg){
  if(msg.content.toLowerCase().startsWith("!" + str) || msg.content.toLowerCase().startsWith("/" + str)){
    return true;
  }
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role) {
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

client.on('ready', () => {
    console.log('The bot is online!');
});

client.on('message', message => {
    var args = message.content.split(/[ ]+/);
    if(commandIs("hello", message)){
        message.channel.sendMessage('Hello there, ' + message.author.username);

    }
    if(commandIs("youtube", message)){
        if(args.length === 1){
            message.channel.sendMessage('You did not define an argument. Usage:`!youtube [episode number]`');
        } else if(args.length === 2){
            message.channel.sendMessage('Hello, YouTube, This is episode ' + args[1]);
        } else {
            message.channel.sendMessage('You defined too many arguments. Usage: ´!youtube [episode number]´');
        }
    }
    if(commandIs("say", message)){
        if(hasRole(message.member, "Owner") || hasRole(message.member, "Mod")){
                    if(args.length === 1){
            message.channel.sendMessage('You did not define an argument. Usage: ´!say [message to say]´');
            } else {
            message.channel.sendMessage(args.join(" ").substring(5));
            }
        } else {
            message.channel.sendMessage('You are not an Owner or Mod´')
        }

    }
    if(commandIs("delete", message)){
                if(hasRole(message.member, "Owner") || hasRole(message.member, "Mod")){
                    if(args.length >= 3){
            message.channel.sendMessage('You did not define an argument. Usage: ´!delete (number of messages to delete´');
            } else {
            var msg;
            if(args.length === 1){
                msg=2;
            } else {
                msg=parseInt(args[1]) + 1;
            }
            message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
            }
        } else {
            message.channel.sendMessage('You are not an Owner or Mod´')
        }
    }
    if(commandIs("kick", message)){
        if(hasRole(message.member, "Owner") || hasRole(message.member, "Mod")){
            if(args.length ===1){
                message.channel.sendMessage('You did not define a argument. Usage: ´!kick [user to kick]´');
            } else {
                message.guild.member(message.mentions.users.first()).kick();
            }
        }
    }
}); 

client.login('MzEwMzQ2MjkyNjcwODg5OTg0.C-8oBQ.00oOC5tvRh9hkFKOGRH6dRCpapM');