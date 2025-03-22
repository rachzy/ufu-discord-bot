import { Interaction } from "discord.js";

export type CLIENT_INTERACTION_IDS =
  | "campus-select"
  | "institution-select-1"
  | "institution-select-2";

export interface ClientInteraction {
  id: CLIENT_INTERACTION_IDS;
  callback: (interaction: Interaction) => Promise<void> | void;
}
