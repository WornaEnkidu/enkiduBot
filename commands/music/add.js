const ytdl = require("ytdl-core");
const ytpl = require('ytpl');
module.exports = {
  name: "add",
  description: "Add song in your channel!",
  async execute(message) {
    try {
      const args = message.content.split(" ");
      if (!message.member.voice.channel) throw new Error('You have to be in a voice channel to add the music!');
      var serverQueue = message.client.queue.get(message.guild.id);
      const voiceChannel = message.member.voice.channel;
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
     "I need the permissions to join and speak in your voice channel!"
        );
      }
      if(ytpl.validateID(args[1])) {
        const playlistID = await ytpl.getPlaylistID(args[1]);
        const results = await ytpl(playlistID,function(err, playlist) {
          if(err)  console.log(playlist);;
          console.log(playlist);
        });
        var playlistProcess;
        message.channel.send({
          embed: {
            color: 10038562,
            description: `Music 🎵 \nThe playlist ${results.title} is in the process of being added to the queue!`
          }
        })
        .then(msg => {
          playlistProcess = msg;
        });
        for(let i = 0; i < results.items.length; i++){
          await this.addSong(message,results.items[i].url_simple);
        }
        playlistProcess.delete();
      }else{
            await this.addSong(message, args[1]);
      }
    } catch (error) {
      console.log(error);
      message.channel.send({
        embed: {
          color: 10038562,
          description: `${error.message}`
        }
      })
      .then((msg) => {
        msg.delete({timeout: 5000});
      });
    }
  },

  play(message, song) {
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on('start',()=> {
        var liste = "";
        serverQueue.songs.forEach((song, index) => liste += `${index}.[${song.duration}] ***${song.title}***\n`);
        message.channel.send({
          embed: {
            color: 10038562,
            description: `Music 🎵 \n${liste}`
          }
        })
      })
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", error => console.error(
          error));
  },

  async addSong(message, musicUrl) {
    const queue = message.client.queue;
    const serverQueue = message.client.queue.get(message.guild.id);
    const voiceChannel = message.member.voice.channel;
    songInfo = await ytdl.getInfo(musicUrl);
    const song = {
      title: songInfo.videoDetails.title,
      author: songInfo.videoDetails.author.name,
      duration: timeConverter(songInfo.videoDetails.lengthSeconds),
      url: musicUrl
    };
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
      queue.set(message.guild.id, queueContruct);
      queueContruct.songs.push(song);
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        this.play(message, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
        var liste = "";
        serverQueue.songs.forEach((song, index) => liste += `${index}.[${song.duration}] ***${song.title}***\n`);
        message.channel.send({
          embed: {
            color: 10038562,
            description: `Music 🎵 \n${liste}`
          }
        })
      return ;
    }
}
};
function timeConverter(dur) {
  dur = Number(dur);
  var m = Math.floor(dur % 3600 / 60);
  var s = Math.floor(dur % 3600 % 60);

  var min = m > 0 ? m + (m == 1) : "00";
  var sec = s > 0 ? s + (s == 1) : "00";
  return `${min}:${sec}`;
}



