import { Client, EmbedBuilder, EmbedData } from "discord.js";
import { DANGER_RED, DARK_BLUE, SUCCESS_GREEN } from "../constants/colors";

const FALLBACK_THUMBNAIL =
  "https://cdn.discordapp.com/app-icons/1342684505432916008/b6837e558d2c678715023f546d2d4667.png?size=256";

export function buildEmbedMessage(
  client: Client<true>,
  data: EmbedData
): EmbedBuilder {
  const embedData: EmbedData = {
    author: {
      name: "r/UFU | Mensagem Automática",
    },
    color: DARK_BLUE, // Dark blue
    thumbnail: {
      url: client.user.avatarURL() ?? FALLBACK_THUMBNAIL,
    },
    footer: {
      text: "UFU | Um bem comunitário a serviço do Brasil",
      iconURL: client.user.avatarURL() || undefined,
    },
    ...data,
  };
  const embedMessage = new EmbedBuilder(embedData);
  return embedMessage;
}

export function buildErrorMessage(
  client: Client<true>,
  data: { title: string; description: string }
): EmbedBuilder {
  const { title, ...remainingData } = data;
  return buildEmbedMessage(client, {
    color: DANGER_RED,
    author: {
      name: "r/UFU | Erro",
    },
    title: `❌ ${data.title}`,
    ...remainingData,
  });
}

export function buildSuccessMessage(
  client: Client<true>,
  data: { title: string; description: string }
): EmbedBuilder {
  const { title, ...remainingData } = data;
  return buildEmbedMessage(client, {
    color: SUCCESS_GREEN,
    author: {
      name: "r/UFU | Sucesso",
    },
    title: `✅ ${data.title}`,
    ...remainingData,
  });
}
