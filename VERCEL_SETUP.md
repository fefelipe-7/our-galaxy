# Deploy no Vercel - Our Galaxy

## Problemas Corrigidos

✅ TailwindCSS configurado para produção (PostCSS)
✅ Variáveis de ambiente configuradas
✅ CSS local compilado (não CDN)
✅ Arquivo `vercel.json` criado

## Configurar Variáveis de Ambiente no Vercel

1. Acesse seu projeto no Vercel: https://vercel.com/dashboard
2. Vá para **Settings > Environment Variables**
3. Adicione as seguintes variáveis:

```
VITE_SUPABASE_URL=https://jbwqbfjrnjcfezijwets.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_baKgxZ7HHjCO7ET5qtLZuA_d7cR8DiU
VITE_GEMINI_API_KEY=(deixe em branco ou adicione sua chave)
```

4. Clique em **Save**

## Fazer Deploy Novamente

### Opção 1: Via GitHub (Recomendado)
```bash
git push origin main
```
O Vercel detectará a mudança e fará o deploy automaticamente.

### Opção 2: Via CLI do Vercel
```bash
npm install -g vercel
vercel
```

## Verificar o Deploy

1. Acesse o dashboard do Vercel
2. Aguarde o build completar (deve levar 1-2 minutos)
3. Clique no link de preview quando estiver pronto
4. Verifique se o app carrega corretamente

## Se Ainda Houver Problemas

### Verificar Logs do Build
1. No Vercel, clique em **Deployments**
2. Selecione o deploy mais recente
3. Clique em **View Build Logs**
4. Procure por erros

### Limpar Cache do Navegador
- Pressione `Ctrl+Shift+Delete` (ou `Cmd+Shift+Delete` no Mac)
- Limpe o cache
- Recarregue a página

### Verificar Variáveis de Ambiente
Certifique-se de que as variáveis estão configuradas em:
- **Settings > Environment Variables**
- Não em **Settings > Build & Development Settings**

## Estrutura de Build

```
npm install          # Instala dependências
npm run build        # Compila o projeto
dist/                # Pasta de saída (servida pelo Vercel)
```

## Checklist Final

- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Código feito push para GitHub
- [ ] Deploy completado sem erros
- [ ] App carrega corretamente
- [ ] Supabase conectando (sem erro "supabaseUrl is required")
- [ ] Estilos carregando (sem erro "index.css 404")
