import {
  CommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "../interfaces/command.interface";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Verifica a latência do bot."),
  execute: async (interaction: CommandInteraction) => {
    const startTime = Date.now();
    await interaction.deferReply({
      flags: [MessageFlags.Ephemeral],
    });
    await interaction.editReply(`Pong! \n*${Date.now() - startTime}ms*`);
  },
};

module.exports = command;
