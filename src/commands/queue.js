module.exports = {
	name: 'queue',
	description: 'Queue command.',
	cooldown: 5,
	execute(message) {
		const queue = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('**__MUSIC QUEUE__**')
	.setDescription('${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}')
	.addField(name: '**__NOW PLAYING**__', value: '${serverQueue.songs[0].title}')
		const noSongs = new Discord.messageEmbed()
	.setColor('#0099ff')
	.setTitle('An error was encountered:')
	.setDescription('There currently is nothing playing. Try running !play (song)')
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('noSongs');
		return message.channel.send(queue)
};
