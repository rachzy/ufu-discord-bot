// Libs
import { REST, Routes } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { Command, CommandHandler } from "../interfaces/command.interface";

const commands: Command[] = [];

const foldersPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(foldersPath)
  .filter((file) => file.endsWith(".js")); // Read files will be compiled to .js

commandFiles.forEach((file) => {
  const filePath = path.join(foldersPath, file);
  const command: Command = require(filePath);
  commands.push(command);
});

module.exports = {
  register: async (rest: REST, clientID: string, guildID: string) => {
    console.log("Registering slash commands...");

    const body = commands.map((command) => command.data.toJSON());
    await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
      body,
    });

    console.log("Slash commands registered!");
  },
  get: (commandName: string): Command | undefined => {
    return commands.find((command) => command.data.name === commandName);
  },
} as CommandHandler;
