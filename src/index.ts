// Libs
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Interaction,
  MessageFlags,
  REST,
  Routes,
} from "discord.js";
import * as dotenv from "dotenv";

import commands from "./commands";
import { Command } from "./interfaces/command";

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

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = await rest.get(
    Routes.applicationGuildCommand(CLIENT_ID, GUILD_ID, interaction.commandId)
  );

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await commands.get(interaction.commandName)?.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: [MessageFlags.Ephemeral],
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: [MessageFlags.Ephemeral],
      });
    }
  }
});

client.login(DISCORD_TOKEN);
