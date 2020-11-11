module.exports = {
    name: 'play',
    description: 'Play song in the queue!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to play the music!');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        if(!serverQueue.playing){
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            message.channel.send({embed: {
                    color: 10038562,
                    description: `Music 🎵 \nPlay : **${serverQueue.songs[0].title}**`
                }
            })
                .then(msg => {
                    msg.delete({timeout: 5000})
                });
        }else{
            message.channel.send({embed: {
                    color: 10038562,
                    description: `Music 🎵 \nAlready playing : **${serverQueue.songs[0].title}**`
                }
            })
                .then(msg => {
                    msg.delete({timeout: 5000})
                });
        }
    },
};