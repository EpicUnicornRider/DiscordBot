const commando = require ('discord.js-commando');
const YTDL = require('ytdl-core');

function play (connection, message){
        
    var server = servers[message.guild.id];
    
    let info = YTDL.getInfo(server.queue[0]);
    console.log(info);
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
   
    server.queue.shift();
    
    server.dispatcher.on("end", function(){
        if(server.queue[0]){
                
             play(connection, message);
        }
        else {
            message.member.voiceChannel.leave();
        }
    });
}

class addSongCommand extends commando.Command {

    constructor(client){
        super(client, {
            name: 'add',
            group: 'music',
            memberName: 'add',
            description: 'Get the bot to play a song',
                        
        });
    }

    async run(message, args) {
        
        if(!args){
            message.say('Giv mig et link, cunt');
            return;
        }
        
        if (!message.member.voiceChannel) {
          message.say(':no_entry: Du skal værre i en voice channel, kammerat');
          return;
        }
                
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };
                
        var server = servers[message.guild.id];
                
        let validate = await YTDL.validateURL(args);
        
        if(!validate){
            return message.channel.send('det er ikke et ordentligt youtube link, kammerat');
        }
        
        server.queue.push(args.toString());
        
        const voiceConnection = message.guild.voiceConnection;
        
        if(!voiceConnection){
            message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            });
        }
        
  }
}

module.exports = addSongCommand;
