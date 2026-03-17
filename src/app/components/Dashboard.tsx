import { useNavigate } from 'react-router';
import { Plus, LogOut } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Badge } from './ui/badge';

function calculateIMC(peso: number, altura: number): number {
  const alturaMetros = altura / 100;
  return peso / (alturaMetros * alturaMetros);
}

function getIMCStatus(imc: number): { label: string; color: string } {
  if (imc < 18.5) return { label: 'Abaixo do peso', color: '#f59e0b' };
  if (imc < 25) return { label: 'Normal', color: '#10b981' };
  if (imc < 30) return { label: 'Sobrepeso', color: '#f59e0b' };
  return { label: 'Obesidade', color: '#ef4444' };
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

  const handleLogout = () => {
    clearUserData();
    navigate('/');
  };

  const recomendacoes = [
    {
      title: 'Mantenha-se hidratado',
      description: 'Beba pelo menos 2 litros de água por dia para manter o corpo funcionando bem.',
      color: '#1E6F5C',
    },
    {
      title: 'Pratique exercícios regularmente',
      description: 'Tente incluir 30 minutos de atividade física moderada na sua rotina diária.',
      color: '#f59e0b',
    },
    {
      title: 'Consulte um médico regularmente',
      description: 'Faça check-ups anuais para monitorar sua saúde e prevenir doenças.',
      color: '#3b82f6',
    },
  ];

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

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* IMC Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">IMC</h3>
            {imc && imcStatus ? (
              <>
                <p className="text-2xl font-semibold text-gray-900 mb-2">
                  {imc.toFixed(1)}
                </p>
                <Badge 
                  className="text-white text-xs"
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
            <h3 className="text-sm font-medium text-gray-600 mb-2">Nível de atividade</h3>
            <p className="text-lg font-medium text-gray-900">
              {userData.nivelAtividade 
                ? getNivelAtividadeLabel(userData.nivelAtividade)
                : 'Não informado'
              }
            </p>
          </div>

          {/* Próxima etapa Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Próxima etapa</h3>
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
            {recomendacoes.map((rec, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-5 shadow-sm flex gap-4"
              >
                <div 
                  className="w-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: rec.color }}
                />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
