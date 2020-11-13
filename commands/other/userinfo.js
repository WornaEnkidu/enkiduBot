
module.exports = {
	name: 'userinfo',
	description: 'Get information about a user.',
	async execute(message,client) {
		member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
		listeRole = member._roles;
		roles = [];
		listeRole.forEach(role => roles.push(message.guild.roles.cache.get(role).name));
		roles.sort();

            message.channel.send(`Name: ${member.user}\nID: ${member.id}\nAvatar: ${member.user.avatar}\nRoles: ${roles.toString()}\nJoin date: ${member.joinedTimestamp}`);
		message.delete();
	},
};