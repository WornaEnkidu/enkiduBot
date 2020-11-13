module.exports = {
    name: 'name',
    description: 'Set bot name!',
    async execute(message) {
        const args = message.content.split(" ");
        username = args[1]+" | ENKIDU";
        message.client.user.setUsername(username)
            .then(() => {
                message.channel.send({embed: {
                        color: 10038562,
                        description : `My new username is ${user.username}`
                    }
                })
                .then(msg => {
                    msg.delete({timeout: 5000});
                });
            })
            .catch(() => {
                message.channel.send({embed: {
                        color: 10038562,
                        description : `Can't set ***${username}*** username`
                    }
                })
                    .then(msg => {
                        msg.delete({timeout: 5000});
                    });
            });
    },
};