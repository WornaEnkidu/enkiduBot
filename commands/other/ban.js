
module.exports = {
	name: 'ban',
	description: 'Ban a player',
	async execute(message, client) {
		member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply('You need to mention the member you want to ban him');
		}

		/*if (!message.member.hasPermission("MANAGE\_MEMBERS")) {
			return message.reply('I can\'t ban this user.');
		}*/

		return message.guild.members.ban(member)
			.then(() =>  {
				banChannel = client.channels.cache.find(channel => channel.name === "ban");
				banChannel.send(`\`\`\`diff\n- - - -[Ban]- - - -\n\`\`\`\n${member.user} was banned by ${message.author}`);
			})
			.catch(error => message.reply(`Sorry, an error occured.${error.toString()}.`));
	},
};