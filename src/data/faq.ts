import type { FaqSecao } from '../types';

export const faqSections: readonly FaqSecao[] = [
  {
    title: 'Sobre o desafio e o projeto',
    questions: [
      {
        question: 'O que são o EcoMovement e o EcoGuard?',
        answer:
          'O EcoMovement é a camada de produto: missões, EcoScore, EcoPoints, ranking, árvore digital, floresta digital e badges. É a experiência que o usuário vê dentro da SoulUp. O EcoGuard é a camada de confiança: o motor de regras e antifraude que decide se uma submissão é válida, cruzando o resultado da IA com GPS, tempo, frequência e histórico do usuário.',
      },
      {
        question: 'Qual é o contexto do projeto?',
        answer:
          'O desafio faz parte de um challenge da FIAP em parceria com a SoulUp, contando como nota de avaliação prática do semestre. A SoulUp é a plataforma digital da Prospera, empresa brasileira de sustentabilidade e consumo consciente que, em 2025, adquiriu a startup SoulPrime e incorporou sua tecnologia e comunidade. O grupo escolhe um entre três temas de mesma complexidade, e todos os projetos competem entre si, com critérios definidos previamente pela banca.',
      },
      {
        question: 'Qual é o problema central que a solução resolve?',
        answer:
          'Transformar ações sustentáveis do mundo real em elementos verificáveis e pontuáveis dentro da SoulUp, sem abrir brecha para fraude, sem travar com o crescimento da base de usuários, e sem custar caro demais pra manter.',
      },
    ],
  },
  {
    title: 'Missões',
    questions: [
      {
        question: 'Como funciona o fluxo de análise de uma missão?',
        answer:
          'O fluxo segue as etapas: ação → impacto ambiental → fonte → medição → evidência → validação → risco de fraude → proteção → EcoScore → pontuação → recompensa.',
      },
      {
        question: 'O que compõe a ficha técnica de uma missão?',
        answer:
          'Cada missão tem nome e categoria, descrição da ação, impacto ambiental, fonte, unidade de medição, evidência, validação, o que a IA deve identificar, se exige GPS/QR Code, frequência permitida, riscos de fraude, proteções aplicadas e nível de dificuldade.',
      },
      {
        question: 'Quais são as missões do catálogo e quantos pontos valem?',
        answer:
          'O catálogo inclui: 20 posts com #Sustentabilidade e #EcoMovement (20 pts); 10 Moments com as mesmas hashtags (20 pts); adquirir 5/10/15 badges, de forma progressiva (10/30/50 pts); engajar em 10 perfis de ONGs seguindo e curtindo 10 posts/moments/clipz (30 pts); evoluir a árvore digital 5 vezes (50 pts); adicionar a árvore digital à floresta de uma comunidade (30 pts); e distribuir frutos na árvore de 5/10/15 usuários (20/40/60 pts).',
      },
      {
        question: 'Que tipos de evidência uma missão pode exigir?',
        answer:
          'Foto, quando a ação tem resultado visual verificável; vídeo, só quando é necessário observar uma sequência de ações (não é obrigatório em todas as missões, por custo de armazenamento e processamento); GPS, quando o local ou deslocamento faz parte da comprovação; QR Code, quando existe um local, evento ou parceiro que pode confirmar a ação, com proteção contra reutilização; e OCR, que transforma documentos como contas e comprovantes em dados estruturados.',
      },
    ],
  },
  {
    title: 'EcoScore, EcoPoints e ranking',
    questions: [
      {
        question: 'Como o EcoScore é calculado?',
        answer:
          'Cada submissão validada gera um EcoScore de 0 a 100, calculado com pesos fixos e versionados: impacto ambiental (40%), intensidade/escala da ação (20%), qualidade da evidência (20%), dificuldade da missão (10%) e consistência do usuário (10%). Um campo de versionamento acompanha cada pontuação, permitindo evoluir a fórmula no futuro sem invalidar o histórico.',
      },
      {
        question: 'O que são EcoPoints?',
        answer:
          'São a soma acumulada dos EcoScores válidos do usuário, usados para ranking, badges, níveis, desafios e metas individuais e coletivas. A conversão de EcoScore para EcoPoints é 1:1 por submissão, já que a dificuldade da ação já está embutida no próprio EcoScore.',
      },
      {
        question: 'Como o ranking funciona sem ficar lento com muitos usuários?',
        answer:
          'A leitura do ranking nunca soma o EcoScore em tempo real. Existe uma camada de agregado, atualizada por job periódico/incremental, servida por um cache em memória (como um Redis Sorted Set) em produção. O banco relacional continua sendo a fonte da verdade, mas não é consultado diretamente a cada exibição do ranking.',
      },
      {
        question: 'Como o ranking é calculado?',
        answer:
          'O ranking do usuário corresponde ao número total de pontos acumulados, somado a mais 10% desse total a cada missão concluída.',
      },
      {
        question: 'Qual é a recompensa principal e como termina a competição?',
        answer:
          'A recompensa principal é a cobertura integral da conta de energia elétrica do usuário com maior pontuação ao final do período de competição, 30 dias após seu início. O encerramento segue um processo de apuração transparente: congelamento do ranking (submissões após o corte não contam), cálculo da pontuação final por um job de agregação, aplicação de regras de desempate se necessário (número de missões concluídas, menor número de submissões rejeitadas por fraude e consistência do desempenho), confirmação do vencedor e, por fim, processamento da recompensa de forma auditável.',
      },
    ],
  },
  {
    title: 'Antifraude: EcoGuard',
    questions: [
      {
        question: 'Como o EcoGuard decide se uma submissão é válida?',
        answer:
          'O pipeline segue evidência → IA → resultados da análise → regras do sistema (EcoGuard) → decisão. A IA nunca decide sozinha: ela devolve sinais, como objeto identificado, categoria, confiança e duplicidade, que alimentam o motor de regras, que também considera GPS, horário, frequência e histórico do usuário.',
      },
      {
        question: 'Quais são as camadas de verificação do EcoGuard?',
        answer:
          'Toda submissão passa por até 6 camadas, aplicadas conforme o tipo de evidência exigido: evidência (se o material corresponde ao exigido), temporal (data, horário, intervalo mínimo, validade do QR Code), geográfica (localização e deslocamento coerentes), visual (imagens duplicadas ou manipuladas), comportamental (frequência anormal ou tentativas consecutivas) e cruzamento de dados (por exemplo, GPS + foto, ou QR Code + GPS).',
      },
      {
        question: 'O dinheiro pode comprar vantagem no ranking?',
        answer:
          'Não. Nenhum plano pago pode vender EcoPoints ou vantagem de pontuação, nem hoje, nem em planos pagos futuros. Essa regra também é reforçada a nível de permissão de sistema, não só na interface.',
      },
    ],
  },
  {
    title: 'Árvore Digital e Floresta Digital',
    questions: [
      {
        question: 'O que é a Árvore Digital?',
        answer:
          'É uma árvore que cada usuário tem, acessível no próprio perfil por um ícone minimalista verde. Ela começa morta, marrom-acinzentada e sem folhas, e evolui engajando com posts/clipz/moments com as hashtags do movimento (progride pouco), completando missões (forma mais confiável de progredir) e acumulando badges (o que mais avança o nível), até chegar a uma árvore grande, viva, cheia de folhas, frutos e, nos níveis finais, flores. Subir de nível concede badges exclusivos.',
      },
      {
        question: 'Como funcionam os frutos da árvore?',
        answer:
          'O usuário pode distribuir frutos na árvore de outros usuários, o que progride missões e rende pontos. Os frutos não são infinitos: são obtidos esperando a própria árvore produzir (no nível inicial não produz nada; subir de nível reduz o tempo de espera e, nos níveis finais, aumenta a quantidade gerada) ou recebendo de outros usuários, já que cada fruto deixado na árvore de alguém vira um fruto disponível para quem recebeu.',
      },
      {
        question: 'O que é a Floresta Digital?',
        answer:
          'É a expansão coletiva do sistema de árvores, por comunidade. Começa morta, como a árvore no início, e cresce pelo mesmo tipo de ação (engajamento, missões, badges), mas em ritmo mais lento, exigindo que vários usuários engajem simultaneamente. As árvores dos usuários ficam visíveis dentro da floresta, e o nível da árvore de cada um concede progresso a ela. Florestas no top 10 mais desenvolvidas garantem alta recompensa em pontos e badges exclusivos.',
      },
    ],
  },
  {
    title: 'Badges',
    questions: [
      {
        question: 'Como os badges funcionam?',
        answer:
          'São colecionáveis adquiridos de formas diferentes: via missões, engajamento com outros usuários e progressão da árvore/floresta. Ficam visíveis na aba "Badges" do perfil, dispostos em uma faixa estilo escoteiro, e sob cada badge aparece o percentual de usuários que já o desbloquearam e a data de aquisição.',
      },
      {
        question: 'Como funcionam os efeitos visuais de raridade dos badges?',
        answer:
          'Quanto menor o percentual de usuários que desbloquearam um badge, mais chamativo o efeito: menos de 30% recebe um leve brilho branco; menos de 15%, um brilho esverdeado um pouco mais forte; menos de 7%, um brilho azulado forte com destaque no topo da faixa; e menos de 4%, um brilho dourado forte, também com destaque no topo da faixa.',
      },
    ],
  },
  {
    title: 'Segurança e privacidade',
    questions: [
      {
        question: 'Como a segurança da aplicação é garantida?',
        answer:
          'Com validação rigorosa de entrada (tipo, tamanho e formato de arquivo, coordenadas de GPS, texto de OCR), sanitização de dados antes de qualquer persistência ou exibição, tratamento seguro de erros (sem expor stack trace, nome de tabela ou query ao usuário), proteção contra exploração de endpoints, rate limiting em rotas sensíveis e boas práticas alinhadas a riscos conhecidos de aplicações web e APIs.',
      },
      {
        question: 'Como o acesso aos dados é controlado?',
        answer:
          'A autenticação usa token com expiração e renovação controlada, reaproveitando o mecanismo já existente da SoulUp. Existe controle de acesso por papéis (usuário comum, moderador de missões e administrador do EcoGuard), toda consulta é filtrada pelo id do usuário autenticado no backend (nunca confiando em id enviado pelo cliente), o serviço de planos/pagamentos não tem nenhuma permissão de escrita sobre EcoScore, EcoPoints ou ranking, e toda listagem tem paginação obrigatória e limite de profundidade de consulta.',
      },
      {
        question: 'Como os dados dos usuários são protegidos?',
        answer:
          'Toda comunicação da API usa HTTPS/TLS, senhas são armazenadas com hash e salt, a coleta de dados é minimizada (por exemplo, a evidência guarda só o GPS do momento da submissão, sem histórico contínuo de localização) e há separação entre dados pessoais (identidade) e dados analíticos (pontuação, ranking, análise de IA).',
      },
      {
        question: 'Como funcionam os logs e a auditoria?',
        answer:
          'Ações críticas são registradas, como mudança de status de submissão, geração/uso de QR Code, confirmação de vencedor e processamento de premiação. Também há rastreabilidade de consultas sensíveis (quem consultou o histórico de quem, e quando), controle sobre o que vai para o log (a evidência bruta nunca vai para o log, só referências) e auditoria periódica cruzando decisões automáticas do EcoGuard com decisões manuais de moderação.',
      },
    ],
  },
];
