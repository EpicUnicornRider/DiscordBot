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
        
            message.member.voiceChannel.leave();
    }
}

module.exports = LeaveChannelCommand;