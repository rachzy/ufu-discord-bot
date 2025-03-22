import { CustomMessage } from "../interfaces/custom-message.interface";

import { guild } from "../../config.json";
import { ComponentType } from "discord.js";

module.exports = {
  isAutomatic: true,
  channelID: guild.channels.roles,
  amountOfMessagesRequired: 1,
  type: ComponentType.StringSelect,
  embedData: {
    title: "🎓 Faculdade / Instituto",
    description: "Selecione a instituição a qual seu curso faz parte",
  },
  componentData: {
    customId: "institution-select-1",
    type: ComponentType.StringSelect,
    placeholder: "Sua faculdade / instituto começa com que letra?",
    options: [
      {
        label: "F [Faculdade] - Ex: FACOM, FAGEN, FADIR, etc.",
        value: "F",
      },
      {
        label: "I [Instituo] - Ex: IARTE, INBIO, IME, etc.",
        value: "I",
      },
    ],
  },
} as CustomMessage;
