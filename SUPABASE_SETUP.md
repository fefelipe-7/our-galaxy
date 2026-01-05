# Configuração do Supabase - Our Galaxy

## Passo 1: Criar o Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto
4. Copie as credenciais:
   - `VITE_SUPABASE_URL` (URL do projeto)
   - `VITE_SUPABASE_ANON_KEY` (Chave anônima)

## Passo 2: Adicionar as Credenciais

Atualize o arquivo `.env.local` com as credenciais do Supabase:

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
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);
```

### 3.2 Criar Tabela de Cartas

```sql
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'enviada' CHECK (status IN ('enviada', 'lida')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their letters"
  ON letters FOR SELECT
  USING (auth.uid() = author_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create letters"
  ON letters FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their received letters"
  ON letters FOR UPDATE
  USING (auth.uid() = recipient_id);

CREATE INDEX idx_letters_author_id ON letters(author_id);
CREATE INDEX idx_letters_recipient_id ON letters(recipient_id);
CREATE INDEX idx_letters_created_at ON letters(created_at DESC);
```

### 3.3 Criar Tabela de Faltas (Absences)

```sql
CREATE TABLE absences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE absences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own absences"
  ON absences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create absences"
  ON absences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their absences"
  ON absences FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_absences_user_id ON absences(user_id);
CREATE INDEX idx_absences_created_at ON absences(created_at DESC);
```

### 3.4 Criar Tabela de Momentos

```sql
CREATE TABLE moments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  image_url TEXT NOT NULL,
  date TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE moments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own moments"
  ON moments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create moments"
  ON moments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their moments"
  ON moments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their moments"
  ON moments FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_moments_user_id ON moments(user_id);
CREATE INDEX idx_moments_date ON moments(date DESC);
```

### 3.5 Criar Tabela de Localizações

```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  distance_km DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own locations"
  ON locations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create locations"
  ON locations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their locations"
  ON locations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their locations"
  ON locations FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_locations_user_id ON locations(user_id);
CREATE INDEX idx_locations_created_at ON locations(created_at DESC);
```

## Passo 4: Habilitar Autenticação

1. No painel do Supabase, vá para **Authentication > Providers**
2. Habilite **Email** (já deve estar habilitado por padrão)
3. Configure as opções conforme necessário

## Passo 5: Configurar Storage (Opcional - para upload de imagens)

1. Vá para **Storage** no painel do Supabase
2. Crie um novo bucket chamado `moments`
3. Configure as políticas de acesso conforme necessário

## Passo 6: Instalar Dependências

```bash
npm install
```

## Passo 7: Iniciar o Desenvolvimento

```bash
npm run dev
```

## Estrutura de Dados

### Tabela: users
- `id` (UUID) - ID do usuário (vinculado ao auth.users)
- `email` (TEXT) - Email do usuário
- `created_at` (TIMESTAMP) - Data de criação

### Tabela: letters
- `id` (UUID) - ID da carta
- `content` (TEXT) - Conteúdo da carta
- `author_id` (UUID) - ID do autor
- `recipient_id` (UUID) - ID do destinatário
- `status` (TEXT) - 'enviada' ou 'lida'
- `created_at` (TIMESTAMP) - Data de criação
- `updated_at` (TIMESTAMP) - Data de atualização

### Tabela: absences
- `id` (UUID) - ID da falta
- `text` (TEXT) - Texto da falta
- `user_id` (UUID) - ID do usuário
- `created_at` (TIMESTAMP) - Data de criação

### Tabela: moments
- `id` (UUID) - ID do momento
- `text` (TEXT) - Descrição do momento
- `image_url` (TEXT) - URL da imagem
- `date` (TEXT) - Data do momento
- `user_id` (UUID) - ID do usuário
- `created_at` (TIMESTAMP) - Data de criação

### Tabela: locations
- `id` (UUID) - ID da localização
- `title` (TEXT) - Título da localização
- `description` (TEXT) - Descrição
- `latitude` (DECIMAL) - Latitude
- `longitude` (DECIMAL) - Longitude
- `distance_km` (DECIMAL) - Distância em km
- `image_url` (TEXT) - URL da imagem
- `user_id` (UUID) - ID do usuário
- `created_at` (TIMESTAMP) - Data de criação

## Notas de Segurança

- Todas as tabelas têm RLS (Row Level Security) habilitado
- Cada usuário só pode ver seus próprios dados
- As políticas garantem que apenas o proprietário pode modificar seus dados
- Índices foram criados para otimizar as consultas mais comuns
