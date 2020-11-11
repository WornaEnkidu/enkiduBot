module.exports = {
    name: 'current',
    description: 'Current played song!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to see current song!');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        message.channel.send({embed: {
                color: 10038562,
                description: `Music 🎵 \nNow playing : **${serverQueue.songs[0].title}**`
            }
        })
            .then(msg => {
                msg.delete({timeout: 5000})
            });
    },
};