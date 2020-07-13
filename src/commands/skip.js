module.exports = {
	name: 'skip',
	description: 'Skip command.',
	cooldown: 5,
	execute(message) {
		const errNoVC = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('An error was encountered:')
	.setDescription('Please comnect to a voice channel to execute this command!')
		const noEligibleSongs = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('An error was encountered:')
	.setDescription('There are no songs I can skip for you right now!')
		const songSkipped = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('Success!')
	.setDescription('Song skipped!')
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('errNoVC);
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('noEligibleSongs');
		serverQueue.connection.dispatcher.end(songSkipped);
	}
};
