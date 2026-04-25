import { LinhaCuidado } from './linhasDeCuidado';

export interface Recomendacao {
  id: string;
  titulo: string;
  descricao: string;
  linha: LinhaCuidado;
  prioridade: number;
}

export const RECOMENDACOES: Record<LinhaCuidado, Recomendacao[]> = {
  diabetica: [
    {
      id: 'glicemia-controle',
      titulo: 'Monitore sua glicemia regularmente',
      descricao: 'Faça testes de glicemia conforme orientação médica e mantenha um registro dos valores.',
      linha: 'diabetica',
      prioridade: 1
    },
    {
      id: 'alimentacao-baixo-ig',
      titulo: 'Alimentação de baixo índice glicêmico',
      descricao: 'Prefira alimentos integrais, vegetais e proteínas magras. Evite açúcares refinados.',
      linha: 'diabetica',
      prioridade: 2
    },
    {
      id: 'exercicios-aerobicos',
      titulo: 'Pratique exercícios aeróbicos',
      descricao: 'Caminhada, natação ou ciclismo por 30 minutos, 5 vezes na semana, ajudam no controle glicêmico.',
      linha: 'diabetica',
      prioridade: 3
    },
    {
      id: 'medicacao-diabetes',
      titulo: 'Tome seus medicamentos regularmente',
      descricao: 'Mantenha a rotina de medicação prescrita e não interrompa sem orientação médica.',
      linha: 'diabetica',
      prioridade: 4
    }
  ],
  obesidade: [
    {
      id: 'nutricao-calorica',
      titulo: 'Controle de calorias balanceado',
      descricao: 'Consulte um nutricionista para plano alimentar personalizado com déficit calórico saudável.',
      linha: 'obesidade',
      prioridade: 1
    },
    {
      id: 'atividade-fisica-regular',
      titulo: 'Atividade física progressiva',
      descricao: 'Inicie com exercícios leves e aumente gradualmente. Combine aeróbicos com fortalecimento muscular.',
      linha: 'obesidade',
      prioridade: 2
    },
    {
      id: 'hidratacao-peso',
      titulo: 'Hidratação adequada',
      descricao: 'Beba ao menos 2 litros de água por dia. A hidratação auxilia no metabolismo e reduz a fome.',
      linha: 'obesidade',
      prioridade: 3
    },
    {
      id: 'sono-qualidade',
      titulo: 'Qualidade do sono',
      descricao: 'Durma de 7 a 9 horas por noite. O sono adequado regula hormônios da fome e saciedade.',
      linha: 'obesidade',
      prioridade: 4
    }
  ],
  hipertensos: [
    {
      id: 'pressao-monitoramento',
      titulo: 'Monitore sua pressão arterial',
      descricao: 'Meça a pressão regularmente e mantenha um registro para acompanhamento médico.',
      linha: 'hipertensos',
      prioridade: 1
    },
    {
      id: 'reducao-sal',
      titulo: 'Reduza o consumo de sal',
      descricao: 'Limite o sal a menos de 5g por dia. Evite alimentos processados e temperos prontos.',
      linha: 'hipertensos',
      prioridade: 2
    },
    {
      id: 'estresse-controle',
      titulo: 'Controle do estresse',
      descricao: 'Pratique técnicas de relaxamento como meditação, yoga ou respiração profunda.',
      linha: 'hipertensos',
      prioridade: 3
    },
    {
      id: 'exercicios-pressao',
      titulo: 'Exercícios moderados regulares',
      descricao: 'Atividades físicas moderadas ajudam a reduzir e controlar a pressão arterial.',
      linha: 'hipertensos',
      prioridade: 4
    }
  ],
  ativa: [
    {
      id: 'exercicios-manutencao',
      titulo: 'Mantenha-se ativo',
      descricao: 'Continue praticando atividades físicas regulares para manter sua saúde e bem-estar.',
      linha: 'ativa',
      prioridade: 1
    },
    {
      id: 'hidratacao-ativa',
      titulo: 'Hidratação constante',
      descricao: 'Beba pelo menos 2 litros de água por dia para manter o corpo funcionando bem.',
      linha: 'ativa',
      prioridade: 2
    },
    {
      id: 'checkup-preventivo',
      titulo: 'Check-up anual preventivo',
      descricao: 'Faça exames de rotina anualmente para prevenir doenças e manter a saúde em dia.',
      linha: 'ativa',
      prioridade: 3
    },
    {
      id: 'alimentacao-equilibrada',
      titulo: 'Alimentação equilibrada',
      descricao: 'Mantenha uma dieta variada com frutas, vegetais, proteínas e grãos integrais.',
      linha: 'ativa',
      prioridade: 4
    }
  ]
};

export function getRecomendacoesParaUsuario(linhasAtivas: LinhaCuidado[]): Recomendacao[] {
  const todasRecomendacoes: Recomendacao[] = [];

  // Coletar recomendações de todas as linhas ativas
  linhasAtivas.forEach(linha => {
    todasRecomendacoes.push(...RECOMENDACOES[linha]);
  });

  // Remover duplicatas por ID (deduplication)
  const recomendacoesUnicas = todasRecomendacoes.reduce((acc, rec) => {
    if (!acc.find(r => r.id === rec.id)) {
      acc.push(rec);
    }
    return acc;
  }, [] as Recomendacao[]);

  // Ordenar por prioridade
  return recomendacoesUnicas.sort((a, b) => a.prioridade - b.prioridade);
}
