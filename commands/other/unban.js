
module.exports = {
	name: 'unban',
	description: 'To do | Unban a player',
	async execute(message, client) {
		member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply('You need to mention the member you want to unban him');
		}

		/*if (!message.member.hasPermission("MANAGE\_MEMBERS")) {
			return message.reply('I can\'t ban this user.');
		}*/

		return message.guild.members.unban(member)
			.then(() =>  {
				banChannel = client.channels.cache.find(channel => channel.name === "ban");
				banChannel.send(`\`\`\`css\n- - - -[Unban]- - - -\n\`\`\`\n${member.user} was unbanned by ${message.author}`);
			})
			.catch(error => message.reply(`Sorry, an error occured.${error.toString()}.`));
	},
};