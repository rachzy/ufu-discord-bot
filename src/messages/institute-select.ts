import { CustomMessage } from "../interfaces/custom-message.interface";

import { guild } from "../../config.json";
import { Client, ComponentType } from "discord.js";

module.exports = {
  type: "callback",
  callback: async (client: Client<true>) => {
    const roles = await client.guilds.cache.get(guild.id)?.roles.fetch();
    const instituteRoles = roles?.filter((role) => role.name.includes("[F]"));

    return {
      isAutomatic: true,
      channelID: guild.channels.roles,
      amountOfMessagesRequired: 1,
      type: ComponentType.StringSelect,
      embedData: {
        title: "Faculdade / Instituto",
        description: "Selecione a instituição a qual seu curso faz parte",
      },
      componentData: {
        customId: "institute-select",
        type: ComponentType.StringSelect,
        placeholder: "Selecione sua faculdade / instituto",
        options: instituteRoles?.map((role) => ({
          label: role.name,
          value: role.id,
        })),
      },
    };
  },
} as CustomMessage;
