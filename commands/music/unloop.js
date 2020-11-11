module.exports = {
    name: 'unloop',
    description: 'Unloop current song!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to replay the music!');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        serverQueue.songs.loop = false;
        message.channel.send({embed: {
                color: 10038562,
                description: `Music 🎵 \nUnloop : **${serverQueue.songs[0].title}**`
            }
        })
            .then(msg => {
                msg.delete({timeout: 5000})
            });
    },
};