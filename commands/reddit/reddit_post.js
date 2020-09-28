const commando = require ('discord.js-commando');
const snekfetch = require('snekfetch');
const discord = require('discord.js');

class GetRedditPostCommand extends commando.Command {

    constructor(client){
        super(client, {
            name: 'get',
            group: 'reddit',
            memberName: 'get',
            description: 'Get a post from a subreddit'
        });
    }

       async run(message, args) {
        try {
            const { body } = await snekfetch
                .get('https://www.reddit.com/r/'+args+'.json?sort=top&t=week')
                .query({ limit: 800 });
            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
            const randomnumber = Math.floor(Math.random() * allowed.length)
            const memes = new discord.RichEmbed()
                .setColor(16420352)
                .setTitle(allowed[randomnumber].data.title)
                .setImage(allowed[randomnumber].data.url)
                .setFooter("Post provided by r/"+args)
            message.channel.send(memes);
        }
        catch (err) {
            return console.log(err);
        }
    }
}


module.exports = GetRedditPostCommand;
