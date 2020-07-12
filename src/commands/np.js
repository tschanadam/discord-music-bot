module.exports = {
	name: 'np',
	description: 'Now playing command.',
	cooldown: 5,
	execute(message) {
		const npsongplaying = new Discord.MessageEmbed()
	.setColor('#7289da')
	.setTitle('Now playing:')
	.setDescription('**${serverQueue.songs[0].title}**')
	.setTimestamp()
		const npnosong
	.setColor('#7289da')
	.setTitle('Now playing:')
	.setDescription('Nothing is playing! Run !play (song) to start!')
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return channel.send(npnosong);
		return message.channel.send(npsongplaying);
	
	}
};
