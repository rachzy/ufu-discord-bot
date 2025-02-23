import { EmbedData } from "discord.js";

export interface AutoMessage {
  channelID: string;
  type: "embed";
  data: EmbedData;
}
