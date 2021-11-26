const client = require("../index")

client.on("warn", (info) => console.log(info));
