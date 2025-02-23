import { AutoMessage } from "../../../interfaces/auto-message";

import { guild } from "../../../../config.json";

module.exports = {
  channelID: guild.channels.rules,
  type: "embed",
  data: {
    title: "Regras da Comunidade",
    description: `Todo membro, ao entrar no servidor, é convidado a ler as regras.
    \nAssim como o Código Penal, você não é obrigado a lê-las integralmente, mas o desconhecimento de uma regra não abonará sua punição
    \nPor isso, pedimos aos membros que atentem-se às regras do servidor para evitar eventuais problemas`,
    fields: [
      {
        name: "Respeito em Primeiro Lugar",
        value: `Trate todos com respeito. Ofensas, preconceito, discurso de ódio ou assédio não serão tolerados. 
        \nDiscussões saudáveis são bem-vindas, mas evite conflitos e provocações desnecessárias.`,
      },
      {
        name: "Conteúdo Apropriado",
        value: `Nada de conteúdos impróprios (NSFW), ilegais ou sensíveis.`,
      },
      {
        name: "Spam/Flood",
        value: `Evite mensagens de spam ou flood (mensagens repetitivas e sem propósito).`,
      },
      {
        name: "Divulgação e Anúncios",
        value: `Divulgação de eventos, pesquisas e materiais acadêmicos é permitida, mas apenas nos canais apropriados.`,
      },
      {
        name: "Segurança e Privacidade",
        value: `Não compartilhe informações pessoais ou conteúdo sensível seu ou de terceiros.`,
      },
      {
        name: "Boa conduta",
        value: `Trolagens e brincadeiras excessivas que prejudiquem outros membros serão punidas.`,
      },
      {
        name: "Integridade de Perfil",
        value: `Não altere seu perfil de forma que possa vir a enganar outros membros (perfis fakes). 
        \nNão há problema em contas paródias, contanto que deixe explícito`,
      },
      {
        name: "Boa fé e bom senso",
        value: `A moderação pode punir membros por motivos que não foram citados em alguma das regras acima, a depender da situação, baseado na pauta de boa fé. 
        \nÉ simples, comporte-se como um ser humano apto para viver em sociedade.`,
      },
    ],
  },
} as AutoMessage;
