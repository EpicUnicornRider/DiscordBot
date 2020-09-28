const Commando = require ('discord.js-commando');
const discord = require ('discord.js');
const auth = require('./auth.json');
const bot = new Commando.Client();

bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('reddit', 'Reddit');
bot.registry.registerGroup('quotes', 'Quotes');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};

bot.on('ready', function () {
    console.log("Ya Yeet");
});


bot.on('message', function(message) {
    msg = message.content.toLowerCase();
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
   if(msg.includes( "det har jeg ikke hørt")) {
    message.channel.send('Det tænkte jeg nok. Det er ikke en historie som jedierne ville fortælle dig')
   }
});

bot.on('message', function(message) {
    msg = message.content.toLowerCase();
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
   if(msg.includes( "sebathebot")) {
       var insult = Math.floor(Math.random() * 4)

       switch (insult) {
         case 0:
           message.reply("Your mother was a dumb whore with a fat arse. Did you know that?")
           break;
         case 1:
           message.reply("Your mother was a hamster and your father smelt of elderberries")
           break;
         case 2:
          message.reply("Du får Zbiegnew til at se kompetent ud")
          break;
         case 3:
            message.reply("Du er til mænd")
            break;
         case 4:
          message.reply("I will yeet you into the next century")
          break;
       }

   }
});
bot.login(auth.token);
