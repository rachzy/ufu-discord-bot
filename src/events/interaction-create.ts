import {
  Client,
  Events,
  Interaction,
  InteractionType,
  MessageFlags,
} from "discord.js";
import { Event } from "../interfaces/event.interface";
import { CommandHandler } from "../interfaces/command.interface";

import { join } from "path";
import { readdirSync } from "fs";
import { ClientInteraction } from "../interfaces/interaction.interface";

import config from "../../config.json";
import { buildErrorMessage } from "../helpers/build-embed-message";

const commands = require("../handlers/commands") as CommandHandler;

const interactionsDirectory = join(__dirname, "./specials/interactions");
const interactionFiles = readdirSync(interactionsDirectory).filter((file) =>
  file.endsWith(".js")
);
const clientInteractions = interactionFiles.map(
  (file) => require(join(interactionsDirectory, file)) as ClientInteraction
);

function createEmbedErrorMessage(client: Client<true>, description: string) {
  return buildErrorMessage(client, {
    title: "Erro ao executar o comando!",
    description,
  });
}

module.exports = {
  event: Events.InteractionCreate,
  execute: async (interaction: Interaction) => {
    // Command handler
    if (interaction.isCommand()) {
      try {
        const { channelId } = interaction;
        if (channelId !== config.guild.channels.commands) {
          const errorMessage = createEmbedErrorMessage(
            interaction.client,
            `Comandos só podem ser executados no canal <#${config.guild.channels.commands}>.`
          );
          return interaction.reply({
            embeds: [errorMessage],
            flags: [MessageFlags.Ephemeral],
          });
        }

        await commands.get(interaction.commandName)?.execute(interaction);
      } catch (error) {
        console.error(error);

        const errorMessage = createEmbedErrorMessage(
          interaction.client,
          "Por favor, tente novamente mais tarde."
        );

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            embeds: [errorMessage],
            flags: [MessageFlags.Ephemeral],
          });
        } else {
          await interaction.reply({
            embeds: [errorMessage],
            flags: [MessageFlags.Ephemeral],
          });
        }
      }
      return;
    }

    // Client interactions handler
    if (interaction.type === InteractionType.MessageComponent) {
      const targetInteraction = clientInteractions.find(
        (clientInteraction) => clientInteraction.id === interaction.customId
      );

      if (!targetInteraction) return;
      await targetInteraction.callback(interaction);
    }
  },
} as Event;
