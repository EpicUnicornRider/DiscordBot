const commando = require ('discord.js-commando');
var sqlite3         =       require('sqlite3').verbose();
var db              =       new sqlite3.Database('./database/discord.db');
const discord = require('discord.js');




class QuoteCommand extends commando.Command {

    constructor(client){
        super(client, {
            name: 'quoter',
            group: 'quotes',
            memberName: 'quoter',
            description: 'gets who has made a quote'
        });
    }
    
    async run(message, args) {

        let quoter = [];
        let quoterN;
        let quotes = [];
        
        db.all("SELECT quoterName FROM Quoter"
        , (err, rows) => {
          rows.forEach(function (row) {
              quoter.push(row.quoterName);
            }); 
          
          let embed = new discord.RichEmbed()
          .setColor(1072150);
          quoter.forEach(entry => {
              embed.addField(entry, "\u200b");
          });
            
          message.channel.send(embed);
            
        });
        
    }
}


/*
message.channel.send({
                  embed: {
                      color: 1072150,
                      description: `${row.quoterName}`
                  }
              });
*/
module.exports = QuoteCommand;
