const commando = require ('discord.js-commando');
const YTDL = require ('ytdl-core');

function play (connection, message){
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue.shift(), {filter: "audioonly"}));

    server.dispatcher.on("end", function(){
        if(server.queue[0] !== undefined){
            play(connection, message);
        }
        else {
            connection.disconnect();
        }
    });
}

class addSongCommand extends commando.Command {

    constructor(client){
        super(client, {
            name: 'add',
            group: 'music',
            memberName: 'add',
            description: 'Get the bot to play a song'
        });
    }

    async run(message, args) {

        if(message.member.voiceChannel){

            if(!message.guild.voiceConnection) {

                if(!servers[message.guild.id]){
                    servers[message.guild.id] = {queue: []}
                }

                message.member.voiceChannel.join()
                .then(connection => {
                    message.channel.send('Jeg er inde');
                    var server = servers[message.guild.id];
                    server.queue.push(args);
                    play(connection, message);
                });
                return;
            }
            message.channel.send('Den er sku med nu fam');
            var server = servers[message.guild.id];
            server.queue.push(args);
            play(connection, message);
        }
        else {
            message.reply('Du skal joine en voice channel kammerat');
        }
    }
}

module.exports = addSongCommand;
