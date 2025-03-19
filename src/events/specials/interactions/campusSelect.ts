import { StringSelectMenuInteraction } from "discord.js";
import { ClientInteraction } from "../../../interfaces/interaction.interface";

module.exports = {
  id: "campus-select",
  callback: (interaction: StringSelectMenuInteraction) => {
    console.log(interaction.values);
  },
} as ClientInteraction;
