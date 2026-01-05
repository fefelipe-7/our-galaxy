# Guia de Integração - Supabase Our Galaxy

## Estrutura de Arquivos Criada

```
src/
├── lib/
│   └── supabase.ts                 # Configuração do cliente Supabase
├── services/
│   ├── authService.ts              # Serviço de autenticação
│   ├── letterService.ts            # Serviço de cartas
│   ├── absenceService.ts           # Serviço de faltas
│   ├── momentService.ts            # Serviço de momentos
│   └── locationService.ts          # Serviço de localizações
├── hooks/
│   ├── useAuth.ts                  # Hook de autenticação
│   ├── useLetters.ts               # Hook de cartas
│   ├── useAbsences.ts              # Hook de faltas
│   ├── useMoments.ts               # Hook de momentos
│   └── useLocations.ts             # Hook de localizações
├── contexts/
│   └── AuthContext.tsx             # Context de autenticação
├── types/
│   └── index.ts                    # Tipos TypeScript
└── pages/
    └── Auth.tsx                    # Página de autenticação
```

## Como Usar os Hooks

### 1. Autenticação

```typescript
import { useAuthContext } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, loading, signIn, signOut } = useAuthContext();

  const handleLogin = async () => {
    await signIn('user@example.com', 'password');
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      {user ? (
        <>
          <p>Bem-vindo, {user.email}</p>
          <button onClick={signOut}>Sair</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

### 2. Cartas

```typescript
import { useLetters } from '../hooks/useLetters';
import { useAuthContext } from '../contexts/AuthContext';

const LettersPage = () => {
  const { user } = useAuthContext();
  const { letters, loading, createLetter, updateLetterStatus } = useLetters(user?.id);

  const handleSendLetter = async () => {
    await createLetter('Conteúdo da carta', 'recipient-id');
  };

  const handleMarkAsRead = async (letterId: string) => {
    await updateLetterStatus(letterId, 'lida');
  };

  return (
    <div>
      {letters.map(letter => (
        <div key={letter.id}>
          <p>{letter.content}</p>
          <button onClick={() => handleMarkAsRead(letter.id)}>
            Marcar como lida
          </button>
        </div>
      ))}
    </div>
  );
};
```

### 3. Faltas

```typescript
import { useAbsences } from '../hooks/useAbsences';
import { useAuthContext } from '../contexts/AuthContext';

const AbsencesPage = () => {
  const { user } = useAuthContext();
  const { absences, createAbsence, deleteAbsence } = useAbsences(user?.id);
  const [text, setText] = useState('');

  const handleAddAbsence = async () => {
    await createAbsence(text);
    setText('');
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Senti falta de..."
      />
      <button onClick={handleAddAbsence}>Adicionar</button>

      {absences.map(absence => (
        <div key={absence.id}>
          <p>{absence.text}</p>
          <button onClick={() => deleteAbsence(absence.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
};
```

### 4. Momentos

```typescript
import { useMoments } from '../hooks/useMoments';
import { useAuthContext } from '../contexts/AuthContext';

const MomentsPage = () => {
  const { user } = useAuthContext();
  const { moments, createMoment, deleteMoment } = useMoments(user?.id);

  const handleAddMoment = async () => {
    await createMoment(
      'Descrição do momento',
      'https://example.com/image.jpg',
      '2024-01-05'
    );
  };

  return (
    <div>
      <button onClick={handleAddMoment}>Novo Momento</button>
      {moments.map(moment => (
        <div key={moment.id}>
          <img src={moment.image_url} alt={moment.text} />
          <p>{moment.text}</p>
          <button onClick={() => deleteMoment(moment.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
};
```

### 5. Localizações

```typescript
import { useLocations } from '../hooks/useLocations';
import { useAuthContext } from '../contexts/AuthContext';

const LocationsPage = () => {
  const { user } = useAuthContext();
  const { locations, createLocation } = useLocations(user?.id);

  const handleAddLocation = async () => {
    await createLocation(
      'Nome do lugar',
      'Descrição',
      -23.5505,
      -46.6333,
      12.5,
      'https://example.com/map.jpg'
    );
  };

  return (
    <div>
      <button onClick={handleAddLocation}>Nova Localização</button>
      {locations.map(location => (
        <div key={location.id}>
          <h3>{location.title}</h3>
          <p>{location.description}</p>
          <p>{location.distance_km} km de distância</p>
        </div>
      ))}
    </div>
  );
};
```

## Próximos Passos

1. **Configurar Supabase**
   - Criar projeto em supabase.com
   - Executar scripts SQL do `SUPABASE_SETUP.md`
   - Copiar credenciais para `.env.local`

2. **Atualizar Páginas Existentes**
   - Substituir dados mock pelos hooks
   - Adicionar funcionalidades de CRUD
   - Implementar tratamento de erros

3. **Adicionar Funcionalidades Extras**
   - Upload de imagens para Storage
   - Integração com Gemini API
   - Notificações em tempo real
   - Sincronização de dados

## Variáveis de Ambiente

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
VITE_GEMINI_API_KEY=sua-chave-gemini
```

## Tratamento de Erros

Todos os hooks retornam um estado `error` que pode ser usado para exibir mensagens:

```typescript
const { letters, error } = useLetters(userId);

if (error) {
  return <div className="error">{error}</div>;
}
```

## Autenticação Protegida

Para proteger rotas, você pode criar um componente ProtectedRoute:

```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/auth" />;

  return <>{children}</>;
};

// Uso:
<Route path="/home" element={<ProtectedRoute><Letters /></ProtectedRoute>} />
```

## Dicas de Performance

1. Use `useCallback` para funções que são passadas como props
2. Implemente paginação para listas grandes
3. Use índices no banco de dados (já configurados)
4. Considere usar `useMemo` para cálculos pesados
5. Implemente lazy loading para imagens

## Segurança

- Todas as tabelas têm RLS habilitado
- Cada usuário só vê seus próprios dados
- Senhas são gerenciadas pelo Supabase Auth
- Chaves de API estão em variáveis de ambiente
- Nunca commit `.env.local` no repositório
