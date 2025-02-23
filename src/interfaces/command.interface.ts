import { CommandInteraction, REST, SlashCommandBuilder } from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => void | Promise<void>;
}

export interface CommandHandler {
  register: (rest: REST, clientID: string, guildID: string) => Promise<void>;
  get: (commandName: string) => Command | undefined;
}
