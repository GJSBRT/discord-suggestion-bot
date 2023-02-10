const { Client, Events, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ] 
});

client.once(Events.ClientReady, interaction => {
	console.log(`Ready! Logged in as ${interaction.user.tag}`);
});

client.on(Events.MessageCreate, async interaction => {
	if (config.suggestionChannels.includes(interaction.channelId) && !interaction.author.bot) {
        console.log(`Suggestion from ${interaction.author.tag} in ${interaction.channelId}`)

        interaction.startThread({
            name: `${interaction.content.match(/.{1,40}/g)[0]}...`,
            autoArchiveDuration: 60,
            reason: 'New suggestion',
        });

        interaction.react('👍');
        interaction.react('👎');
    }
});

client.login(config.botToken);