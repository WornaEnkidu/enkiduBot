const request = require('request');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const { jQuery } = require('jquery');
module.exports = {
    name: 'gt',
    description: 'Global Tuners',
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
            const args = message.content.split(" ");
            var receverId = args[1];
            if(isNaN(receverId) || !Number.isInteger(+receverId)){
                return message.channel.send("**Enter a number**");
            }
            tbl.forEach((receiver) => {
                if(receiver.id == receverId){
                    if(receiver.status == "Available") {
                        console.log(`https://www.globaltuners.com${receiver.link}`);
                        JSDOM.fromURL(`https://www.globaltuners.com${receiver.link}`, { runScripts: "dangerously" }).then(domReceiver => {
                            let $ = global.jQuery = require( 'jquery' )(domReceiver.window);
                            domReceiver.window.document.getElementsByTagName("body")[0].getElementsByTagName("input")[5].value="Worna";
                            domReceiver.window.document.getElementsByTagName("body")[0].getElementsByTagName("input")[6].value="u0g5mz7k";
                            $("input[value='Login']").click();
                            domReceiver.window.location.href = domReceiver.window.document.getElementsByTagName("h2")[0].children[0].href;

                            /*domReceiver.window.document.getElementById("txtFreq").value="101.1";
                            var ev = domReceiver.window.document.createEvent('KeyboardEvent');
                            ev.initKeyEvent('keydown', true, true, domReceiver.window, false, false, false, false, 13, 0);
                            domReceiver.window.document.getElementById("txtFreq").dispatchEvent(ev);
                            */
                            var link = domReceiver.window.document.getElementsByTagName("audio")[0].src;
                            console.log(link);
                        });

                        }else{
                        message.channel.send({
                            embed: {
                                color: 10038562,
                                description: `The receiver isn't available.\nStatus : ${receiver.status}`
                            }
                        })
                            .then(msg => {
                                msg.delete({timeout: 5000});
                            });
                    }
                }
            });
        });
    },

};