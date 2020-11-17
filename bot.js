const Commando = require ('discord.js-commando');
const discord = require ('discord.js');
const auth = require('./auth.json');
const bot = new Commando.Client();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/discord.db');

bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('reddit', 'Reddit');
bot.registry.registerGroup('quotes', 'Quotes');
bot.registry.registerGroup('wiki', 'Wiki');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};

bot.on('ready', function () {
    console.log("Ya Yeet");
});

bot.on('message', function(message) {
    msg = message.content.toLowerCase();
    
    if(msg.includes( "det har jeg ikke hørt")) {
        message.channel.send('Det tænkte jeg nok. Det er ikke en historie som jedierne ville fortælle dig')
    }
    
    
   if(msg.includes( "sebathebot")) {
              
       db.all("SELECT insult FROM insults ORDER BY RANDOM() LIMIT 1;"
        , (err, rows) => {
          rows.forEach(function (row) {
              message.reply(`${row.insult}`);
          });
        });
   }
});
bot.login(auth.token);
