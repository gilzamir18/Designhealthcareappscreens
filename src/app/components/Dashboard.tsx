import { useNavigate } from 'react-router';
import { Plus, LogOut, Activity, Heart, TrendingUp, AlertCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Badge } from './ui/badge';
import { classificarLinhasDeCuidado, LINHAS_INFO, LinhaCuidado } from '../utils/linhasDeCuidado';
import { getRecomendacoesParaUsuario } from '../utils/recomendacoes';

function calculateIMC(peso: number, altura: number): number {
  const alturaMetros = altura / 100;
  return peso / (alturaMetros * alturaMetros);
}

function getIMCStatus(imc: number): { label: string; color: string } {
  if (imc < 18.5) return { label: 'Abaixo do peso', color: '#f59e0b' };
  if (imc < 25) return { label: 'Normal', color: '#10b981' };
  if (imc < 30) return { label: 'Sobrepeso', color: '#f59e0b' };
  if (imc < 35) return { label: 'Obesidade Grau I', color: '#ef4444' };
  if (imc < 40) return { label: 'Obesidade Grau II', color: '#dc2626' };
  return { label: 'Obesidade Grau III', color: '#991b1b' };
}

function getNivelAtividadeLabel(nivel: string): string {
  const labels: Record<string, string> = {
    'sedentario': 'Sedentário',
    'levemente-ativo': 'Levemente ativo',
    'moderadamente-ativo': 'Moderadamente ativo',
    'muito-ativo': 'Muito ativo',
  };
  return labels[nivel] || nivel;
}

export function Dashboard() {
  const navigate = useNavigate();
  const { userData, clearUserData } = useUser();

  if (!userData) {
    navigate('/');
    return null;
  }

  const firstName = userData.nomeCompleto.split(' ')[0];
  const initials = userData.nomeCompleto
    .split(' ')
    .filter(n => n.length > 0)
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const imc = userData.peso && userData.altura
    ? calculateIMC(userData.peso, userData.altura)
    : null;

  const imcStatus = imc ? getIMCStatus(imc) : null;

  // Classificar usuário em linhas de cuidado
  const linhasAtivas = classificarLinhasDeCuidado({
    condicoesSaude: userData.condicoesSaude,
    peso: userData.peso,
    altura: userData.altura,
    nivelAtividade: userData.nivelAtividade
  });

  // Obter recomendações personalizadas
  const recomendacoes = getRecomendacoesParaUsuario(linhasAtivas);

  const handleLogout = () => {
    clearUserData();
    navigate('/');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0f4f8' }}>
      {/* Top Navigation */}
      <nav className="bg-white h-[60px] shadow-sm">
        <div className="max-w-[900px] mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#1E6F5C' }}
            >
              <Plus className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <span className="text-lg font-medium text-gray-900">SPL</span>
          </div>

          {/* User avatar */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: '#1E6F5C' }}
            >
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-[900px] mx-auto px-4 py-8">
        {/* Greeting section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Olá, {firstName}
          </h1>
          <p className="text-gray-600">
            Veja seu resumo de saúde personalizado.
          </p>
        </div>

        {/* Linhas de Cuidado Ativas */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5" style={{ color: '#1E6F5C' }} />
            Suas linhas de cuidado
          </h2>
          <div className="flex flex-wrap gap-3">
            {linhasAtivas.map((linhaId) => {
              const linha = LINHAS_INFO[linhaId];
              return (
                <div
                  key={linhaId}
                  className="bg-white rounded-lg px-4 py-3 shadow-sm border-l-4 flex items-center gap-3"
                  style={{ borderLeftColor: linha.cor }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${linha.cor}20` }}
                  >
                    <Heart className="w-5 h-5" style={{ color: linha.cor }} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{linha.nome}</p>
                    <p className="text-xs text-gray-500">{linha.descricao}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* IMC Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-600">IMC</h3>
            </div>
            {imc && imcStatus ? (
              <>
                <p className="text-3xl font-semibold text-gray-900 mb-3">
                  {imc.toFixed(1)}
                </p>
                <Badge
                  className="text-white text-xs px-3 py-1"
                  style={{ backgroundColor: imcStatus.color }}
                >
                  {imcStatus.label}
                </Badge>
              </>
            ) : (
              <p className="text-sm text-gray-500">Dados insuficientes</p>
            )}
          </div>

          {/* Nível de atividade Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-600">Nível de atividade</h3>
            </div>
            <p className="text-lg font-medium text-gray-900">
              {userData.nivelAtividade
                ? getNivelAtividadeLabel(userData.nivelAtividade)
                : 'Não informado'
              }
            </p>
          </div>

          {/* Próxima etapa Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-600">Próxima etapa</h3>
            </div>
            <p className="text-sm text-gray-700">
              Agende uma consulta para avaliação completa
            </p>
          </div>
        </div>

        {/* Recomendações section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recomendações para você
          </h2>
          <div className="space-y-4">
            {recomendacoes.map((rec) => {
              const linhaInfo = LINHAS_INFO[rec.linha];
              return (
                <div
                  key={rec.id}
                  className="bg-white rounded-lg p-5 shadow-sm flex gap-4 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: linhaInfo.cor }}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {rec.titulo}
                      </h3>
                      <Badge
                        className="text-white text-xs ml-2 flex-shrink-0"
                        style={{ backgroundColor: linhaInfo.cor }}
                      >
                        {linhaInfo.nome.replace('Linha ', '')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {rec.descricao}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Metas semanais (placeholder) */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Metas da semana</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Beber 2 litros de água por dia</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Praticar 30 minutos de exercícios 3x na semana</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Dormir pelo menos 7 horas por noite</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
