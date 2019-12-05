const Discord = require('discord.js')
const fetch = require("node-fetch");

const client = new Discord.Client();

const token = 'NjUyMjQxMTUwMTk1MDA3NDg4.XelxJA.ewHn0mtSw59xFIJ-CGnG2h66WUc';

const getWeather = async () => {
  try {
    const res = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Athens,gr&APPID=eb789f77e1b5c4e30e37994f87afa668');
    const data = await res.json();
    console.log(data);
    return `The weather in Athens is ${data.weather[0].description} and the temperature is ${(data.main.temp - 272.15).toFixed(2)} °C`
  } catch {
    return 'Sorry, I cannot find the weather right now... Gamiesai...'
  }
}

client.login(token);

client.on('ready', ()=>{
  console.log('I am ready!')
})

client.on('message', (msg) => {
  if(msg.author.username !== 'PowderBot') {
    switch(msg.toString()) {
      case 'weather':
        getWeather().then(response => msg.reply(response))
      default:
        msg.reply('gamiesai');
    }
  }
})
