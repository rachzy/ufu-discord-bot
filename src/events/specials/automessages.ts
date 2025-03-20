import {
  ActionRowBuilder,
  ActionRowComponentData,
  APIActionRowComponentTypes,
  Client,
  ComponentType,
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
import { buildEmbedMessage } from "../../helpers/buildEmbedMessage";

const MENU_BUILDERS = {
  [ComponentType.StringSelect]: StringSelectMenuBuilder,
  [ComponentType.RoleSelect]: RoleSelectMenuBuilder,
} as const;

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
