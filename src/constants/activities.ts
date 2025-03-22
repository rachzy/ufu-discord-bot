import { ActivityType } from "discord.js";
import { CustomActivity } from "../interfaces/activity.interface";

export const ACTIVITIES: CustomActivity[] = [
  {
    type: ActivityType.Playing,
    value: "Patrulha Canina no XBOX do DACOMP",
  },
  {
    type: ActivityType.Listening,
    value: "Lo-Fi enquanto estudo para as provas finais",
  },
  {
    type: ActivityType.Competing,
    value: "em Natal pelo JUBs 2025",
  },
  {
    type: ActivityType.Streaming,
    value: "o campeonato de CS da Saints",
  },
  {
    type: ActivityType.Watching,
    value: "alguma aula extremamente interessante sobre compiladores",
  },
];
