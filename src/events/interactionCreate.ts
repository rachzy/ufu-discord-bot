import { Client, Events, Interaction, MessageFlags } from "discord.js";
import { Event } from "../interfaces/event.interface";
import { CommandHandler } from "../interfaces/command.interface";

const commands = require("../handlers/commands") as CommandHandler;

const interactionCreateEvent: Event = {
  event: Events.InteractionCreate,
  register: async (client: Client<true>) => {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!interaction.isCommand()) return;

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
  },
};

module.exports = interactionCreateEvent;
