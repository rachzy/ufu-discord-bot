import { AutoMessage } from "../../../interfaces/automessage.interface";

import { guild } from "../../../../config.json";
import { ComponentType } from "discord.js";

module.exports = {
  type: "callback",
  callback: async (client) => {
    const roles = await client.guilds.cache.get(guild.id)?.roles.fetch();
    const instituteRoles = roles?.filter((role) => role.name.includes("[F]"));

    return {
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
} as AutoMessage;
