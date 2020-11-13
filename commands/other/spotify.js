const SpotifyWebApi = require('spotify-web-api-node');

module.exports = {
    name: "spotify",
    description: "Play a spotify song in your channel!",
    async execute(message) {
        try{
            const args = message.content.split(" ");
            var spotifyApi = new SpotifyWebApi({
                clientId: 'd03ab7aca6b64e77969fa088dbf6b273',
                clientSecret: '9939dcb3e6364197a848a4f1ff8bad2c',
            });
            spotifyApi.setAccessToken('BQAM2xzmCUCIzyEZYcXsp4GkhJ2b10XkE0luWb9lkm_dyHS_wyrFaWX4cn3lO37A40oQgb5JCzJ2ixlNO1XfKuS-NeoE955trzWLJl4CtGZsI3LZRdjZJc6LpX04S6IG1Ws8LO4dbI8');

            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel)
                return message.channel.send(
                    "You need to be in a voice channel to play music!"
                );
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                return message.channel.send(
                    "I need the permissions to join and speak in your voice channel!"
                );
            }
            var song;
            spotifyApi.getAudioFeaturesForTrack('1wjzFQodRWrPcQ0AnYnvQ9')
                .then(function(data) {
                    console.log(data.body);
                    song = {
                        title: "songInfo.videoDetails.title",
                        url: data.body.track_href
                    };
                }, function(err) {
                    console.error(err);
                });
            try{
                var connection = await voiceChannel.join();
                this.play(message,song,connection);
            }catch (err) {
                console.log(err);
                return message.channel.send(err);
            }
        } catch (error) {
            console.log(error);
            message.channel.send(error.message);
        }
    },
    play(message, song, connection) {

        if (!song) {
            voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = connection
            .play(song.url)
            .on("finish", () => {
                message.reply("Finish");
            })
            .on("error", error => console.error(error));
        }
};