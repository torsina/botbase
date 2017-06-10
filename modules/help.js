const fs = require('fs');
module.exports = {
    help: 'Plz send help!!',
    func: (Client, msg, args, guild) => { //we get our parameters back
        if (args[0] in Client.commands && Client.commands[args[0]].help) //if args[0] is a command and help property exist
            msg.channel.sendCode('asciidoc', `${args[0]} :: ${Client.commands[args[0]].help}`);
        else {
            let help = "";
            for (let command in Client.commands) { //for every command in the bot
                help += `${command} :: ${Client.commands[command].help}\n` // n\ is a new line
            }
            msg.channel.sendCode('asciidoc', help);
        }
    }
};