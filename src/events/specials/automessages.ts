import { Client, EmbedBuilder, EmbedData, TextChannel } from "discord.js";
import { SpecialEvent } from "../../interfaces/event.interface";
import { AutoMessage } from "../../interfaces/auto-message";

import * as path from "path";
import * as fs from "fs";

const FALLBACK_THUMBNAIL =
  "https://cdn.discordapp.com/app-icons/1342684505432916008/b6837e558d2c678715023f546d2d4667.png?size=256";

function buildEmbedMessage(
  client: Client<true>,
  data: EmbedData
): EmbedBuilder {
  const embedData: EmbedData = {
    author: {
      name: "r/UFU | Mensagem Automática",
      iconURL: client.user.avatarURL() || undefined,
    },
    color: 2123412, // Dark blue
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

const autoMessageEvent: SpecialEvent = {
  execute: async (client: Client<true>) => {
    const foldersPath = path.join(__dirname, "messages");
    const messageFiles = fs
      .readdirSync(foldersPath)
      .filter((file) => file.endsWith(".js")); // Read files will be compiled to .js

    messageFiles.forEach(async (file) => {
      const filePath = path.join(foldersPath, file);
      const message: AutoMessage = require(filePath);

      const channel = client.channels.cache.get(
        message.channelID
      ) as TextChannel;
      if (!channel || !channel.isTextBased() || !channel.isSendable()) return;

      const messageCollections = await channel.messages.fetch({ limit: 1 });
      if (messageCollections.size > 0) return; // Already sent

      switch (message.type) {
        case "embed":
          const embedMessage = buildEmbedMessage(client, message.data);
          channel.send({ embeds: [embedMessage] });
          break;
        default:
          break;
      }
    });
  },
};

module.exports = autoMessageEvent;
