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
  const prefix = process.env.BOT_PREFIX;

  if(msg.author.bot) return;
  if(!msg.guild) return;
  if(!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log(args);
  
  switch(command) {
    case 'weather':
      const response = await getWeather(args[0]);
      return msg.reply(response);
    default:
      return msg.reply('gamiesai');
  }
})

client.login(process.env.DISCORD_BOT_TOKEN);

const getWeather = async (city) => {
  if(!city) return `Please write a city name`
  try {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&APPID=${process.env.OPENWEATHER_TOKEN}`);
    const data = await res.json();
    console.log(data);
    return `The weather in ${city} is ${data.weather[0].description} and the temperature is ${(data.main.temp - 272.15).toFixed(2)} °C`
  } catch {
    return `Sorry, I cannot find the weather for ${city} right now... Gamiesai...`
  }
}