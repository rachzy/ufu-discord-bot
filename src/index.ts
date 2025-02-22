// Libs
import { Client, Events, GatewayIntentBits, REST } from "discord.js";
import * as dotenv from "dotenv";

import commands from "./commands";

// Setup env
dotenv.config();

// Env
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN) {
  throw new Error("Discord Token wasn't provided");
}

if (!CLIENT_ID) {
  throw new Error("Client ID wasn't provided");
}

if (!GUILD_ID) {
  throw new Error("Guild ID wasn't provided");
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

client.on(Events.ClientReady, async (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);

  try {
    await commands.register(rest, CLIENT_ID, GUILD_ID);
  } catch (error) {
    console.error(error);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(DISCORD_TOKEN);
