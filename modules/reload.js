module.exports = {
    help: 'Reload the commands',
    func: (client, msg, args, guild) => {
        console.time('reload');
        if (args.length > 0){ //to reload a specific command
            client.load(args[0]);
            msg.channel.sendMessage('Command '+ args[0] + ' reloaded');
            console.timeEnd('reload');
        }
        else { //if not
            client.load();
            msg.channel.sendMessage('Commands reloaded.');
            console.timeEnd('reload');
        }
    }
};