import { CallbackMessage } from "../interfaces/custom-message.interface";

import { guild } from "../../config.json";
import { Client, ComponentType } from "discord.js";

export const instituteSelectMessage: CallbackMessage = {
  type: "callback",
  callback: async (client: Client<true>) => {
    const roles = await client.guilds.cache.get(guild.id)?.roles.fetch();
    const instituteRoles = roles?.filter((role) =>
      role.name.includes("[F] | I")
    );

    return {
      isAutomatic: false,
      type: ComponentType.StringSelect,
      embedData: {
        title: "🎓 Instituto",
        description: "Selecione o instituto o qual seu curso faz parte",
      },
      componentData: {
        customId: "institution-select-2",
        type: ComponentType.StringSelect,
        placeholder: "Ex: IARTE, INBIO, IME, etc....",
        options:
          instituteRoles?.map((role) => ({
            label: role.name,
            value: role.id,
          })) ?? [],
      },
    };
  },
};
