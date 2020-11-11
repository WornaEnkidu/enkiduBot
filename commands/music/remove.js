module.exports = {
    name: 'remove',
    description: 'Remove a song!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to skip the music!');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        const args = message.content.split(" ");
        if(isNaN(args[1]) || !Number.isInteger(+args[1])){
            return message.channel.send("**Enter a number**");
        }
        arg = parseInt(args[1]) + 1;
        if(arg < 1 || arg >= serverQueue.songs.length + 1 ){
            return message.channel.send("**Enter a valid song number**");
        }

        //remove the selected song from the queue
        serverQueue.songs.splice(arg-1, 1);

        message.channel.send({embed: {
                color: 10038562,
                description: `Music 🎵 \nRemove song **${arg-1}** from the queue`
            }
        })
            .then(msg => {
                msg.delete({timeout: 5000});
            });
    },
};