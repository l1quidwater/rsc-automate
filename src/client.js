const Discord = require('discord.js-selfbot-v13');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const client = new Discord.Client();

const configPath = path.resolve(__dirname, '../config.json'); // path - load the config file for token, webhook, channel id
const data = JSON.parse(fs.readFileSync(configPath));

const messageFilePath = path.resolve(__dirname, '../message.txt'); //path - load the message to send
const message = fs.readFileSync(messageFilePath, 'utf8').trim();

if (!message) {
    console.error('Message file is empty.');
    process.exit(1);
}

execSync('python ./log.py "Client Boot" "I am now alive."'); // execute log.py to send webhook

client.once('ready', () => {
    console.log('Bot is ready!');
    setInterval(sendMessage, data.time_period);
});

async function sendMessage() {
    const channelId = "1224623333740511262"; // change the id to the hiring if u need (hiring is 652584973278380032, for-hire is 728187027467796571) 

    try {
        const channel = await client.channels.fetch(channelId);
        if (!channel) throw new Error('Channel not found.');

        channel.send(message)
            .then(message => {
                execSync(`python ./log.py "Sent a message" "New message sent in RSC: ${message.url}"`);
            })
            .catch(error => console.error('Error sending message:', error));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

client.login(data.token);
