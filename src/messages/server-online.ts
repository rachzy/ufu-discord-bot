import { CustomMessage } from "../interfaces/custom-message.interface";

import { guild } from "../../config.json";

module.exports = {
  isAutomatic: true,
  type: "text",
  channelID: guild.channels.announcements,
  embedData: {
    title: "👋 Hello, World!",
    description: `Eu sou o **BOT** da comunidade, e gostaria de anunciar que:
    O Servidor do r/UFU no Discord está oficialmente **online**!\n
    Sinta-se a vontade para convidar novos membros que façam ou não parte da Universidade. A partir de hoje, estaremos divulgando o link de convite do servidor de forma mais ampla no Subreddit\n
    Agradecemos a todos que já estavam no servidor e a todos os que estão se juntando agora! 🌟\n
    Atenciosamente,
    A moderação.`,
  },
} as CustomMessage;
