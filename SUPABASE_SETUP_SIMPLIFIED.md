# Configuração Simplificada do Supabase - Our Galaxy

## Conceito
- **Sem autenticação** - qualquer pessoa pode usar
- **Cartas com destinatários** - escolhe para quem enviar antes de escrever
- **Sistema de likes** - autor dá like automaticamente ao enviar, destinatário dá like ao ler
- **Cartas eternizadas** - com 2 likes, a carta fica com design especial

## Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto
4. Copie as credenciais:
   - `VITE_SUPABASE_URL` (URL do projeto)
   - `VITE_SUPABASE_ANON_KEY` (Chave anônima)

## Passo 2: Adicionar as Credenciais

Atualize o arquivo `.env.local`:

```
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

## Passo 3: Executar os Scripts SQL

No painel do Supabase, vá para **SQL Editor** e execute os seguintes scripts:

### 3.1 Criar Tabela de Usuários

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3.2 Criar Tabela de Cartas

```sql
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  is_eternized BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_letters_created_at ON letters(created_at DESC);
CREATE INDEX idx_letters_recipient_name ON letters(recipient_name);
CREATE INDEX idx_letters_is_eternized ON letters(is_eternized);
```

### 3.3 Criar Tabela de Likes

```sql
CREATE TABLE letter_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  letter_id UUID NOT NULL REFERENCES letters(id) ON DELETE CASCADE,
  liker_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(letter_id, liker_name)
);

CREATE INDEX idx_letter_likes_letter_id ON letter_likes(letter_id);
CREATE INDEX idx_letter_likes_liker_name ON letter_likes(liker_name);
```

### 3.4 Criar Tabela de Faltas (Absences)

```sql
CREATE TABLE absences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_absences_user_name ON absences(user_name);
CREATE INDEX idx_absences_created_at ON absences(created_at DESC);
```

### 3.5 Criar Tabela de Momentos

```sql
CREATE TABLE moments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  image_url TEXT NOT NULL,
  date TEXT NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_moments_user_name ON moments(user_name);
CREATE INDEX idx_moments_date ON moments(date DESC);
```

## Passo 4: Habilitar RLS (Opcional - para segurança)

Se quiser adicionar segurança básica:

```sql
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE letter_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE absences ENABLE ROW LEVEL SECURITY;
ALTER TABLE moments ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública
CREATE POLICY "Allow public read" ON letters FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON letter_likes FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON absences FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON moments FOR SELECT USING (true);

-- Permitir insert público
CREATE POLICY "Allow public insert" ON letters FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON letter_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON absences FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON moments FOR INSERT WITH CHECK (true);
```

## Passo 5: Instalar Dependências

```bash
npm install
```

## Passo 6: Iniciar Desenvolvimento

```bash
npm run dev
```

## Estrutura de Dados

### Tabela: users
- `id` (UUID) - ID único
- `name` (TEXT) - Nome do usuário
- `created_at` (TIMESTAMP) - Data de criação

### Tabela: letters
- `id` (UUID) - ID da carta
- `content` (TEXT) - Conteúdo da carta
- `author_name` (TEXT) - Nome de quem escreveu
- `recipient_name` (TEXT) - Nome de quem vai receber
- `likes_count` (INTEGER) - Número de likes (0, 1 ou 2+)
- `is_eternized` (BOOLEAN) - Se tem 2+ likes
- `created_at` (TIMESTAMP) - Data de criação
- `updated_at` (TIMESTAMP) - Data de atualização

### Tabela: letter_likes
- `id` (UUID) - ID do like
- `letter_id` (UUID) - Referência à carta
- `liker_name` (TEXT) - Nome de quem curtiu
- `created_at` (TIMESTAMP) - Data do like

### Tabela: absences
- `id` (UUID) - ID da falta
- `text` (TEXT) - Texto da falta
- `user_name` (TEXT) - Nome do usuário
- `created_at` (TIMESTAMP) - Data de criação

### Tabela: moments
- `id` (UUID) - ID do momento
- `text` (TEXT) - Descrição do momento
- `image_url` (TEXT) - URL da imagem
- `date` (TEXT) - Data do momento
- `user_name` (TEXT) - Nome do usuário
- `created_at` (TIMESTAMP) - Data de criação

## Fluxo de Uso

1. **Usuário abre o app** → Vê lista de cartas
2. **Clica em "Escrever"** → Vai para tela de seleção de destinatário
3. **Seleciona destinatário** → Vai para tela de escrita
4. **Escreve e envia** → Carta é criada com 1 like (automático do autor)
5. **Outro usuário lê** → Pode dar like
6. **Com 2 likes** → Carta é "eternizada" (design especial)

## Notas de Segurança

- Sem autenticação, qualquer pessoa pode criar cartas
- O sistema usa nomes de usuários, não IDs
- Cada pessoa só pode dar like uma vez por carta (UNIQUE constraint)
- RLS é opcional mas recomendado para produção
