import { Client, Events } from "discord.js";
import { Event, SpecialEvent } from "../interfaces/event.interface";
import { CommandHandler } from "../interfaces/command.interface";

import { guild } from "../../config.json";

const commands = require("../handlers/commands") as CommandHandler;
const automessages = require("./specials/automessages") as SpecialEvent;

module.exports = {
  event: Events.ClientReady,
  execute: async (client: Client<true>) => {
    console.log(`Logged in as ${client.user.tag}`);

    try {
      await commands.register(client.rest, client.application.id, guild.id);
      await automessages.execute(client);
    } catch (error) {
      console.error(error);
    }
  },
} as Event;
