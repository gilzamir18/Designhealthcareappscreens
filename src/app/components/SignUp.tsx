import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useUser } from '../contexts/UserContext';
import { maskCPF, maskPhone, unmask } from '../utils/masks';

export function SignUp() {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    let processedValue = value;
    
    if (field === 'cpf') {
      processedValue = maskCPF(value);
    } else if (field === 'telefone') {
      processedValue = maskPhone(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório';
    }

    const cpfNumbers = unmask(formData.cpf);
    if (cpfNumbers.length !== 11) {
      newErrors.cpf = 'CPF inválido';
    }

    const phoneNumbers = unmask(formData.telefone);
    if (phoneNumbers.length !== 11) {
      newErrors.telefone = 'Telefone inválido';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'E-mail inválido';
    }

    if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      updateUserData({
        nomeCompleto: formData.nomeCompleto,
        cpf: formData.cpf,
        telefone: formData.telefone,
        email: formData.email,
        senha: formData.senha,
      });
      navigate('/triagem');
    }
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

        {/* Título do formulário */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Crie sua conta</h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nomeCompleto" className="text-sm text-gray-700 mb-1.5 block">
              Nome completo
            </Label>
            <Input
              id="nomeCompleto"
              type="text"
              value={formData.nomeCompleto}
              onChange={(e) => handleChange('nomeCompleto', e.target.value)}
              className="h-[38px] border-[0.5px] rounded-lg"
              style={{ borderColor: errors.nomeCompleto ? '#ef4444' : undefined }}
            />
            {errors.nomeCompleto && (
              <p className="text-xs text-red-500 mt-1">{errors.nomeCompleto}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cpf" className="text-sm text-gray-700 mb-1.5 block">
              CPF
            </Label>
            <Input
              id="cpf"
              type="text"
              value={formData.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
              placeholder="000.000.000-00"
              maxLength={14}
              className="h-[38px] border-[0.5px] rounded-lg"
              style={{ borderColor: errors.cpf ? '#ef4444' : undefined }}
            />
            {errors.cpf && (
              <p className="text-xs text-red-500 mt-1">{errors.cpf}</p>
            )}
          </div>

          <div>
            <Label htmlFor="telefone" className="text-sm text-gray-700 mb-1.5 block">
              Telefone
            </Label>
            <Input
              id="telefone"
              type="text"
              value={formData.telefone}
              onChange={(e) => handleChange('telefone', e.target.value)}
              placeholder="(00) 00000-0000"
              maxLength={15}
              className="h-[38px] border-[0.5px] rounded-lg"
              style={{ borderColor: errors.telefone ? '#ef4444' : undefined }}
            />
            {errors.telefone && (
              <p className="text-xs text-red-500 mt-1">{errors.telefone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm text-gray-700 mb-1.5 block">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="h-[38px] border-[0.5px] rounded-lg"
              style={{ borderColor: errors.email ? '#ef4444' : undefined }}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="senha" className="text-sm text-gray-700 mb-1.5 block">
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              value={formData.senha}
              onChange={(e) => handleChange('senha', e.target.value)}
              className="h-[38px] border-[0.5px] rounded-lg"
              style={{ borderColor: errors.senha ? '#ef4444' : undefined }}
            />
            {errors.senha && (
              <p className="text-xs text-red-500 mt-1">{errors.senha}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmarSenha" className="text-sm text-gray-700 mb-1.5 block">
              Confirmar senha
            </Label>
            <Input
              id="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={(e) => handleChange('confirmarSenha', e.target.value)}
              className="h-[38px] border-[0.5px] rounded-lg"
              style={{ borderColor: errors.confirmarSenha ? '#ef4444' : undefined }}
            />
            {errors.confirmarSenha && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmarSenha}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-[42px] text-white rounded-lg mt-6"
            style={{ backgroundColor: '#1E6F5C' }}
          >
            Criar conta
          </Button>
        </form>

        {/* Link de login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Já tem conta?{' '}
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="font-medium"
            style={{ color: '#1E6F5C' }}
          >
            Entrar
          </button>
        </p>

        {/* Nota de privacidade */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Seus dados são protegidos e não serão compartilhados.
        </p>
      </div>
    </div>
  );
}
