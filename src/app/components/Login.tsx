import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - não implementado para MVP
    alert('Funcionalidade de login será implementada em breve');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="w-full max-w-[420px] bg-white rounded-lg p-8 shadow-sm">
        {/* Logo e cabeçalho */}
        <div className="flex flex-col items-center mb-6">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
            style={{ backgroundColor: '#1E6F5C' }}
          >
            <Plus className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-xl font-medium text-gray-900">SPL</h1>
          <p className="text-sm text-gray-500">Saúde em Primeiro Lugar</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Entrar</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm text-gray-700 mb-1.5 block">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[38px] border-[0.5px] rounded-lg"
            />
          </div>

          <div>
            <Label htmlFor="senha" className="text-sm text-gray-700 mb-1.5 block">
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="h-[38px] border-[0.5px] rounded-lg"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-[42px] text-white rounded-lg mt-6"
            style={{ backgroundColor: '#1E6F5C' }}
          >
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Não tem conta?{' '}
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="font-medium"
            style={{ color: '#1E6F5C' }}
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
}
