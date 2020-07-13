const { Util } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Play command.',
	usage: '[command name]',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		const playErrNoConnect = new Discord.MessageEmbed()
	.setColor('#7289da')
	.setTitle('There was an error:')
	.setDescription('You need to connect to a voice channel first.')
	.setTimestamp()
		const songQueueAdd = new Discord.MessageEmbed()
	.setColor('#7289da')
	.setTitle('Success! I added the below song to the queue')
	.setDescription('**${song.title}**')
	.setTimestamp()
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('playErrNoConnect);
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if (!permissions.has('SPEAK')) return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');

		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, '$1'));
		const song = {
			id: songInfo.video_id,
			title: Util.escapeMarkdown(songInfo.title),
			url: songInfo.video_url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return message.channel.send(songQueueAdd);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.p
		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			queue.textChannel.send(`🎶 Start playing: **${song.title}**`);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	}
};
