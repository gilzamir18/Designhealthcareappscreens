# SPL - Saúde em Primeiro Lugar

Aplicação web de saúde para cadastro de usuários, triagem de saúde e acompanhamento personalizado.

## 🎯 Funcionalidades

- **Cadastro de Usuário**: Formulário completo com validação e máscaras para CPF e telefone
- **Triagem de Saúde**: Coleta de dados de saúde com indicador de progresso
- **Dashboard Personalizado**: Resumo de saúde com cálculo de IMC e recomendações personalizadas
- **Persistência de Dados**: Armazenamento local no navegador

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou pnpm

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/spl-saude.git
cd spl-saude
```

2. Instale as dependências:
```bash
npm install
```

3. Execute em modo desenvolvimento:
```bash
npm run dev
```

4. Abra no navegador:
```
http://localhost:5173
```

## 📦 Build para Produção

Para gerar os arquivos otimizados:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/` e estarão prontos para deploy.

## 🌐 Deploy

### Netlify
1. Faça fork/clone deste repositório
2. Conecte sua conta Netlify ao GitHub
3. Selecione o repositório
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy automático!

### Vercel
1. Importe o projeto no Vercel
2. Deploy automático (detecta configurações automaticamente)

### GitHub Pages
1. Configure GitHub Actions para build
2. Publique a pasta `dist` no branch `gh-pages`

## 🛠️ Tecnologias

- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **React Router 7** - Navegação
- **Tailwind CSS 4** - Estilização
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Vite** - Build tool

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── SignUp.tsx          # Tela de cadastro
│   │   ├── HealthIntake.tsx    # Tela de triagem
│   │   ├── Dashboard.tsx       # Dashboard do usuário
│   │   ├── Login.tsx           # Tela de login
│   │   └── ui/                 # Componentes UI reutilizáveis
│   ├── contexts/
│   │   └── UserContext.tsx     # Context de gerenciamento de usuário
│   ├── utils/
│   │   └── masks.ts            # Máscaras para CPF e telefone
│   ├── App.tsx                 # Componente principal
│   └── routes.tsx              # Configuração de rotas
└── styles/
    ├── index.css
    ├── tailwind.css
    ├── theme.css
    └── fonts.css
```

## 🎨 Design

- **Cor Primária**: #1E6F5C (Verde escuro)
- **Background**: #f0f4f8 (Cinza claro)
- **Estilo**: Minimalista, flat design
- **Responsivo**: Funciona em desktop e mobile

## 📝 Licença

Este projeto é de código aberto para fins educacionais.

## ⚠️ Aviso

Esta é uma aplicação de demonstração. Não utilize para armazenar dados médicos reais ou informações sensíveis. Para uso em produção, implemente:
- Autenticação segura com backend
- Criptografia de dados sensíveis
- Conformidade com LGPD
- Backup e recuperação de dados
