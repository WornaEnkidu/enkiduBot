const fs = require('fs');

const Discord = require('discord.js');

const Client = require('./client/Client');

const client = new Client();
 
client.commands = new Discord.Collection();

const load = (dir = "./commands/") => {
	fs.readdirSync(dir).forEach(dirs => {

		const commands = fs.readdirSync(`${dir}${dirs}`).filter(files => files.endsWith(".js"));

		for (const file of commands) {
			const command = require(`${dir}${dirs}/${file}`);
			if (client.commands.get(command.name)) return console.warn(`${warning} Two or more commands have the same name ${command.name}.`);
			client.commands.set(command.name, command);
		}
	});
}

load();
console.log(client.commands);


client.on('ready', () => {

    console.log('I am ready!');

});

 
client.on('message', async message => {
	const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(process.env.PREFIX)) return;

	try {
		if(commandName == "unban" || commandName == "ban" || commandName == "userinfo") {
			command.execute(message, client);
		}else if(commandName == "reconnect"){
			command.execute(message, client, process.env.BOT_TOKEN);
		}
		else {
			command.execute(message);
		}
		message.delete();
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

 


client.login(process.env.BOT_TOKEN);
