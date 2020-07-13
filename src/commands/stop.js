module.exports = {
	name: 'stop',
	description: 'Stop command.',
	cooldown: 5,
	execute(message) {
		const errNoVC = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('An error was encountered:')
	.setDescription('Please connect to a voice channel to execute this command!')
		const noEligibleSongs = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('An error was encountered:')
	.setDescription('There is nothing playing I can stop for you.')
		const songStopped = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('Success!')
	.setDescription('I stopped the song for you.')
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(errNoVC);
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(noEligibleSongs);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end(songStopped);
	}
};
