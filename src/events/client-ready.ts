import { Client, Events } from "discord.js";
import { Event, SpecialEvent } from "../interfaces/event.interface";
import { CommandHandler } from "../interfaces/command.interface";

import { guild } from "../../config.json";
import { ACTIVITIES } from "../constants/activities";

const commands = require("../handlers/commands") as CommandHandler;
const automessages = require("./specials/automessages") as SpecialEvent;

const DELAY_IN_SECONDS_FOR_SWITCHING_ACTIVITY = 10;

module.exports = {
  event: Events.ClientReady,
  execute: async (client: Client<true>) => {
    console.log(`Logged in as ${client.user.tag}`);

    let currentActivity = 0;

    setInterval(() => {
      client.user.setActivity(ACTIVITIES[currentActivity].value, {
        type: ACTIVITIES[currentActivity].type,
      });

      currentActivity = (currentActivity + 1) % ACTIVITIES.length;
    }, DELAY_IN_SECONDS_FOR_SWITCHING_ACTIVITY * 1000);

    try {
      await commands.register(client.rest, client.application.id, guild.id);
      await automessages.execute(client);
    } catch (error) {
      console.error(error);
    }
  },
} as Event;
