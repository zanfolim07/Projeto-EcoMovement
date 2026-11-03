import type { Integrante } from '../types';

import guilhermeImg from '../assets/img/img-guilherme.png';
import lucasImg from '../assets/img/img-lucas.png';
import jaimeImg from '../assets/img/img-jaime.png';
import fabioImg from '../assets/img/img-fabio.png';
import matheusImg from '../assets/img/img-matheus.png';

export const integrantes: readonly Integrante[] = [
  {
    id: 'guilherme-zanfolim',
    nome: 'Guilherme Zanfolim Nunes Farias',
    rm: 'RM 570983',
    turma: '1TDSPV',
    foto: guilhermeImg,
    github: 'https://github.com/zanfolim07',
    linkedin: 'https://www.linkedin.com/in/guilherme-zanfolim-202865315',
    contribuicoes: [
      'Configuração do React Router e da estrutura de rotas',
      'Componentes Header, Footer, Layout, Button e Card',
      'Organização dos assets e integração entre as páginas',
    ],
  },
  {
    id: 'lucas-monteiro',
    nome: 'Lucas Monteiro Dias da Costa',
    rm: 'RM 571388',
    turma: '1TDSPV',
    foto: lucasImg,
    github: 'https://github.com/monteiroo5',
    linkedin: 'https://www.linkedin.com/in/lucas-monteiro-1110703b5/',
    contribuicoes: [
      'Estrutura e dados da página de Integrantes',
      'Links de GitHub e LinkedIn da equipe',
      'Página Missões com o passo a passo da jornada',
    ],
  },
  {
    id: 'jaime-ringel',
    nome: 'Jaime Ringel',
    rm: 'RM 562044',
    turma: '1TDSPV',
    foto: jaimeImg,
    github: 'https://github.com/jaimeringel004',
    linkedin: 'https://www.linkedin.com/in/jaime-ringel-1060bb402',
    contribuicoes: [
      'Layout, seções e dados da página inicial',
      'Formulário de contato com React Hook Form',
      'Documentação do projeto no README',
    ],
  },
  {
    id: 'fabio-cezare',
    nome: 'Fabio Cezare Almeida',
    rm: 'RM 572642',
    turma: '1TDSPV',
    foto: fabioImg,
    github: 'https://github.com/FabioCAlmeida',
    linkedin: 'https://www.linkedin.com/in/fabio-cezare-almeida-4b448a408',
    contribuicoes: [
      'Configuração do Tailwind CSS e dos tokens visuais',
      'Página Home de apresentação',
      'FAQ interativa organizada por categorias',
    ],
  },
  {
    id: 'matheus-magalhaes',
    nome: 'Matheus Magalhães Romão de Moraes',
    rm: 'RM 573371',
    turma: '1TDSPV',
    foto: matheusImg,
    github: 'https://github.com/MagalhaesMatheus007',
    linkedin: 'https://www.linkedin.com/in/matheus-magalh%C3%A3es-ti',
    contribuicoes: [
      'Página Sobre com proposta, valores e ecossistema',
      'Galeria da Solução com filtros por categoria',
      'Detalhe de cada tela com navegação dinâmica',
    ],
  },
];

export function buscarIntegrante(id: string | undefined): Integrante | undefined {
  return integrantes.find((integrante) => integrante.id === id);
}
