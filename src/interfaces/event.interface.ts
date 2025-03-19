import { Client, ClientEvents } from "discord.js";

export interface Event {
  event: keyof ClientEvents;
  execute: (...args: any[]) => void;
}

export interface SpecialEvent {
  execute: (client: Client<true>) => Promise<void> | void;
}

export interface EventHandler {
  register: (client: any) => void;
}
