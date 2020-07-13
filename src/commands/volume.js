module.exports = {
	name: 'volume',
	description: 'Volume command.',
	cooldown: 5,
	execute(message, args) {
		const errNoVC = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('An error was encountered:')
	.setDescription('Please connect to a voice channel to execute this command!')
		const noMusicPlaying = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('An error was encountered:')
	.setDescription('There is no music playing.')
		const currentVolume = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('The current volume is: **${serverQueue.volume}**')
	.setDescription('To change it, please type !volume followed by a number between 1 and 5.')
		const volumeSet = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('Success!')
	.setDescription('I changed the volume to: **${args[0]}**')
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(errNoVC);
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(noMusicPlaying);
		if (!args[0]) return message.channel.send(currentVolume);
		serverQueue.volume = args[0]; // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(volumeSet);
	}
};
