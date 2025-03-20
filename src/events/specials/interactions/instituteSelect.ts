import {
  GuildMemberRoleManager,
  MessageFlags,
  StringSelectMenuInteraction,
} from "discord.js";
import { ClientInteraction } from "../../../interfaces/interaction.interface";

import config from "../../../../config.json";
import {
  buildErrorMessage,
  buildSuccessMessage,
} from "../../../helpers/build-embed-message";

module.exports = {
  id: "institute-select",
  callback: async (interaction: StringSelectMenuInteraction) => {
    const { client, member, guild } = interaction;
    if (!member) return;

    const { roles } = member;

    if (roles instanceof GuildMemberRoleManager) {
      const studentRoleID = config.guild.roles.student;
      const memberHasStudentRole = roles.cache.some(
        (role) => role.id === studentRoleID
      );

      if (!memberHasStudentRole) {
        const errorMessage = buildErrorMessage(client, {
          title: "Esse cargo é exclusivo para estudantes",
          description:
            "Caso você seja um estudante universitário, altere seu cargo no onboarding.",
        });
        interaction.reply({
          embeds: [errorMessage],
          flags: [MessageFlags.Ephemeral],
        });
        return;
      }

      try {
        const selectedRoleID = interaction.values[0];
        const memberAlreadyHasSelectedRole = roles.cache.some(
          (role) => role.id === selectedRoleID
        );

        if (memberAlreadyHasSelectedRole) {
          const errorMessage = buildErrorMessage(client, {
            title: "Você já possui esse cargo",
            description: "Você não pode selecionar o mesmo cargo duas vezes.",
          });
          interaction.reply({
            embeds: [errorMessage],
            flags: [MessageFlags.Ephemeral],
          });
          return;
        }

        const relatedRoles = roles.cache.filter((role) =>
          role.name.includes("[F]")
        );
        relatedRoles.forEach((role) => roles.remove(role));

        const selectedRole = guild?.roles.cache.find(
          (role) => role.id === selectedRoleID
        );
        if (!selectedRole) return;

        await roles.add(selectedRole);

        const removedRelatedRolesMessage = `Ah, retirei o seu cargo **${relatedRoles
          .map((r) => r.name)
          .join(", ")}**, devido a equivalência.`;

        const successMessage = buildSuccessMessage(client, {
          title: "Cargo adicionado!",
          description: `Você agora tem o cargo **${selectedRole.name}.**
          ${relatedRoles.size > 0 ? removedRelatedRolesMessage : ""}`,
        });

        interaction.reply({
          embeds: [successMessage],
          flags: [MessageFlags.Ephemeral],
        });
      } catch (err) {
        console.error(err);
        const errorMessage = buildErrorMessage(client, {
          title: "Ocorreu um erro ao adicionar o cargo",
          description: "Por favor, tente novamente mais tarde.",
        });
        interaction.reply({
          embeds: [errorMessage],
          flags: [MessageFlags.Ephemeral],
        });
      }
    }
  },
} as ClientInteraction;
