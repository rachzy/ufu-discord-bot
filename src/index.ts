// Libs
import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { EventHandler } from "./interfaces/event.interface";

// Event handler
const events = require("./handlers/events") as EventHandler;

// Setup env
dotenv.config();

// Env
const { DISCORD_TOKEN } = process.env;
if (!DISCORD_TOKEN) {
  throw new Error("Discord Token wasn't provided");
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

events.register(client);

client.login(DISCORD_TOKEN);
