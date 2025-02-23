// Libs
import { Client } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { Event, EventHandler } from "../interfaces/event.interface";

const events: Event[] = [];

const foldersPath = path.join(__dirname, "../events");
const eventFiles = fs
  .readdirSync(foldersPath)
  .filter((file) => file.endsWith(".js")); // Read files will be compiled to .js

eventFiles.forEach((file) => {
  const filePath = path.join(foldersPath, file);
  const event: Event = require(filePath);
  events.push(event);
});

module.exports = {
  register: async (client: Client<true>) => {
    events.forEach((event) => {
      client.on(event.event, event.register.bind(this, client));
    });
  },
} as EventHandler;
