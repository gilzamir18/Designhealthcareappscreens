import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useUser } from '../contexts/UserContext';

const condicoesSaudeOptions = [
  { id: 'hipertensao', label: 'Hipertensão' },
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'obesidade', label: 'Obesidade' },
  { id: 'nenhuma', label: 'Nenhuma' },
];

const niveisAtividade = [
  { value: 'sedentario', label: 'Sedentário' },
  { value: 'levemente-ativo', label: 'Levemente ativo' },
  { value: 'moderadamente-ativo', label: 'Moderadamente ativo' },
  { value: 'muito-ativo', label: 'Muito ativo' },
];

export function HealthIntake() {
  const navigate = useNavigate();
  const { updateUserData, userData } = useUser();
  
  const [formData, setFormData] = useState({
    dataNascimento: '',
    sexoBiologico: '' as 'Masculino' | 'Feminino' | '',
    peso: '',
    altura: '',
    condicoesSaude: [] as string[],
    usaMedicamentos: '' as 'Sim' | 'Não' | '',
    nivelAtividade: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleConditionToggle = (conditionId: string) => {
    if (conditionId === 'nenhuma') {
      setFormData(prev => ({ 
        ...prev, 
        condicoesSaude: prev.condicoesSaude.includes('nenhuma') ? [] : ['nenhuma'] 
      }));
    } else {
      setFormData(prev => {
        const filtered = prev.condicoesSaude.filter(c => c !== 'nenhuma');
        const isChecked = filtered.includes(conditionId);
        return {
          ...prev,
          condicoesSaude: isChecked 
            ? filtered.filter(c => c !== conditionId)
            : [...filtered, conditionId]
        };
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    }

    if (!formData.sexoBiologico) {
      newErrors.sexoBiologico = 'Selecione o sexo biológico';
    }

    const peso = parseFloat(formData.peso);
    if (!formData.peso || isNaN(peso) || peso <= 0) {
      newErrors.peso = 'Peso inválido';
    }

    const altura = parseFloat(formData.altura);
    if (!formData.altura || isNaN(altura) || altura <= 0) {
      newErrors.altura = 'Altura inválida';
    }

    if (formData.condicoesSaude.length === 0) {
      newErrors.condicoesSaude = 'Selecione ao menos uma opção';
    }

    if (!formData.usaMedicamentos) {
      newErrors.usaMedicamentos = 'Responda se usa medicamentos';
    }

    if (!formData.nivelAtividade) {
      newErrors.nivelAtividade = 'Selecione o nível de atividade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      updateUserData({
        dataNascimento: formData.dataNascimento,
        sexoBiologico: formData.sexoBiologico as 'Masculino' | 'Feminino',
        peso: parseFloat(formData.peso),
        altura: parseFloat(formData.altura),
        condicoesSaude: formData.condicoesSaude,
        usaMedicamentos: formData.usaMedicamentos as 'Sim' | 'Não',
        nivelAtividade: formData.nivelAtividade,
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="w-full max-w-[480px] bg-white rounded-lg p-8 shadow-sm">
        {/* Indicador de progresso */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="h-2 flex-1 rounded-full"
              style={{ backgroundColor: '#1E6F5C' }}
            />
            <div className="h-2 flex-1 rounded-full bg-gray-200" />
          </div>
          <p className="text-sm text-gray-600">Etapa 1 de 2</p>
        </div>

        {/* Cabeçalho */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Triagem de saúde</h2>
          <p className="text-sm text-gray-600">
            Responda com atenção para montarmos seu perfil.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="dataNascimento" className="text-sm text-gray-700 mb-1.5 block">
              Data de nascimento
            </Label>
            <Input
              id="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={(e) => setFormData(prev => ({ ...prev, dataNascimento: e.target.value }))}
              className="h-[38px] border-[0.5px] rounded-lg"
              style={{ borderColor: errors.dataNascimento ? '#ef4444' : undefined }}
            />
            {errors.dataNascimento && (
              <p className="text-xs text-red-500 mt-1">{errors.dataNascimento}</p>
            )}
          </div>

          <div>
            <Label className="text-sm text-gray-700 mb-2 block">
              Sexo biológico
            </Label>
            <RadioGroup
              value={formData.sexoBiologico}
              onValueChange={(value) => setFormData(prev => ({ ...prev, sexoBiologico: value as 'Masculino' | 'Feminino' }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Masculino" id="masculino" />
                <Label htmlFor="masculino" className="font-normal cursor-pointer">
                  Masculino
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Feminino" id="feminino" />
                <Label htmlFor="feminino" className="font-normal cursor-pointer">
                  Feminino
                </Label>
              </div>
            </RadioGroup>
            {errors.sexoBiologico && (
              <p className="text-xs text-red-500 mt-1">{errors.sexoBiologico}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="peso" className="text-sm text-gray-700 mb-1.5 block">
                Peso (kg)
              </Label>
              <Input
                id="peso"
                type="number"
                step="0.1"
                value={formData.peso}
                onChange={(e) => setFormData(prev => ({ ...prev, peso: e.target.value }))}
                className="h-[38px] border-[0.5px] rounded-lg"
                style={{ borderColor: errors.peso ? '#ef4444' : undefined }}
              />
              {errors.peso && (
                <p className="text-xs text-red-500 mt-1">{errors.peso}</p>
              )}
            </div>

            <div>
              <Label htmlFor="altura" className="text-sm text-gray-700 mb-1.5 block">
                Altura (cm)
              </Label>
              <Input
                id="altura"
                type="number"
                value={formData.altura}
                onChange={(e) => setFormData(prev => ({ ...prev, altura: e.target.value }))}
                className="h-[38px] border-[0.5px] rounded-lg"
                style={{ borderColor: errors.altura ? '#ef4444' : undefined }}
              />
              {errors.altura && (
                <p className="text-xs text-red-500 mt-1">{errors.altura}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-700 mb-2 block">
              Você possui alguma condição de saúde diagnosticada?
            </Label>
            <div className="space-y-2">
              {condicoesSaudeOptions.map((condition) => (
                <div key={condition.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition.id}
                    checked={formData.condicoesSaude.includes(condition.id)}
                    onCheckedChange={() => handleConditionToggle(condition.id)}
                  />
                  <Label
                    htmlFor={condition.id}
                    className="font-normal cursor-pointer"
                  >
                    {condition.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.condicoesSaude && (
              <p className="text-xs text-red-500 mt-1">{errors.condicoesSaude}</p>
            )}
          </div>

          <div>
            <Label className="text-sm text-gray-700 mb-2 block">
              Você faz uso regular de medicamentos?
            </Label>
            <RadioGroup
              value={formData.usaMedicamentos}
              onValueChange={(value) => setFormData(prev => ({ ...prev, usaMedicamentos: value as 'Sim' | 'Não' }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Sim" id="med-sim" />
                <Label htmlFor="med-sim" className="font-normal cursor-pointer">
                  Sim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Não" id="med-nao" />
                <Label htmlFor="med-nao" className="font-normal cursor-pointer">
                  Não
                </Label>
              </div>
            </RadioGroup>
            {errors.usaMedicamentos && (
              <p className="text-xs text-red-500 mt-1">{errors.usaMedicamentos}</p>
            )}
          </div>

          <div>
            <Label htmlFor="nivelAtividade" className="text-sm text-gray-700 mb-1.5 block">
              Nível de atividade física
            </Label>
            <Select
              value={formData.nivelAtividade}
              onValueChange={(value) => setFormData(prev => ({ ...prev, nivelAtividade: value }))}
            >
              <SelectTrigger 
                className="h-[38px] border-[0.5px] rounded-lg"
                style={{ borderColor: errors.nivelAtividade ? '#ef4444' : undefined }}
              >
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {niveisAtividade.map((nivel) => (
                  <SelectItem key={nivel.value} value={nivel.value}>
                    {nivel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.nivelAtividade && (
              <p className="text-xs text-red-500 mt-1">{errors.nivelAtividade}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button 
              type="submit" 
              className="w-full h-[42px] text-white rounded-lg"
              style={{ backgroundColor: '#1E6F5C' }}
            >
              Continuar
            </Button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
