const request = require('request');
const fs = require('fs');
const { JSDOM } = require('jsdom');
module.exports = {
    name: 'gtreceivers',
    description: 'Global Tuners receivers page',
    async execute(message) {
        JSDOM.fromURL("https://www.globaltuners.com/receiver/list_load.php", { runScripts: "dangerously" }).then(dom => {
            const $ = global.jQuery = require( 'jquery' )(dom.window);
            dom.window.document.getElementsByTagName("table")[0].id="receiverTable";
            var tbl = $('table#receiverTable tr:has(td)').map(function(i, v) {
                var $td =  $('td', this);
                var $a = $('td a:first',this);
                return {
                    id: ++i,
                    location: $td.eq(0).text(),
                    link: $a.attr("href"),
                    country: $td.eq(1).text(),
                    receiver: $td.eq(2).text(),
                    status: $td.eq(3).text()
                }
            }).get();
            var listeReceiver = "";
            var nbAvailableReceiver = 0;
            var nbReceiver = 0;
            const args = message.content.split(" ");
            if(isNaN(args[1]) || !Number.isInteger(+args[1])){
                return message.channel.send("**Enter a number**");
            }
            iPage = args[1];

            tbl.forEach((receiver) => {
                if(receiver.status == "Available") {
                    if (nbReceiver < iPage * 10) {
                        if (nbReceiver >= (iPage - 1) * 10) {
                            listeReceiver += `${receiver.id}. ${receiver.location} (${receiver.country})\n`;
                        }
                        nbReceiver++;
                    }
                    nbAvailableReceiver++;
                }
            });
            if(iPage < 1 || iPage > (nbAvailableReceiver%10 == 0 ? nbAvailableReceiver/10 : Math.trunc(nbAvailableReceiver/10)+1)){
                return message.channel.send("**Enter a valid page number**");
            }
            message.channel.send({
                embed: {
                    color: 10038562,
                    description: `Receiver list 🎵 \n${listeReceiver}\n${iPage}/${(nbAvailableReceiver%10 == 0 ? nbAvailableReceiver/10 : Math.trunc(nbAvailableReceiver/10)+1)}`
                }
            })
        });
    },
};