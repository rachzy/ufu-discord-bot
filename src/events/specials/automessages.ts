import {
  ActionRowBuilder,
  ActionRowComponentData,
  APIActionRowComponentTypes,
  Client,
  ComponentType,
  EmbedBuilder,
  EmbedData,
  JSONEncodable,
  RoleSelectMenuBuilder,
  SelectMenuBuilder,
  StringSelectMenuBuilder,
  TextChannel,
} from "discord.js";
import { SpecialEvent } from "../../interfaces/event.interface";
import { AutoMessage } from "../../interfaces/automessage.interface";

import * as path from "path";
import * as fs from "fs";

const FALLBACK_THUMBNAIL =
  "https://cdn.discordapp.com/app-icons/1342684505432916008/b6837e558d2c678715023f546d2d4667.png?size=256";

const MENU_BUILDERS = {
  [ComponentType.StringSelect]: StringSelectMenuBuilder,
  [ComponentType.RoleSelect]: RoleSelectMenuBuilder,
} as const;

function buildEmbedMessage(
  client: Client<true>,
  data: EmbedData
): EmbedBuilder {
  const embedData: EmbedData = {
    author: {
      name: "r/UFU | Mensagem Automática",
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
      let message: AutoMessage = require(filePath);

      if (message.type === "callback") {
        message = await message.callback(client);
      }

      const channel = client.channels.cache.get(
        message.channelID
      ) as TextChannel;
      if (!channel || !channel.isTextBased() || !channel.isSendable()) return;

      const messageCollections = await channel.messages.fetch({
        limit: message.amountOfMessagesRequired ?? 1,
      });
      if (messageCollections.size > (message.amountOfMessagesRequired ?? 0))
        return; // Already sent

      const embedMessage = buildEmbedMessage(client, message.embedData);

      if (message.type === "text") {
        channel.send({ embeds: [embedMessage] });
        return;
      }

      const components: (
        | JSONEncodable<APIActionRowComponentTypes>
        | ActionRowComponentData
      )[] = [];

      const component = new MENU_BUILDERS[message.type](
        message.componentData as any // Make ts happy :D
      );
      components.push(component);

      const row = new ActionRowBuilder<SelectMenuBuilder>({
        components,
        type: ComponentType.ActionRow,
      });

      channel.send({
        embeds: [embedMessage],
        components: [row],
      });
    });
  },
};

module.exports = autoMessageEvent;
