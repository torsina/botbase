const fs = require('fs');
module.exports = {
    help: 'Plz send help!!',
    func: (Client, msg, args, guild) => {
        if (args[0] in Client.commands && Client.commands[args[0]].help)
            msg.channel.sendCode('asciidoc', `${args[0]} :: ${Client.commands[args[0]].help}`);
        else {
            let help = "";
            for (let command in Client.commands) {
                help += `${command} :: ${Client.commands[command].help}\n`
            }
            msg.channel.sendCode('asciidoc', help);
        }
    }
};