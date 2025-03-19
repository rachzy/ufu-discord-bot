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

const commands = require("../handlers/commands") as CommandHandler;

const interactionsDirectory = join(__dirname, "./specials/interactions");
const interactionFiles = readdirSync(interactionsDirectory).filter((file) =>
  file.endsWith(".js")
);
const clientInteractions = interactionFiles.map(
  (file) => require(join(interactionsDirectory, file)) as ClientInteraction
);

const interactionCreateEvent: Event = {
  event: Events.InteractionCreate,
  execute: async (interaction: Interaction) => {
    // Command handler
    if (interaction.isCommand()) {
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
};

module.exports = interactionCreateEvent;
