import type { PassoMissao } from '../types';

import cell1 from '../assets/img/cell-1.png';
import cell2 from '../assets/img/cell-2.png';
import cell3 from '../assets/img/cell-3.png';
import cell4 from '../assets/img/cell-4.png';
import cell5 from '../assets/img/cell-5.png';
import cell6 from '../assets/img/cell-6.png';

export const passosMissao: readonly PassoMissao[] = [
  {
    image: cell1,
    title: 'Acesse a aba Missões na seção EcoMovement.',
    description:
      'Acesse a área de missões gerais do app e selecione EcoMovement para encontrar as missões de sustentabilidade disponíveis.',
  },
  {
    image: cell3,
    title: 'Leia as orientações da missão.',
    description:
      'Confira as instruções, o formato da validação e os critérios necessários antes de iniciar a atividade.',
  },
  {
    image: cell2,
    title: 'Grave a comprovação da evidência.',
    description:
      'Realize a atividade e grave o vídeo ou tire a foto solicitada diretamente pela câmera para que a missão possa ser analisada.',
  },
  {
    image: cell6,
    title: 'Respeite o tempo limite da atividade.',
    description:
      'Se a missão tiver tempo máximo, conclua e envie a evidência dentro do prazo indicado na tela.',
  },
  {
    image: cell4,
    title: 'Acompanhe o envio da missão.',
    description:
      'Após o envio, a evidência segue para análise do EcoGuard e você acompanha o andamento da validação.',
  },
  {
    image: cell5,
    title: 'Confira as missões concluídas.',
    description:
      'Acesse o histórico para verificar as missões aprovadas ou em análise e acompanhar os Pontos Soul acumulados.',
  },
];
