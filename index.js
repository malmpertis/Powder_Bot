const Discord = require('discord.js')
const client = new Discord.Client();

const token = 'NjUyMjQxMTUwMTk1MDA3NDg4.Xelqyw.zdPgcY5LmeMpDe5VLUOV9wNYUa4';
client.login(token);

client.on('ready', ()=>{
  console.log('I am ready!')
})

client.on('message', (msg) => {
  if(msg.author.username!=="PowderBot") {
    if(msg.content === "ti kaneis?") {
      console.log('gamw')
      return msg.reply("gamw ton adriko");
    } else {
      console.log('gamietai')
      return msg.reply("O adrikos gamietai!");
    }
  }
})
