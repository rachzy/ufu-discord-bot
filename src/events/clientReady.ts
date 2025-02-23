import { Client, Events } from "discord.js";
import { Event, SpecialEvent } from "../interfaces/event.interface";
import { CommandHandler } from "../interfaces/command.interface";

import { guild } from "../../config.json";

const commands = require("../handlers/commands") as CommandHandler;
const automessages = require("./specials/automessages") as SpecialEvent;

const clientReadyEvent: Event = {
  event: Events.ClientReady,
  register: async (client: Client<true>) => {
    console.log(`Logged in as ${client.user.tag}`);

    try {
      await commands.register(client.rest, client.application.id, guild.id);
      await automessages.execute(client);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = clientReadyEvent;
