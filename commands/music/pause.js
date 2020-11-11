module.exports = {
    name: 'pause',
    description: 'Pause song in the queue!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        if(serverQueue.playing){
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true);
            message.channel.send({embed: {
                    color: 10038562,
                    description: `Music 🎵 \nPaused : **${serverQueue.songs[0].title}** by ${message.author}`
                }
            })
                .then(msg => {
                    pauseMessage = msg
                });
        }else{
            message.channel.send({embed: {
                    color: 10038562,
                    description: `Music 🎵 \nThe music is already on pause`
                }
            })
                .then(msg => {
                    msg.delete({timeout: 5000})
                });
        }
    },
};