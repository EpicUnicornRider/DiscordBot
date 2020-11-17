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
            
            let quoterN = res[2].toLowerCase();
            
            let qID = 0;
            
            let count = 0;
            
            
            db.all("SELECT * FROM Quoter WHERE quoterName = (?)",
            [quoterN]
            , (err, rows) => {
              rows.forEach(function (row) {
                  count++;
                  qID = row.quoterID;   
                                    
              });
            
                if(count == 0){

                    db.run("INSERT into Quoter(quoterName) VALUES (?)",
                    [quoterN]);

                    db.all("SELECT quoterID FROM Quoter WHERE quoterName = (?)",
                    [quoterN]
                    , (err, rows) => {
                      rows.forEach(function (row) {
                          qID = row.quoterID;
                      });

                        db.run("INSERT into Quotes(quotesDesc, quoterID) VALUES (?, ?)",
                        [res[0], qID],
                        function(err,results) {
                          message.reply("Citatet er sat ind min gut");
                        });
                    });

                }
                else{
                    db.run("INSERT into Quotes(quotesDesc, quoterID) VALUES (?, ?)",
                    [res[0], qID],
                    function(err,results) {
                      message.reply("Citatet er sat ind min gut");
                    });
                }
                
                
            });
            
            
            
            
        }
    }
}

module.exports = QuoteCommand;
