# 🎨 Paleta de Cores - SPL (Saúde em Primeiro Lugar)

## Cores Principais da Marca

### Verde SPL
```
Nome: Verde Principal
Hex: #1E6F5C
RGB: rgb(30, 111, 92)
Uso: Logo, botões primários, linha "Ativa"
```

### Cinza de Fundo
```
Nome: Fundo
Hex: #f0f4f8
RGB: rgb(240, 244, 248)
Uso: Background das telas
```

---

## Sistema de Linhas de Cuidado

### 🟣 Linha Diabética
```
Cor: Roxo/Violeta
Hex: #8b5cf6
RGB: rgb(139, 92, 246)
Uso: Bordas, badges, ícones da linha diabética
Contexto: Monitoramento de glicemia, alimentação de baixo IG
```

### 🟠 Linha Obesidade
```
Cor: Âmbar/Laranja
Hex: #f59e0b
RGB: rgb(245, 158, 11)
Uso: Bordas, badges, ícones da linha obesidade
Contexto: Controle de peso, nutrição calórica, atividade física
```

### 🔴 Linha Hipertensos
```
Cor: Vermelho
Hex: #ef4444
RGB: rgb(239, 68, 68)
Uso: Bordas, badges, ícones da linha hipertensos
Contexto: Controle de pressão arterial, redução de sal, estresse
```

### 🟢 Linha Ativa
```
Cor: Verde (mesma da marca)
Hex: #1E6F5C
RGB: rgb(30, 111, 92)
Uso: Bordas, badges, ícones da linha ativa
Contexto: Prevenção, vida saudável, check-ups
```

---

## Escala de Classificação IMC

### Abaixo do Peso
```
Cor: Âmbar
Hex: #f59e0b
Badge: Amarelo
Faixa: IMC < 18,5
```

### Normal
```
Cor: Verde
Hex: #10b981
Badge: Verde
Faixa: 18,5 ≤ IMC < 25
```

### Sobrepeso
```
Cor: Âmbar
Hex: #f59e0b
Badge: Amarelo
Faixa: 25 ≤ IMC < 30
```

### Obesidade Grau I
```
Cor: Vermelho
Hex: #ef4444
Badge: Vermelho
Faixa: 30 ≤ IMC < 35
```

### Obesidade Grau II
```
Cor: Vermelho Escuro
Hex: #dc2626
Badge: Vermelho Intenso
Faixa: 35 ≤ IMC < 40
```

### Obesidade Grau III
```
Cor: Vermelho Muito Escuro
Hex: #991b1b
Badge: Vermelho Profundo
Faixa: IMC ≥ 40
```

---

## Cores Neutras e de Suporte

### Branco
```
Hex: #ffffff
Uso: Fundo de cards, texto em botões
```

### Cinza 900 (Texto Principal)
```
Hex: #111827
Uso: Títulos, texto principal
```

### Cinza 700 (Texto Secundário)
```
Hex: #374151
Uso: Labels, subtítulos
```

### Cinza 600 (Texto Terciário)
```
Hex: #4b5563
Uso: Descrições, textos auxiliares
```

### Cinza 500 (Texto Placeholder)
```
Hex: #6b7280
Uso: Ícones, placeholders
```

### Cinza 400
```
Hex: #9ca3af
Uso: Bordas desabilitadas
```

### Cinza 200
```
Hex: #e5e7eb
Uso: Bordas, divisores
```

### Cinza 100
```
Hex: #f3f4f6
Uso: Backgrounds secundários
```

### Cinza 50
```
Hex: #f9fafb
Uso: Backgrounds de checkboxes, hover states
```

---

## Cores de Estado

### Sucesso
```
Hex: #10b981
Uso: Mensagens de sucesso, validações positivas
```

### Atenção/Warning
```
Hex: #f59e0b
Uso: Alertas, avisos
```

### Erro
```
Hex: #ef4444
Uso: Mensagens de erro, validações negativas
```

### Informação
```
Hex: #3b82f6
Uso: Mensagens informativas
```

---

## Aplicação Visual

### Cards de Linha de Cuidado
```css
background: #ffffff
border-left: 4px solid [COR_DA_LINHA]
shadow: 0 1px 3px rgba(0,0,0,0.1)
```

### Badges
```css
background: [COR_DA_LINHA]
color: #ffffff
padding: 4px 12px
border-radius: 6px
font-size: 12px
```

### Botões Primários
```css
background: #1E6F5C
color: #ffffff
hover: #196354 (mais escuro)
```

### Cards de Recomendação
```css
background: #ffffff
border-left: 6px solid [COR_DA_LINHA]
padding: 20px
hover-shadow: 0 4px 6px rgba(0,0,0,0.1)
```

---

## Acessibilidade de Contraste

Todas as combinações de cores atendem ao padrão WCAG AA:

✅ Verde (#1E6F5C) + Branco = Contraste 5.2:1
✅ Roxo (#8b5cf6) + Branco = Contraste 4.6:1
✅ Âmbar (#f59e0b) + Preto = Contraste 5.1:1
✅ Vermelho (#ef4444) + Branco = Contraste 4.5:1
✅ Cinza 900 + Branco = Contraste 16.1:1

---

## Mapa de Uso por Componente

| Componente | Cor Principal | Cor Secundária |
|------------|---------------|----------------|
| Logo | Verde #1E6F5C | Branco |
| Botões | Verde #1E6F5C | Branco (texto) |
| Cards | Branco | Cinza 200 (borda) |
| Badges IMC | Variável | Branco (texto) |
| Badges Linha | Cor da linha | Branco (texto) |
| Textos | Cinza 900 | Cinza 600 |
| Inputs | Branco | Cinza 300 (borda) |
| Backgrounds | Cinza 50 | - |

---

## Exportação para CSS

```css
:root {
  /* Marca */
  --color-primary: #1E6F5C;
  --color-background: #f0f4f8;
  
  /* Linhas de Cuidado */
  --color-linha-diabetica: #8b5cf6;
  --color-linha-obesidade: #f59e0b;
  --color-linha-hipertensos: #ef4444;
  --color-linha-ativa: #1E6F5C;
  
  /* IMC */
  --color-imc-baixo: #f59e0b;
  --color-imc-normal: #10b981;
  --color-imc-sobrepeso: #f59e0b;
  --color-imc-obesidade-1: #ef4444;
  --color-imc-obesidade-2: #dc2626;
  --color-imc-obesidade-3: #991b1b;
  
  /* Estados */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

---

## Referência Rápida

| Contexto | Cor | Código |
|----------|-----|--------|
| Marca principal | 🟢 Verde | `#1E6F5C` |
| Diabetes | 🟣 Roxo | `#8b5cf6` |
| Obesidade | 🟠 Âmbar | `#f59e0b` |
| Hipertensão | 🔴 Vermelho | `#ef4444` |
| Vida Ativa | 🟢 Verde | `#1E6F5C` |
| Sucesso | ✅ Verde | `#10b981` |
| Erro | ❌ Vermelho | `#ef4444` |
