const Discord = require('discord.js');
const fs = require('fs');
const Client = new Discord.Client();
const config = require('./config');
Client.login(config.token).catch(console.error);
Client.once('ready', () => {
    console.time('loading');
    Client.load();
    Client.user.setGame('type '+config.prefix+'help');
    //Client.user.setStatus('invisible');//set the "playing" thing bellow your username
    console.timeEnd('loading'); //will give in the console the time the bot needed to launch, can be usefull for optimization
    console.log('I am ready!'); //loading is finished
});

Client.load = (command) => { //this thing will get in memory every command from the bot
    let commandsList = fs.readdirSync('./modules/'); //it get every file name inside the folder "module"
    if (command) { //if a parameter is used
        if (commandsList.indexOf(`${command}.js`) >= 0) { //check if the command exist
            //if string doesn't exist in array, indexOF returns -1
            delete require.cache[require.resolve(`./modules/${command}`)]; //delete the previous cache of that command
            Client.commands[command] = require(`./modules/${command}`); //create the the cache of that command
        }
    } else { //if no parameter is used
        Client.commands = {}; //create an array commands in the object Client
        for (i = 0; i < commandsList.length; i++) { //for every item from the array commandList
            let item = commandsList[i]; //item is the command at the position i in the array
            if (item.match(/\.js$/)) { //if the file with that name is a js file
                delete require.cache[require.resolve(`./modules/${item}`)]; //delete the previous cache of that command
                Client.commands[item.slice(0, -3)] = require(`./modules/${item}`); //cut the .js out of the item var
                // and create the the cache of that command
                console.log('loaded :' +item); //log in the console the command that was loaded
            }
        }
    }
};

Client.on('message', message => { //on every message listened, the message is set as a message object
//command handler
    if (message.content.startsWith(config.prefix)) { //if the message start by the prefix
        if (message.author.bot) return; //stop here if the message is from a bot
        let args = message.content.split(' '); //split the message into an array of string
        let guild = message.guild; //to avoid being annoyed wy writing message.guild every time you need the guild object

        let command = args[0].slice(config.prefix.length); //cut the prefix out of the first arg(array start index at 0)
        args.splice(0, 1); //delete the command from the args, as we will never need it

        if (command in Client.commands) {
            let timestamp = new Date(); //get the exact time when executed
            console.log('[' + timestamp.getFullYear()
                + '-' + (timestamp.getMonth() + 1)
                + '-' + timestamp.getDate()
                + ' ' + timestamp.getHours()
                + ':' + timestamp.getMinutes()
                + '] [' + message.author.tag
                + '] [' + message.author.id + '] '
                + command);
            Client.commands[command].func(Client, message, args, guild); //sned the parameters to the command
            console.log(args);
        }
    }
});
