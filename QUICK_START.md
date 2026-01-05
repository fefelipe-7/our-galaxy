# Quick Start - Our Galaxy com Supabase

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Criar Projeto Supabase
```
1. Acesse https://supabase.com
2. Clique em "New Project"
3. Preencha os dados
4. Aguarde a criação (2-3 minutos)
```

### 2️⃣ Copiar Credenciais
```
1. Vá para Settings > API
2. Copie "Project URL" → VITE_SUPABASE_URL
3. Copie "anon public" key → VITE_SUPABASE_ANON_KEY
```

### 3️⃣ Atualizar .env.local
```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
VITE_GEMINI_API_KEY=sua-chave-gemini
```

### 4️⃣ Executar Scripts SQL
```
1. No painel Supabase, vá para SQL Editor
2. Crie uma nova query
3. Copie TODO o conteúdo de SUPABASE_SETUP.md
4. Execute (Ctrl + Enter)
```

### 5️⃣ Instalar e Rodar
```bash
npm install
npm run dev
```

### 6️⃣ Testar
```
1. Acesse http://localhost:5173
2. Clique em "Entrar no silêncio"
3. Clique em "Criar conta"
4. Registre-se com email e senha
5. Pronto! 🎉
```

## 📋 Checklist de Configuração

- [ ] Projeto Supabase criado
- [ ] Credenciais copiadas
- [ ] `.env.local` atualizado
- [ ] Scripts SQL executados
- [ ] `npm install` rodado
- [ ] `npm run dev` funcionando
- [ ] Autenticação testada

## 🎯 Próximos Passos (Após Setup)

1. **Integrar Hooks nas Páginas**
   - Abra `IMPLEMENTATION_EXAMPLES.md`
   - Copie os exemplos para suas páginas
   - Teste cada funcionalidade

2. **Configurar Relacionamentos**
   - Defina qual é o "recipient_id" padrão
   - Implemente seletor de destinatário

3. **Adicionar Funcionalidades**
   - Upload de imagens
   - Integração Gemini
   - Notificações

## 🆘 Problemas Comuns

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install
```

### "VITE_SUPABASE_URL is not defined"
- Verifique `.env.local`
- Reinicie o servidor (`npm run dev`)

### "Unauthorized" ao fazer login
- Verifique se Email Auth está habilitado em Supabase
- Confirme que as credenciais estão corretas

### Dados não aparecem
- Verifique RLS policies em Supabase
- Confirme que o usuário está logado

## 📚 Documentação

- `SUPABASE_SETUP.md` - Setup completo com SQL
- `INTEGRATION_GUIDE.md` - Como usar os hooks
- `IMPLEMENTATION_EXAMPLES.md` - Exemplos de código
- `SUPABASE_STRUCTURE.md` - Visão geral da estrutura

## 🚀 Você Está Pronto!

A estrutura está 100% pronta. Agora é só:
1. Fornecer as credenciais do Supabase
2. Executar os scripts SQL
3. Começar a usar!

Qualquer dúvida, consulte a documentação ou o arquivo `INTEGRATION_GUIDE.md`.
