# 🏥 SPL - Saúde em Primeiro Lugar
## Design UI/UX - Telas de Triagem e Dashboard

> Sistema de triagem e acompanhamento personalizado de pacientes com design moderno, acessível e harmonioso.

---

## 📋 O que foi implementado

### ✅ Tela de Triagem (HealthIntake)
- 🎨 Logo SPL centralizado mantendo identidade visual
- 📊 Indicador de progresso visual (Etapa 1 de 2)
- 📝 Ícone de clipboard indicando processo de coleta de dados
- ✨ Checkboxes com fundo cinza claro para melhor legibilidade
- 📱 Design responsivo de 375px a desktop
- ♿ Totalmente acessível com labels e navegação por teclado

### ✅ Dashboard Personalizado
Implementado conforme requisitos RF-18 a RF-24 do documento:

#### 1️⃣ Seção de Linhas de Cuidado Ativas
- Cards horizontais mostrando quais linhas o usuário pertence
- Cada linha com cor própria para identificação rápida:
  - 🟣 **Diabética** - Roxo `#8b5cf6`
  - 🟠 **Obesidade** - Âmbar `#f59e0b`
  - 🔴 **Hipertensos** - Vermelho `#ef4444`
  - 🟢 **Ativa** - Verde `#1E6F5C`

#### 2️⃣ Cards de Resumo
- **IMC** com cálculo automático e classificação colorida
- **Nível de Atividade** com label descritivo
- **Próxima Etapa** com orientações
- Ícones visuais em cada card (TrendingUp, Activity, AlertCircle)

#### 3️⃣ Recomendações Personalizadas
- Sistema inteligente que mescla recomendações de todas as linhas ativas
- **Deduplicação automática** - remove conteúdos repetidos
- Cada card com:
  - Barra lateral colorida identificando a linha
  - Badge com nome da linha
  - Título e descrição específicos
  - Efeito hover com sombra

#### 4️⃣ Metas Semanais
- Seção com checkboxes para acompanhamento
- Metas genéricas aplicáveis a todos os perfis

---

## 🗂️ Arquitetura de Arquivos

```
src/app/
├── utils/
│   ├── linhasDeCuidado.ts    ← Classificação de usuários
│   ├── recomendacoes.ts       ← Recomendações por linha
│   └── masks.ts               ← Máscaras de CPF e telefone
├── components/
│   ├── Dashboard.tsx          ← ✨ Melhorado
│   ├── HealthIntake.tsx       ← ✨ Melhorado
│   ├── SignUp.tsx
│   ├── Login.tsx
│   └── ui/                    ← Componentes reutilizáveis
└── contexts/
    └── UserContext.tsx        ← Estado global do usuário
```

---

## 🎯 Requisitos Funcionais Atendidos

| ID | Descrição | Status |
|----|-----------|:------:|
| RF-12 | Cálculo automático de IMC | ✅ |
| RF-13 | Classificação em linhas de cuidado | ✅ |
| RF-14 | Armazenamento de linhas associadas | ✅ |
| RF-18 | Saudação personalizada com nome | ✅ |
| RF-19 | Resumo do perfil (IMC, linhas ativas) | ✅ |
| RF-20 | Recomendações geradas por linhas | ✅ |
| RF-21 | Diferenciação visual por cor | ✅ |
| RF-22 | Notificações personalizadas | ✅ |
| RF-23 | Múltiplas linhas sem duplicação | ✅ |
| RF-24 | Metas semanais (básico) | ✅ |

---

## 🎨 Sistema de Cores

### Paleta Principal
- **Verde SPL**: `#1E6F5C` - Marca e elementos principais
- **Fundo**: `#f0f4f8` - Background das telas

### Linhas de Cuidado
Cada linha possui cor única para facilitar identificação visual:

| Linha | Cor | Quando é ativada |
|-------|-----|------------------|
| 🟣 Diabética | `#8b5cf6` | Diagnóstico de diabetes |
| 🟠 Obesidade | `#f59e0b` | IMC ≥ 30 |
| 🔴 Hipertensos | `#ef4444` | Diagnóstico de hipertensão |
| 🟢 Ativa | `#1E6F5C` | Sem condições + atividade moderada/alta |

### IMC - Escala de Cores
- **< 18,5** - Abaixo do peso - `#f59e0b` (Amarelo)
- **18,5-24,9** - Normal - `#10b981` (Verde)
- **25-29,9** - Sobrepeso - `#f59e0b` (Amarelo)
- **30-34,9** - Obesidade I - `#ef4444` (Vermelho)
- **35-39,9** - Obesidade II - `#dc2626` (Vermelho escuro)
- **≥ 40** - Obesidade III - `#991b1b` (Vermelho intenso)

---

## 📊 Exemplos Visuais

### Cenário 1: Usuário com Diabetes
```
Dados: João Silva, 82kg, 175cm, diabetes

Dashboard mostra:
🟣 Linha Diabética ativa
📊 IMC: 26,8 (Sobrepeso - badge amarelo)
📋 4 Recomendações com borda roxa:
   • Monitore sua glicemia regularmente
   • Alimentação de baixo índice glicêmico
   • Pratique exercícios aeróbicos
   • Tome seus medicamentos regularmente
```

### Cenário 2: Múltiplas Linhas (Diabetes + Obesidade)
```
Dados: Maria Souza, 95kg, 162cm, diabetes + obesidade

Dashboard mostra:
🟣 Linha Diabética ativa
🟠 Linha Obesidade ativa
📊 IMC: 36,2 (Obesidade Grau II - badge vermelho)
📋 8 Recomendações mescladas:
   • 4 com borda roxa (Diabética)
   • 4 com borda âmbar (Obesidade)
   ✨ Deduplicação automática de conteúdos comuns
```

### Cenário 3: Usuário Saudável e Ativo
```
Dados: Carlos Lima, 72kg, 178cm, sem condições, moderadamente ativo

Dashboard mostra:
🟢 Linha Ativa
📊 IMC: 22,7 (Normal - badge verde)
📋 4 Recomendações preventivas com borda verde:
   • Mantenha-se ativo
   • Hidratação constante
   • Check-up anual preventivo
   • Alimentação equilibrada
```

---

## 🔄 Fluxo do Sistema

```
Cadastro (SignUp)
     ↓
Triagem (HealthIntake)
     ↓
Cálculo de IMC
     ↓
Classificação em Linhas
     ↓
Dashboard Personalizado
     ↓
Recomendações Customizadas
```

---

## 📱 Responsividade

### Mobile (< 768px)
- Cards empilhados verticalmente
- Linhas de cuidado em lista
- Grid de 1 coluna

### Desktop (≥ 768px)
- Grid de 3 colunas para resumo
- Linhas de cuidado horizontais
- Largura máxima de 900px

---

## ♿ Acessibilidade

✅ Contraste mínimo 4.5:1 (WCAG AA)  
✅ Navegação completa por teclado  
✅ Labels associados a todos inputs  
✅ Estados de foco visíveis  
✅ Mensagens de erro descritivas  
✅ Ícones com significado textual  

---

## 📚 Documentação Disponível

1. **`IMPLEMENTACAO_DESIGN.md`** - Documentação técnica completa
2. **`DESIGN_GUIDE.md`** - Guia de design e componentes
3. **`DESIGN_EXAMPLES.md`** - Exemplos visuais e cenários
4. **`PALETA_CORES.md`** - Paleta completa de cores com códigos

---

## 🚀 Como Usar

### Para testar localmente:
```bash
pnpm install
pnpm dev
```

### Navegação:
1. Acesse `/` para criar uma conta
2. Preencha o formulário de cadastro
3. Complete a triagem de saúde
4. Veja seu dashboard personalizado em `/dashboard`

---

## 🎯 Diferenciais

✨ **Sistema de Cores Semânticas** - Cada linha tem cor própria  
🧠 **Deduplicação Inteligente** - Evita repetições  
📈 **Escalável** - Fácil adicionar novas linhas  
🎨 **Design Harmonioso** - Consistente em todas as telas  
♿ **Acessível** - Atende padrões WCAG  
📱 **Responsivo** - Mobile-first  

---

## 👨‍💻 Tecnologias

- **React 18** + TypeScript
- **React Router** para navegação
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **localStorage** para persistência

---

## 📄 Licença

Uso interno - Trilha de Nivelamento Frontend

---

**Desenvolvido com ❤️ seguindo os requisitos do documento SPL v1.0**
