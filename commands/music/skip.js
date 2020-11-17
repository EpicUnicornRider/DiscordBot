const commando = require ('discord.js-commando');
const YTDL = require('ytdl-core');

class SkipSongCommand extends commando.Command {
    
    constructor(client){
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'skips song'
        });
    }
    
    async run(message, args) {
       var server = servers[message.guild.id];
        
       if(server.dispatcher) {
           server.dispatcher.end();
       }
    }
}

module.exports = SkipSongCommand;
