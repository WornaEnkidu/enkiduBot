module.exports = {
    name: 'queue',
    description: 'Get the queue!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to see the queue!');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        var liste ="";
        serverQueue.songs.forEach((song, index)=> liste += `${index}.[${song.duration}] ***${song.title}***\n`);
        message.channel.send({embed: {
                color: 10038562,
                description: `Music 🎵 \n${liste}`
            }
        })
            .then((msg) => {
                msg.delete({timeout: 5000});
            });
    },
};