const commando = require ('discord.js-commando');
var sqlite3         =       require('sqlite3').verbose();
var db              =       new sqlite3.Database('./database/discord.db');
//const sql = new SQLite('./scores.sqlite');

class QuotesCommand extends commando.Command {

    constructor(client){
        super(client, {
            name: 'quotes',
            group: 'quotes',
            memberName: 'quotes',
            description: 'Giver dig lov til at se et eller flere citater'
        });
    }

    async run(message, args) {

      let count = 0;

      let res = args.split("'");
      if (!args[0]) {
          message.reply("Skriv hvem du vil se citater fra");
      }
      else {
        db.all("SELECT quote,quoter FROM quotes WHERE quoter = ?"
        , [res[0]], (err, rows) => {
          rows.forEach(function (row) {
            count++;
              message.channel.send({
                  embed: {
                      color: 1072150,
                      description: `${row.quote} - ${row.quoter}`
                  }
              });
          });

          if(count == 0){
            message.reply("Der er ingen med det navn der har citater");
          }

        });
      }
    }
}

module.exports = QuotesCommand;
