# Our Galaxy 🌙

Um espaço privado, lento e consciente para registrar sentimentos e memórias através de cartas.

## Conceito

- **Sem autenticação** - qualquer pessoa pode usar
- **Cartas com destinatários** - escolha para quem enviar antes de escrever
- **Sistema de likes** - autor dá like automaticamente ao enviar, destinatário dá like ao ler
- **Cartas eternizadas** - com 2 likes, a carta fica com design especial (mais fofo)

## Setup Rápido

### 1. Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie as credenciais:
   - `VITE_SUPABASE_URL` (URL do projeto)
   - `VITE_SUPABASE_ANON_KEY` (Chave anônima)

### 2. Configurar Variáveis de Ambiente

Atualize `.env.local`:

```
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

### 3. Executar Scripts SQL

No painel do Supabase, vá para **SQL Editor** e execute os scripts em `SUPABASE_SETUP_SIMPLIFIED.md`.

### 4. Instalar e Rodar

```bash
npm install
npm run dev
```

## Estrutura do Projeto

```
src/
├── lib/supabase.ts              # Configuração Supabase
├── services/letterService.ts    # Lógica de cartas e likes
├── hooks/useLetters.ts          # Hook React para cartas
└── types/index.ts               # Tipos TypeScript

pages/
├── Welcome.tsx                  # Página inicial
├── Home.tsx                     # Lista de cartas
├── LetterRead.tsx              # Ler carta + sistema de likes
└── LetterWrite.tsx             # Escrever carta (com seletor de destinatário)
```

## Fluxo de Uso

1. **Usuário abre o app** → Vê lista de cartas
2. **Clica em "Escrever"** → Tela de seleção de destinatário
3. **Seleciona destinatário** → Tela de escrita
4. **Escreve e envia** → Carta criada com 1 like (automático)
5. **Outro usuário lê** → Pode dar like
6. **Com 2 likes** → Carta é "eternizada" (design especial)

## Documentação

- `SUPABASE_SETUP_SIMPLIFIED.md` - Setup completo com SQL
