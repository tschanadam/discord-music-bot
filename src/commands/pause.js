module.exports = {
	name: 'pause',
	description: 'Pause command.',
	cooldown: 5,
	execute(message) {
		const pausedSong = new Discord.MessageEmbed()
	.setColor('#7289da')
	.setTitle('Music Pasued')
	.setDescription('I hit the pause button!')
		const pausenosong = new Discord.MessageEmbed()
	.setColor('#7289da')
	.setTitle('Theres no song playing!')
	.setDescription('You can play one by typing !play (song)!')
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send(pausedSong);
		}
		return message.channel.send(pausenosong);
	}
};
