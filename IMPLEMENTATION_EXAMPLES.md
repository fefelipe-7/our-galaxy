# Exemplos de Implementação - Páginas com Supabase

## Exemplo 1: Página de Cartas (Home.tsx) - Versão com Supabase

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, Mail } from 'lucide-react';
import { useLetters } from '../hooks/useLetters';
import { useAuthContext } from '../contexts/AuthContext';

const Letters: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { letters, loading, error } = useLetters(user?.id);
  const [recipientId] = useState('recipient-user-id'); // Isso virá de um seletor

  if (loading) {
    return (
      <div className="min-h-screen px-6 pt-12 flex items-center justify-center">
        <p className="text-cozy-sageDark">Carregando cartas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pt-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-cozy-sageDark text-sm font-bold tracking-wider mb-1">espaço privado</p>
          <h1 className="text-3xl font-serif text-cozy-deep font-bold">cartas</h1>
        </div>
        <button 
          onClick={() => navigate('/letter/write')}
          className="w-14 h-14 rounded-2xl bg-cozy-deep text-white shadow-float flex items-center justify-center hover:bg-cozy-charcoal active:scale-90 transition-all"
        >
          <PenTool size={22} />
        </button>
      </div>

      {error && (
        <div className="bg-cozy-clay/10 border border-cozy-clay/30 rounded-2xl p-4 mb-6">
          <p className="text-sm text-cozy-clay">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {letters.map((letter) => (
          <div 
            key={letter.id} 
            onClick={() => navigate(`/letter/read/${letter.id}`)}
            className="group relative cursor-pointer"
          >
            <div className={`absolute inset-0 bg-cozy-sage/20 opacity-40 rounded-[2rem] transform translate-y-2 group-hover:translate-y-3 transition-transform`}></div>
            <div className="relative bg-white p-6 rounded-[2rem] shadow-soft border border-cozy-sageLight/20 group-hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${letter.status === 'enviada' ? 'bg-cozy-sand' : 'bg-cozy-sage/20'} text-cozy-deep`}>
                    <Mail size={16} />
                  </div>
                  <span className="text-xs font-bold text-cozy-sageDark tracking-wider">{letter.status}</span>
                </div>
                <span className="text-sm font-bold text-cozy-sageDark">
                  {new Date(letter.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <h2 className="text-2xl font-serif text-cozy-deep mb-2">
                {letter.status === 'enviada' ? 'para você' : 'de alguém'}
              </h2>
              <p className="text-cozy-sageDark/80 line-clamp-1 font-serif italic">
                "{letter.content.substring(0, 50)}..."
              </p>
            </div>
          </div>
        ))}

        {letters.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-cozy-sand/50 rounded-full mx-auto flex items-center justify-center mb-4 text-cozy-sageDark">
              <Mail size={32} />
            </div>
            <p className="text-cozy-deep font-serif italic">o silêncio também é uma resposta.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Letters;
```

## Exemplo 2: Página de Escrita de Cartas (LetterWrite.tsx) - Versão com Supabase

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X } from 'lucide-react';
import { useLetters } from '../hooks/useLetters';
import { useAuthContext } from '../contexts/AuthContext';

const LetterWrite: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { createLetter, loading, error } = useLetters(user?.id);
  const [text, setText] = useState('');
  const [recipientId] = useState('recipient-user-id'); // Isso virá de um seletor

  const handleSend = async () => {
    if (text.length < 10) return;

    try {
      await createLetter(text, recipientId);
      navigate('/home');
    } catch (err) {
      console.error('Erro ao enviar carta:', err);
    }
  };

  return (
    <div className="min-h-screen bg-cozy-cream flex flex-col px-6 pt-10 pb-8">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/home')}
          className="text-sm font-bold text-cozy-sageDark hover:text-cozy-deep flex items-center gap-1 transition-colors"
        >
          <X size={18} /> cancelar
        </button>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] shadow-soft p-8 relative flex flex-col border border-cozy-sageLight/20">
        <label className="text-xs font-bold tracking-wider text-cozy-sage mb-6 block text-center">
          escreva só quando souber o que quer dizer.
        </label>
        
        <textarea
          autoFocus
          className="w-full flex-1 bg-transparent text-cozy-deep font-serif text-lg leading-loose outline-none resize-none placeholder-cozy-sageLight"
          placeholder="comece aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {error && (
          <div className="bg-cozy-clay/10 border border-cozy-clay/30 rounded-2xl p-3 mb-4">
            <p className="text-xs text-cozy-clay">{error}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleSend}
            disabled={text.length < 10 || loading}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${text.length > 10 ? 'bg-cozy-deep text-white hover:scale-105 active:scale-95' : 'bg-cozy-sand text-white cursor-not-allowed opacity-50'}`}
          >
            <Send size={24} className={text.length > 10 ? 'ml-1' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterWrite;
```

## Exemplo 3: Página de Faltas (Absences.tsx) - Versão com Supabase

```typescript
import React, { useState } from 'react';
import { Plus, Heart, Trash2 } from 'lucide-react';
import { useAbsences } from '../hooks/useAbsences';
import { useAuthContext } from '../contexts/AuthContext';

const Absences: React.FC = () => {
  const { user } = useAuthContext();
  const { absences, createAbsence, deleteAbsence, loading } = useAbsences(user?.id);
  const [newAbsence, setNewAbsence] = useState('');

  const handleAddAbsence = async () => {
    if (!newAbsence.trim()) return;

    try {
      await createAbsence(newAbsence);
      setNewAbsence('');
    } catch (err) {
      console.error('Erro ao adicionar falta:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAbsence(id);
    } catch (err) {
      console.error('Erro ao deletar falta:', err);
    }
  };

  return (
    <div className="min-h-screen px-6 pt-12">
      <h1 className="text-3xl font-serif text-cozy-deep font-bold mb-2">Faltas</h1>
      <p className="text-cozy-sageDark text-sm mb-10">Pequenos registros de ausência.</p>

      <div className="mb-10 relative">
        <div className="bg-white rounded-[1.5rem] p-2 pl-6 shadow-soft flex items-center gap-4 focus-within:ring-2 ring-cozy-sage/20 transition-all">
          <Heart size={20} className="text-cozy-clay" />
          <input 
            type="text" 
            placeholder="Hoje senti falta de..." 
            className="flex-1 bg-transparent text-cozy-deep outline-none placeholder-cozy-sageLight font-serif h-12"
            value={newAbsence}
            onChange={(e) => setNewAbsence(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddAbsence()}
          />
          <button 
            onClick={handleAddAbsence}
            disabled={!newAbsence.trim() || loading}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${newAbsence ? 'bg-cozy-sage text-white' : 'bg-transparent text-transparent'}`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {absences.map((item) => (
          <div key={item.id} className="bg-white/60 p-5 rounded-3xl border border-white hover:bg-white transition-colors cursor-default animate-slide-up group">
            <div className="flex justify-between items-start">
              <p className="text-lg text-cozy-deep font-serif leading-relaxed italic flex-1">
                "{item.text}"
              </p>
              <button
                onClick={() => handleDelete(item.id)}
                className="ml-4 text-cozy-sageDark hover:text-cozy-clay transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="mt-3 flex justify-end">
              <span className="text-xs font-bold text-cozy-sageDark bg-cozy-sand/30 px-3 py-1 rounded-full">
                {new Date(item.created_at).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Absences;
```

## Exemplo 4: Página de Momentos (Moments.tsx) - Versão com Supabase

```typescript
import React from 'react';
import { Camera, Trash2 } from 'lucide-react';
import { useMoments } from '../hooks/useMoments';
import { useAuthContext } from '../contexts/AuthContext';

const Moments: React.FC = () => {
  const { user } = useAuthContext();
  const { moments, loading, deleteMoment } = useMoments(user?.id);

  const handleDelete = async (id: string) => {
    try {
      await deleteMoment(id);
    } catch (err) {
      console.error('Erro ao deletar momento:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen px-6 pt-12 flex items-center justify-center">
        <p className="text-cozy-sageDark">Carregando momentos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pt-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-serif text-cozy-deep font-bold">momentos</h1>
          <p className="text-cozy-sageDark text-sm mt-1">memórias conscientes.</p>
        </div>
        <button className="w-12 h-12 bg-white rounded-2xl shadow-soft text-cozy-deep flex items-center justify-center hover:bg-cozy-sand transition-colors">
          <Camera size={20} />
        </button>
      </div>

      <div className="grid gap-8">
        {moments.map((moment) => (
          <div key={moment.id} className="group bg-white p-3 pb-6 rounded-[2.5rem] shadow-soft hover:shadow-lg transition-all duration-500 relative">
            <button
              onClick={() => handleDelete(moment.id)}
              className="absolute top-6 right-6 z-10 text-cozy-sageDark hover:text-cozy-clay transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="overflow-hidden rounded-[2rem] h-56 mb-5 relative">
              <div className="absolute inset-0 bg-cozy-deep/10 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src={moment.image_url} 
                alt={moment.text} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            
            <div className="px-4 text-center">
              <p className="text-cozy-deep font-serif text-xl font-medium">{moment.text}</p>
              <div className="w-8 h-1 bg-cozy-sage/30 mx-auto my-3 rounded-full"></div>
              <p className="text-xs font-bold text-cozy-sageDark tracking-wider">
                {new Date(moment.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {moments.length === 0 && (
        <div className="text-center py-20">
          <p className="text-cozy-deep font-serif italic">Nenhum momento registrado ainda.</p>
        </div>
      )}
    </div>
  );
};

export default Moments;
```

## Notas Importantes

1. **Substituir IDs de Usuários**: Os exemplos usam `recipient-user-id` como placeholder. Você precisará implementar um seletor ou obter esse ID de um contexto compartilhado.

2. **Tratamento de Erros**: Todos os exemplos incluem tratamento básico de erros. Considere adicionar toasts ou notificações mais sofisticadas.

3. **Loading States**: Use o estado `loading` dos hooks para mostrar spinners ou desabilitar botões.

4. **Datas**: Use `new Date(timestamp).toLocaleDateString('pt-BR')` para formatar datas.

5. **Validação**: Sempre valide inputs antes de enviar para o backend.

## Próximas Integrações

- Upload de imagens para Storage do Supabase
- Integração com Gemini API para análise de sentimentos
- Sincronização em tempo real com Realtime Subscriptions
- Paginação para listas grandes
