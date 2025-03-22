import {
  ActionRowBuilder,
  ComponentType,
  MessageFlags,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { ClientInteraction } from "../../../interfaces/interaction.interface";

import { buildEmbedMessage } from "../../../helpers/build-embed-message";
import { InstitutionType } from "../../../interfaces/institution.interface";
import { CallbackMessage } from "../../../interfaces/custom-message.interface";
import { facultySelectMessage } from "../../../messages/faculty-select";
import { instituteSelectMessage } from "../../../messages/institute-select";

module.exports = {
  id: "institution-select-1",
  callback: async (interaction: StringSelectMenuInteraction) => {
    const { client, values } = interaction;
    const institutionType = values[0] as InstitutionType;

    const messages: Record<string, CallbackMessage> = {
      F: facultySelectMessage,
      I: instituteSelectMessage,
    };

    const message = messages[institutionType];
    const messageData = await message.callback(client);

    const embedMessage = buildEmbedMessage(client, messageData.embedData);

    if (messageData.type !== ComponentType.StringSelect) return;

    const components = new StringSelectMenuBuilder(messageData.componentData);

    const actionRow =
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(components);

    interaction.reply({
      embeds: [embedMessage],
      components: [actionRow],
      flags: [MessageFlags.Ephemeral],
    });
  },
} as ClientInteraction;
