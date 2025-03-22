import { CustomMessage } from "../interfaces/custom-message.interface";

import { guild } from "../../config.json";
import { Client, ComponentType } from "discord.js";

module.exports = {
  type: "callback",
  callback: async (client: Client<true>) => {
    const roles = await client.guilds.cache.get(guild.id)?.roles.fetch();
    const campusRoles = roles?.filter((role) => role.name.includes("[C]"));

    return {
      isAutomatic: true,
      channelID: guild.channels.roles,
      type: ComponentType.StringSelect,
      embedData: {
        title: "🌳 Campus",
        description: "Selecione seu campus",
      },
      componentData: {
        customId: "campus-select",
        type: ComponentType.StringSelect,
        placeholder: "Selecione seu campus",
        options: campusRoles?.map((role) => ({
          label: role.name,
          value: role.id,
        })),
      },
    };
  },
} as CustomMessage;
