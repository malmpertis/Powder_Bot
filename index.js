const { Client } = require('discord.js')
const fetch = require("node-fetch");
require('dotenv').config();

const client = new Client({
  disableEveryone: true
});

client.on('ready', ()=>{
  console.log(`Bot ${client.user.username} is ready!`)
  client.user.setPresence({
    status: 'online',
    game: {
      name: 'Chillin n Killin',
      type: 'WATCHING'
    }
  })
})

client.on('message', async (msg) => {
  if(msg.author.username !== 'PowderBot') {
    switch(msg.toString()) {
      case 'weather':
        const response = await getWeather();
        return msg.reply(response);
      default:
        msg.reply('gamiesai');
    }
  }
})

client.login(process.env.DISCORD_BOT_TOKEN);

const getWeather = async () => {
  try {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Athens,gr&APPID=${process.env.OPENWEATHER_TOKEN}`);
    const data = await res.json();
    console.log(data);
    return `The weather in Athens is ${data.weather[0].description} and the temperature is ${(data.main.temp - 272.15).toFixed(2)} °C`
  } catch {
    return 'Sorry, I cannot find the weather right now... Gamiesai...'
  }
}