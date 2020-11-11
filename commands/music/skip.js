module.exports = {
    name: 'skip',
    description: 'Skip current song!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to skip the music!');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        serverQueue.connection.dispatcher.end();
        message.channel.send({embed: {
                color: 10038562,
                description: `Music 🎵 \nSkipped music : **${serverQueue.songs[0].title}** \n Skipped by : ${message.author}`
            }
        })
            .then(msg => {
                msg.delete({timeout: 5000});
            });
    },
};