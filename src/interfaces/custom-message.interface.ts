import {
  Client,
  ComponentType,
  EmbedData,
  RoleSelectMenuComponentData,
  StringSelectMenuComponentData,
} from "discord.js";

type MessageBase =
  | {
      embedData: EmbedData;
      isAutomatic: false;
    }
  | {
      embedData: EmbedData;
      channelID: string;
      amountOfMessagesRequired?: number;
      isAutomatic: true;
    };

type TextMessage = MessageBase & {
  type: "text";
};

type StringSelectMessage = MessageBase & {
  type: ComponentType.StringSelect;
  componentData: StringSelectMenuComponentData;
};

type RoleSelectMessage = MessageBase & {
  type: ComponentType.RoleSelect;
  componentData: RoleSelectMenuComponentData;
};

export type CallbackMessage = {
  type: "callback";
  callback: (...args: any[]) => Promise<PlainMessage> | PlainMessage;
};

type PlainMessage = TextMessage | StringSelectMessage | RoleSelectMessage;
export type CustomMessage = PlainMessage | CallbackMessage;
