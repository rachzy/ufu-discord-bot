import {
  Client,
  ComponentType,
  EmbedData,
  RoleSelectMenuComponentData,
  StringSelectMenuComponentData,
} from "discord.js";

interface AutoMessageBase {
  channelID: string;
  embedData: EmbedData;
  amountOfMessagesRequired?: number;
}

interface TextMessage extends AutoMessageBase {
  type: "text";
}

interface StringSelectMessage extends AutoMessageBase {
  type: ComponentType.StringSelect;
  componentData: StringSelectMenuComponentData;
}

interface RoleSelectMessage extends AutoMessageBase {
  type: ComponentType.RoleSelect;
  componentData: RoleSelectMenuComponentData;
}

interface CallbackAutoMessage {
  type: "callback";
  callback: (
    client: Client<true>
  ) => Promise<PlainAutoMessage> | PlainAutoMessage;
}

type PlainAutoMessage = TextMessage | StringSelectMessage | RoleSelectMessage;
export type AutoMessage = PlainAutoMessage | CallbackAutoMessage;
