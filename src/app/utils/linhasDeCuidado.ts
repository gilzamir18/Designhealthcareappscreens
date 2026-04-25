interface UserData {
  condicoesSaude?: string[];
  peso?: number;
  altura?: number;
  nivelAtividade?: string;
}

export type LinhaCuidado = 'diabetica' | 'obesidade' | 'hipertensos' | 'ativa';

export interface LinhaInfo {
  id: LinhaCuidado;
  nome: string;
  cor: string;
  descricao: string;
}

export const LINHAS_INFO: Record<LinhaCuidado, LinhaInfo> = {
  diabetica: {
    id: 'diabetica',
    nome: 'Linha Diabética',
    cor: '#8b5cf6',
    descricao: 'Acompanhamento para controle de diabetes'
  },
  obesidade: {
    id: 'obesidade',
    nome: 'Linha Obesidade',
    cor: '#f59e0b',
    descricao: 'Programa de controle de peso e nutrição'
  },
  hipertensos: {
    id: 'hipertensos',
    nome: 'Linha Hipertensos',
    cor: '#ef4444',
    descricao: 'Controle de pressão arterial'
  },
  ativa: {
    id: 'ativa',
    nome: 'Linha Ativa',
    cor: '#1E6F5C',
    descricao: 'Vida ativa e prevenção'
  }
};

function calculateIMC(peso: number, altura: number): number {
  const alturaMetros = altura / 100;
  return peso / (alturaMetros * alturaMetros);
}

export function classificarLinhasDeCuidado(userData: UserData): LinhaCuidado[] {
  const linhasAtivas: LinhaCuidado[] = [];
  const { condicoesSaude = [], peso, altura, nivelAtividade } = userData;

  // Linha Diabética: diagnóstico de diabetes
  if (condicoesSaude.includes('diabetes')) {
    linhasAtivas.push('diabetica');
  }

  // Linha Obesidade: IMC ≥ 30
  if (peso && altura) {
    const imc = calculateIMC(peso, altura);
    if (imc >= 30) {
      linhasAtivas.push('obesidade');
    }
  }

  // Linha Hipertensos: diagnóstico de hipertensão
  if (condicoesSaude.includes('hipertensao')) {
    linhasAtivas.push('hipertensos');
  }

  // Linha Ativa: sem condições e atividade moderada ou superior
  const semCondicoes = condicoesSaude.length === 0 || condicoesSaude.includes('nenhuma');
  const atividadeAlta = nivelAtividade === 'moderadamente-ativo' || nivelAtividade === 'muito-ativo';

  if (semCondicoes && atividadeAlta && linhasAtivas.length === 0) {
    linhasAtivas.push('ativa');
  }

  // Se não se encaixar em nenhuma linha, usar Ativa como padrão
  if (linhasAtivas.length === 0) {
    linhasAtivas.push('ativa');
  }

  return linhasAtivas;
}
