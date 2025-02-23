import { Client, Events } from "discord.js";
import { Event } from "../interfaces/event.interface";
import { CommandHandler } from "../interfaces/command.interface";

import { guild } from "../../config.json";

const commands = require("../handlers/commands") as CommandHandler;

const clientReadyEvent: Event = {
  event: Events.ClientReady,
  register: async (client: Client<true>) => {
    console.log(`Logged in as ${client.user.tag}`);

    try {
      await commands.register(client.rest, client.application.id, guild.id);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = clientReadyEvent;
