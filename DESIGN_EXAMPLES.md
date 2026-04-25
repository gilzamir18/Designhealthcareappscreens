# Exemplos de Design - SPL

## Cenários de Uso

### Cenário 1: Usuário com Diabetes (UC-03)
**Dados:**
- Nome: João Silva
- Peso: 82kg, Altura: 175cm
- IMC: 26,8 (Sobrepeso)
- Condições: Diabetes
- Medicamentos: Sim
- Atividade: Levemente ativo

**Dashboard:**
- **Linha Ativa**: Diabética (roxo #8b5cf6)
- **Badge IMC**: Amarelo "Sobrepeso"
- **Recomendações**: 4 cards com borda roxa
  1. Monitore sua glicemia regularmente
  2. Alimentação de baixo índice glicêmico
  3. Pratique exercícios aeróbicos
  4. Tome seus medicamentos regularmente

---

### Cenário 2: Usuário com Múltiplas Linhas (UC-04)
**Dados:**
- Nome: Maria Souza
- Peso: 95kg, Altura: 162cm
- IMC: 36,2 (Obesidade Grau II)
- Condições: Diabetes, Obesidade
- Medicamentos: Sim
- Atividade: Sedentária

**Dashboard:**
- **Linhas Ativas**: 
  - Diabética (roxo #8b5cf6)
  - Obesidade (âmbar #f59e0b)
- **Badge IMC**: Vermelho "Obesidade Grau II"
- **Recomendações**: 8 cards mesclados
  - 4 da linha Diabética (borda roxa)
  - 4 da linha Obesidade (borda âmbar)
  - Deduplicação automática de conteúdos comuns

---

### Cenário 3: Usuário Saudável e Ativo (UC-05)
**Dados:**
- Nome: Carlos Lima
- Peso: 72kg, Altura: 178cm
- IMC: 22,7 (Normal)
- Condições: Nenhuma
- Medicamentos: Não
- Atividade: Moderadamente ativo

**Dashboard:**
- **Linha Ativa**: Ativa (verde #1E6F5C)
- **Badge IMC**: Verde "Normal"
- **Recomendações**: 4 cards com borda verde
  1. Mantenha-se ativo
  2. Hidratação constante
  3. Check-up anual preventivo
  4. Alimentação equilibrada

---

### Cenário 4: Usuário com Hipertensão
**Dados:**
- Nome: Ana Costa
- Peso: 68kg, Altura: 165cm
- IMC: 25,0 (Sobrepeso)
- Condições: Hipertensão
- Medicamentos: Sim
- Atividade: Levemente ativo

**Dashboard:**
- **Linha Ativa**: Hipertensos (vermelho #ef4444)
- **Badge IMC**: Amarelo "Sobrepeso"
- **Recomendações**: 4 cards com borda vermelha
  1. Monitore sua pressão arterial
  2. Reduza o consumo de sal
  3. Controle do estresse
  4. Exercícios moderados regulares

---

## Fluxo Completo de Navegação

```
┌─────────────┐
│   Cadastro  │  ← Rota: /
│  (SignUp)   │
└──────┬──────┘
       │
       ↓ (após cadastro)
┌─────────────┐
│   Triagem   │  ← Rota: /triagem
│(HealthIntake)│
└──────┬──────┘
       │
       ↓ (após completar)
┌─────────────┐
│  Dashboard  │  ← Rota: /dashboard
│(Personalizado)│
└─────────────┘
```

---

## Anatomia de um Card de Recomendação

```
┌─────────────────────────────────────────────┐
│ │ [Badge Linha]                             │
│█│ Título da Recomendação                    │
│█│ ────────────────────────────────          │
│█│ Descrição detalhada da recomendação      │
│ │ explicando o que fazer e por quê...      │
└─────────────────────────────────────────────┘
 │
 └─ Barra colorida (cor da linha de cuidado)
```

---

## Hierarquia Visual

### Nível 1 - Navegação
- Background: Branco
- Altura: 60px
- Elementos: Logo + Avatar + Logout

### Nível 2 - Saudação
- Título grande: "Olá, [Nome]"
- Subtítulo: Descrição contextual

### Nível 3 - Linhas de Cuidado
- Cards horizontais com visual destacado
- Cor da linha como elemento principal

### Nível 4 - Resumo de Saúde
- Grid de 3 colunas (desktop)
- Cards compactos com ícones

### Nível 5 - Recomendações
- Lista vertical de cards
- Diferenciação por cor da linha
- Badges identificadores

### Nível 6 - Metas
- Card único com checkboxes
- Interação futura

---

## Responsividade

### Mobile (< 768px)
```
┌──────────────┐
│ Nav (stack)  │
├──────────────┤
│ Saudação     │
├──────────────┤
│ Linha 1      │
│ Linha 2      │
├──────────────┤
│ Card IMC     │
│ Card Ativ.   │
│ Card Etapa   │
├──────────────┤
│ Recomend. 1  │
│ Recomend. 2  │
│ ...          │
└──────────────┘
```

### Desktop (≥ 768px)
```
┌─────────────────────────────────┐
│      Nav (horizontal)           │
├─────────────────────────────────┤
│      Saudação                   │
├─────────────────────────────────┤
│ Linha 1    │    Linha 2         │
├──────┬──────┬──────────────┬────┤
│ IMC  │ Ativ.│  Etapa       │    │
├──────┴──────┴──────────────┴────┤
│ Recomendação 1                  │
│ Recomendação 2                  │
│ ...                             │
└─────────────────────────────────┘
```

---

## Animações e Transições

- **Cards**: `transition-shadow` no hover
- **Progress Bar**: `transition-all` na mudança
- **Botões**: Feedback visual instantâneo
- **Formulários**: Validação em tempo real

---

## Acessibilidade WCAG

- ✅ Contraste mínimo 4.5:1 para texto
- ✅ Navegação por teclado completa
- ✅ Labels associados a inputs
- ✅ Estados de foco visíveis
- ✅ Mensagens de erro descritivas
- ✅ Ícones com significado visual + textual
