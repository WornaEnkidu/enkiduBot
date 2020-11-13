
module.exports = {
	name: 'game',
	description: 'Add a game to server',
	async execute(message) {
		const args = message.content.split(" ");
		name=args[1];
		try {
			if(isNaN(name)){
				category = await message.guild.channels
					.create(name, {
						type: 'category'
					});
				message.guild.channels
					.create('Create new channel',{
						type:'voice',
						parent: category.id
					})
					.then((channel)=>{})
				message.channel.send(`Game **`+name+'** has been added');
			}else
			{
				throw "The name can't be a number";
			}
		}
		catch (e) {
			message.channel.send(e.toString());
		}



	},
};
