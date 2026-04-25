# SPL - Guia de Design UI/UX

## Paleta de Cores

### Cores Principais
- **Verde Primário**: `#1E6F5C` - Cor da marca, usada em botões, logo e elementos principais
- **Cinza Claro de Fundo**: `#f0f4f8` - Cor de fundo das telas

### Cores das Linhas de Cuidado
- **Linha Diabética**: `#8b5cf6` (Roxo) - Representa monitoramento constante e atenção
- **Linha Obesidade**: `#f59e0b` (Âmbar) - Representa transformação e energia
- **Linha Hipertensos**: `#ef4444` (Vermelho) - Representa alerta e controle de pressão
- **Linha Ativa**: `#1E6F5C` (Verde) - Representa saúde, vitalidade e prevenção

### Cores de Status IMC
- **Abaixo do peso**: `#f59e0b` (Âmbar)
- **Normal**: `#10b981` (Verde)
- **Sobrepeso**: `#f59e0b` (Âmbar)
- **Obesidade Grau I**: `#ef4444` (Vermelho)
- **Obesidade Grau II**: `#dc2626` (Vermelho escuro)
- **Obesidade Grau III**: `#991b1b` (Vermelho muito escuro)

## Estrutura das Telas

### 1. Tela de Cadastro (SignUp)
- Logo SPL centralizado no topo
- Formulário com campos de entrada padrão
- Validação em tempo real
- Botão de ação primária em verde `#1E6F5C`
- Link para login

### 2. Tela de Triagem (HealthIntake)
- Logo SPL no topo
- Indicador de progresso visual (2 etapas)
- Ícone de clipboard ao lado do título
- Campos agrupados logicamente
- Checkboxes com fundo cinza claro para destaque
- Botão primário para continuar

### 3. Dashboard
Dividido em 4 seções principais:

#### a) Navegação Superior
- Logo SPL à esquerda
- Avatar do usuário à direita
- Botão de logout

#### b) Saudação Personalizada
- Título com primeiro nome do usuário
- Subtítulo descritivo

#### c) Linhas de Cuidado Ativas
- Cards horizontais com:
  - Borda colorida à esquerda (cor da linha)
  - Ícone de coração na cor da linha
  - Nome e descrição da linha
  - Fundo branco com sombra suave

#### d) Cards de Resumo
- 3 cards em grid responsivo:
  - **IMC**: Mostra valor calculado e badge de classificação
  - **Nível de Atividade**: Texto descritivo
  - **Próxima Etapa**: Orientação para consulta
- Cada card com ícone no topo

#### e) Recomendações Personalizadas
- Lista de cards de recomendações
- Cada card com:
  - Barra colorida à esquerda (cor da linha)
  - Badge identificando a linha de cuidado
  - Título e descrição
  - Efeito hover com sombra

#### f) Metas Semanais
- Card separado com checkboxes
- Lista de metas genéricas

## Componentes UI

### Badges
- Cor de fundo da linha de cuidado
- Texto branco
- Bordas arredondadas
- Tamanho pequeno (`text-xs`)

### Cards
- Fundo branco
- Bordas arredondadas (`rounded-lg`)
- Sombra suave (`shadow-sm`)
- Padding consistente (`p-6` ou `p-5`)

### Inputs
- Altura padrão: `38px`
- Borda fina: `border-[0.5px]`
- Bordas arredondadas: `rounded-lg`
- Borda vermelha em caso de erro

### Botões Primários
- Altura: `42px`
- Cor de fundo: `#1E6F5C`
- Texto branco
- Largura total em formulários
- Bordas arredondadas

## Ícones

Usando `lucide-react`:
- **Plus**: Logo SPL
- **ClipboardList**: Triagem
- **Heart**: Linhas de cuidado
- **TrendingUp**: IMC
- **Activity**: Nível de atividade
- **AlertCircle**: Próxima etapa
- **LogOut**: Sair

## Responsividade

- **Mobile First**: Design começa em 375px
- **Breakpoint MD**: 768px para grid de 3 colunas
- **Container Max Width**: 
  - Formulários: 420-520px
  - Dashboard: 900px

## Tipografia

- **Títulos Principais**: `text-2xl` ou `text-3xl`, `font-semibold`
- **Subtítulos**: `text-xl`, `font-semibold`
- **Labels**: `text-sm`, `font-medium`
- **Corpo de texto**: `text-sm` ou base, `text-gray-600`
- **Texto secundário**: `text-xs`, `text-gray-500`

## Acessibilidade

- Todos os inputs com labels associados
- Navegação por teclado suportada
- Contraste de cores adequado
- Mensagens de erro claras e visíveis
- Feedback visual em todos os estados

## Estados Interativos

- **Hover**: Aumento de sombra em cards (`hover:shadow-md`)
- **Focus**: Borda destacada em inputs
- **Disabled**: Botão com opacidade reduzida
- **Loading**: Spinner ou skeleton (quando aplicável)

## Exemplo de Classificação

### Usuário com Diabetes e Obesidade
- **Linhas Ativas**: Diabética + Obesidade
- **Cores no Dashboard**: Roxo (#8b5cf6) e Âmbar (#f59e0b)
- **Recomendações**: União das duas linhas, sem duplicação

### Usuário Saudável e Ativo
- **Linhas Ativas**: Ativa
- **Cor no Dashboard**: Verde (#1E6F5C)
- **Recomendações**: Foco em prevenção e manutenção
