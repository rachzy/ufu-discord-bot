import { Interaction } from "discord.js";

export type CLIENT_INTERACTION_IDS = "campus-select";

export interface ClientInteraction {
  id: CLIENT_INTERACTION_IDS;
  callback: (interaction: Interaction) => Promise<void> | void;
}
