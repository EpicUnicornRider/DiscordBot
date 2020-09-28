const commando = require ('discord.js-commando');

class LeaveChannelCommand extends commando.Command {
    
    constructor(client){
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Get the bot to leave a server'
        });
    }
    
    async run(message, args) {
        
        if(message.guild.voiceConnection){
            message.guild.voiceConnection.disconnect();    
        }
        else {
            message.reply('Jeg skal være i en voice channel kammerat');
        }
    }
}

module.exports = LeaveChannelCommand;