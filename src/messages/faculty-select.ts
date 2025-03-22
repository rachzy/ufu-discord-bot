import { CallbackMessage } from "../interfaces/custom-message.interface";

import { guild } from "../../config.json";
import { Client, ComponentType } from "discord.js";

export const facultySelectMessage: CallbackMessage = {
  type: "callback",
  callback: async (client: Client<true>) => {
    const roles = await client.guilds.cache.get(guild.id)?.roles.fetch();
    const facultyRoles = roles?.filter((role) => role.name.includes("[F] | F"));

    return {
      isAutomatic: false,
      type: ComponentType.StringSelect,
      embedData: {
        title: "🎓 Faculdade",
        description: "Selecione a faculdade a qual seu curso faz parte",
      },
      componentData: {
        customId: "institution-select-2",
        type: ComponentType.StringSelect,
        placeholder: "Ex: FACOM, FAGEN, FADIR, etc....",
        options:
          facultyRoles?.map((role) => ({
            label: role.name,
            value: role.id,
          })) ?? [],
      },
    };
  },
};
