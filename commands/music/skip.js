const commando = require ('discord.js-commando');
const YTDL = require ('ytdl-core');

function Play (connection, message){
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter:"audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function(){
        if(server.queue[0]){
            Play(connection, message);
        }               
        else {
            connection.disconnect();
        }
    });
}

class JoinChannelCommand extends commando.Command {
    
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

module.exports = JoinChannelCommand;