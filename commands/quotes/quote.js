const commando = require ('discord.js-commando');
var sqlite3         =       require('sqlite3').verbose();
var db              =       new sqlite3.Database('./database/discord.db');
//const sql = new SQLite('./scores.sqlite');

class QuoteCommand extends commando.Command {

    constructor(client){
        super(client, {
            name: 'quote',
            group: 'quotes',
            memberName: 'quote',
            description: 'Quotes a message'
        });
    }

    async run(message, args) {

        let res = args.split("'");
        if(!res[0] || !res[2]){
            message.reply("Du skal indsætte et citat OG en person min gut. Sæt citatet indenfor 2 ' symboler. Sørg også for at personen der siger det er indenfor 2 ' symboler");
        }

        else {
            //add_quote = "INSERT into Quotes(quote,quoter) VALUES (?, ?)", [res[0], res[2]], function(err,results) {}
            db.run("INSERT into Quotes(quote,quoter) VALUES (?, ?)",
            [res[0], res[2]],
            function(err,results) {
              message.reply("Citatet er sat ind min gut");
            });
        }
    }
}

module.exports = QuoteCommand;
