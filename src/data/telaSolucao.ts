import cell1 from '../assets/img/cell-1.png';
import cell2 from '../assets/img/cell-2.png';
import cell3 from '../assets/img/cell-3.png';
import cell4 from '../assets/img/cell-4.png';
import cell5 from '../assets/img/cell-5.png';
import cell6 from '../assets/img/cell-6.png';
import cell7 from '../assets/img/cell-7.png';
import cell8 from '../assets/img/cell-8.png';
import cell9 from '../assets/img/cell-9.png';
import cell10 from '../assets/img/cell-10.png';
import cell11 from '../assets/img/cell-11.png';
import cell12 from '../assets/img/cell-12.png';
import imgArvore1 from '../assets/img/img-arvore1.png';
import imgArvore2 from '../assets/img/img-arvore2.png';
import imgArvore3 from '../assets/img/img-arvore3.png';
import imgArvore4 from '../assets/img/img-arvore4.png';
import imgArvore5 from '../assets/img/img-arvore5.png';
import imgFlorestaDigital from '../assets/img/img-floresta-digital.png';
import imgRanking from '../assets/img/9 3.png';

import type { TelaComplementar, TelaSolucao } from '../types';

export const telasSolucao: readonly TelaSolucao[] = [
  {
    id: 'catalogo-de-missoes',
    titulo: 'Escolha de missões',
    categoria: 'Missões',
    imagem: cell1,
    alt: 'Protótipo com lista de missões EcoMovement e botões para começar',
    descricao: 'O participante encontra as atividades da categoria EcoMovement e escolhe uma missão para realizar.',
    destaques: ['Categorias de atividades', 'Pontos previstos na missão', 'Acesso ao histórico de missões'],
  },
  {
    id: 'registro-de-evidencia',
    titulo: 'Registro da evidência',
    categoria: 'Missões',
    imagem: cell2,
    alt: 'Protótipo da câmera mostrando uma refeição, botão de gravação e cronômetro',
    descricao: 'A tela ilustra a captura da evidência de uma missão de alimentação, com controle de tempo visível.',
    destaques: ['Captura orientada pela missão', 'Tempo restante em destaque', 'Ação de envio acessível'],
  },
  {
    id: 'orientacoes-da-missao',
    titulo: 'Orientações da missão',
    categoria: 'Missões',
    imagem: cell3,
    alt: 'Protótipo com instruções da evidência, exemplo de refeição e botão Continuar',
    descricao: 'As instruções apresentam como registrar a atividade antes que o participante avance para a captura.',
    destaques: ['Instruções antes da captura', 'Exemplo visual de evidência', 'Formato exigido para a atividade'],
  },
  {
    id: 'confirmacao-de-envio',
    titulo: 'Confirmação de envio',
    categoria: 'Missões',
    imagem: cell4,
    alt: 'Protótipo com confirmação de vídeo enviado e botão Voltar às missões',
    descricao: 'A confirmação informa que a evidência foi recebida para análise. O envio ainda não significa aprovação da missão.',
    destaques: ['Confirmação visual do envio', 'Indicação da etapa de análise', 'Retorno à lista de missões'],
  },
  {
    id: 'historico-de-missoes',
    titulo: 'Histórico de missões',
    categoria: 'Missões',
    imagem: cell5,
    alt: 'Protótipo de missões concluídas com pontos acumulados, datas e estados das atividades',
    descricao: 'O histórico reúne as atividades registradas e seus estados para que o participante acompanhe o próprio progresso.',
    destaques: ['Histórico organizado por período', 'Estado de cada atividade', 'Visão dos pontos acumulados'],
  },
  {
    id: 'limite-de-gravacao',
    titulo: 'Limite de gravação',
    categoria: 'Missões',
    imagem: cell6,
    alt: 'Protótipo da gravação com aviso de tempo máximo atingido',
    descricao: 'Um aviso informa quando a gravação atinge o tempo máximo previsto para o registro da evidência.',
    destaques: ['Aviso sobre o limite de tempo', 'Orientação para o próximo passo', 'Controle do registro da atividade'],
  },
  {
    id: 'progresso-das-atividades',
    titulo: 'Progresso das atividades',
    categoria: 'Missões',
    imagem: cell7,
    alt: 'Protótipo com missão de engajamento em andamento e outras atividades disponíveis',
    descricao: 'A lista permite identificar atividades iniciadas e acompanhar a evolução de uma missão com várias etapas.',
    destaques: ['Progresso por atividade', 'Missões disponíveis e em andamento', 'Continuidade da participação'],
  },
  {
    id: 'minhas-comunidades',
    titulo: 'Minhas comunidades',
    categoria: 'Comunidade',
    imagem: cell8,
    alt: 'Protótipo da lista Minhas comunidades com a comunidade EcoMovement',
    descricao: 'O participante encontra as comunidades de que faz parte e acessa o espaço do EcoMovement.',
    destaques: ['Lista de comunidades', 'Identificação do EcoMovement', 'Entrada para a participação coletiva'],
  },
  {
    id: 'comunidade-ecomovement',
    titulo: 'Comunidade EcoMovement',
    categoria: 'Comunidade',
    imagem: cell9,
    alt: 'Protótipo do perfil da comunidade EcoMovement com membros e acesso à floresta digital',
    descricao: 'A página da comunidade reúne sua apresentação, publicações e acesso à floresta digital.',
    destaques: ['Identidade da comunidade', 'Espaço para publicações', 'Acesso à floresta digital'],
  },
  {
    id: 'colecao-de-badges',
    titulo: 'Coleção de badges',
    categoria: 'Perfil e conquistas',
    imagem: cell10,
    alt: 'Protótipo de edição do perfil com badges selecionados e galeria de conquistas',
    descricao: 'As conquistas podem compor a identidade do participante, com uma galeria de badges disponíveis no perfil.',
    destaques: ['Badges selecionados', 'Galeria de conquistas', 'Personalização da apresentação'],
  },
  {
    id: 'arvore-digital',
    titulo: 'Árvore digital',
    categoria: 'Perfil e conquistas',
    imagem: cell11,
    alt: 'Protótipo do perfil com a aba Árvore digital selecionada e indicador de nível',
    descricao: 'Uma área do perfil é dedicada à árvore digital e ao nível de evolução do participante.',
    destaques: ['Acesso pelo perfil', 'Indicador de nível', 'Representação do progresso individual'],
  },
  {
    id: 'floresta-digital',
    titulo: 'Floresta digital',
    categoria: 'Comunidade',
    imagem: cell12,
    alt: 'Protótipo da floresta digital com barra de progresso, nível e ranking da comunidade',
    descricao: 'A floresta apresenta a evolução coletiva da comunidade e destaca a participação no ranking.',
    destaques: ['Evolução coletiva', 'Barra de progresso', 'Ranking da comunidade'],
  },
];

export const evolucaoArvore: readonly TelaComplementar[] = [
  { src: imgArvore1, title: 'Nível 1 · Galho seco' },
  { src: imgArvore2, title: 'Nível 2 · Primeiras folhas' },
  { src: imgArvore3, title: 'Nível 3 · Crescimento' },
  { src: imgArvore4, title: 'Nível 4 · Copa cheia' },
  { src: imgArvore5, title: 'Nível 5 · Frutos e flores' },
];

export const telasComunidade: readonly TelaComplementar[] = [
  { src: imgFlorestaDigital, title: 'Floresta digital da comunidade' },
  { src: imgRanking, title: 'Ranking de pontos' },
];
