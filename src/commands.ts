// Libs
import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "ping",
    description: "Ping the bot",
  },
];

export default {
  register: async (rest: REST, clientID: string, guildID: string) => {
    console.log("Registering slash commands...");
    await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
      body: commands,
    });
    console.log("Slash commands registered!");
  },
};
