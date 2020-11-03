const Discord = require("discord.js");
const client = new Discord.Client();
const configs = require("./configs.json");
const fivereborn = require('fivereborn-query');
client.config = configs;

client.login(configs.token)
  .then(
    () => {
      console.log("BOT MENYALA!");
      console.log("MEMBACA DATA, MOHON TUNGGU");
    },
    () => {
      client.destroy();
      console.log("BOT MATI!");
    });

function activity() {
  setTimeout(() => {
    fivereborn.query(configs.serverInfo[0], configs.serverInfo[1], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        client.user.setActivity(data.clients + " Players ", { type: configs.activityType });
      }
    });
    activity();
  }, 5000);
}
activity();