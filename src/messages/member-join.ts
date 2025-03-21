import { GuildMember } from "discord.js";
import { CallbackMessage } from "../interfaces/custom-message.interface";

export const memberJoinMessage: CallbackMessage = {
  type: "callback",
  callback: (member: GuildMember) => ({
    type: "text",
    isAutomatic: false,
    embedData: {
      title: "🎉 Novo membro!",
      description: `Seja bem-vindo ao servidor no Discord do subreddit da UFU.\n
      Sinta-se a vontade para interagir com a comunidade e aproveite o seu tempo aqui.\n
      **Divirta-se!** 🌟`,
      author: {
        name: `${member.user.username} • ${member.user.tag}`,
        iconURL: member.user.avatarURL() || undefined,
      },
      thumbnail: {
        url: member.user.avatarURL() || "",
      },
      footer: {
        text: `ID: ${member.id}`,
      },
    },
  }),
};
