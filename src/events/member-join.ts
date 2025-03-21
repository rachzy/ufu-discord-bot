import { Events, GuildMember } from "discord.js";
import { Event } from "../interfaces/event.interface";

import config from "../../config.json";
import { buildEmbedMessage } from "../helpers/build-embed-message";
import { memberJoinMessage } from "../messages/member-join";

module.exports = {
  event: Events.GuildMemberAdd,
  execute: async (member: GuildMember) => {
    const guild = member.guild;
    const channel = guild.channels.cache.get(config.guild.channels.welcome);

    if (!channel) return;
    if (!channel.isTextBased()) return;
    if (!channel.isSendable()) return;

    const { embedData } = await memberJoinMessage.callback(member);
    const welcomeMessage = buildEmbedMessage(member.client, embedData);

    channel.send({
      content: `<@${member.id}>`,
      embeds: [welcomeMessage],
    });
  },
} as Event;
