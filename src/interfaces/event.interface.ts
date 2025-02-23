import { ClientEvents } from "discord.js";

export interface Event {
  event: keyof ClientEvents;
  register: (...args: any[]) => void;
}

export interface EventHandler {
  register: (client: any) => void;
}
