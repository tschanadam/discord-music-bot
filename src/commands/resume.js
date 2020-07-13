module.exports = {
	name: 'resume',
	description: 'Resume command.',
	cooldown: 5,
	execute(message) {
		const noSongs = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('An error was encountered:')
	.setDescription('There currently is nothing playing. Try running !play (song)')
		const resumeSuccess = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('Success!')
	.setDescription('I resumed the music!')
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send(resumeSuccess);
		}
		return message.channel.send(noSongs);
	}
};
