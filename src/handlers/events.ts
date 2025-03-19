// Libs
import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Event, EventHandler } from "../interfaces/event.interface";

const foldersPath = join(__dirname, "../events");
const eventFiles = readdirSync(foldersPath).filter((file) =>
  file.endsWith(".js")
); // Read files will be compiled to .js

const events = eventFiles.map(
  (eventFile) => require(join(foldersPath, eventFile)) as Event
);

module.exports = {
  register: async (client: Client<true>) => {
    events.forEach((event) => {
      client.on(event.event, (...args) => event.execute(...args))
    });
  },
} as EventHandler;
