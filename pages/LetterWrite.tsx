import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X, ArrowLeft } from 'lucide-react';
import { useLetters } from '../src/hooks/useLetters';

const LetterWrite: React.FC = () => {
  const navigate = useNavigate();
  const { createLetter, loading } = useLetters();
  const [step, setStep] = useState<'recipient' | 'write'>('recipient');
  const [authorName, setAuthorName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSelectRecipient = () => {
    if (!authorName.trim() || !recipientName.trim()) {
      setError('Preencha seu nome e o nome de quem vai receber');
      return;
    }
    setError(null);
    setStep('write');
  };

  const handleSendLetter = async () => {
    if (text.length < 10) return;

    try {
      setError(null);
      await createLetter(text, authorName, recipientName);
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar carta');
    }
  };

  return (
    <div className="min-h-screen bg-cozy-cream flex flex-col px-6 pt-10 pb-8">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => step === 'write' ? setStep('recipient') : navigate('/home')}
          className="text-sm font-bold text-cozy-sageDark hover:text-cozy-deep flex items-center gap-1 transition-colors"
        >
          <ArrowLeft size={18} /> {step === 'write' ? 'voltar' : 'cancelar'}
        </button>
      </div>

      {step === 'recipient' ? (
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-soft p-8 relative flex flex-col border border-cozy-sageLight/20">
          <h2 className="text-2xl font-serif text-cozy-deep font-bold mb-8 text-center">
            para quem é essa carta?
          </h2>

          <div className="space-y-6 flex-1">
            <div>
              <label className="text-xs font-bold tracking-wider text-cozy-sage mb-3 block">
                seu nome
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="como você se chama?"
                className="w-full bg-cozy-cream rounded-2xl px-4 py-4 text-cozy-deep outline-none focus:ring-2 ring-cozy-sage/20 transition-all border border-cozy-sageLight/20 font-serif"
              />
            </div>

            <div>
              <label className="text-xs font-bold tracking-wider text-cozy-sage mb-3 block">
                nome de quem vai receber
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="para quem você quer escrever?"
                className="w-full bg-cozy-cream rounded-2xl px-4 py-4 text-cozy-deep outline-none focus:ring-2 ring-cozy-sage/20 transition-all border border-cozy-sageLight/20 font-serif"
              />
            </div>

            {error && (
              <div className="bg-cozy-clay/10 border border-cozy-clay/30 rounded-2xl p-4">
                <p className="text-sm text-cozy-clay font-serif">{error}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleSelectRecipient}
              disabled={!authorName.trim() || !recipientName.trim()}
              className={`px-8 py-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg font-bold ${authorName.trim() && recipientName.trim() ? 'bg-cozy-deep text-white hover:scale-105 active:scale-95' : 'bg-cozy-sand text-white cursor-not-allowed opacity-50'}`}
            >
              próximo
            </button>
          </div>
        </div>
      ) : (
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
            <div className="bg-cozy-clay/10 border border-cozy-clay/30 rounded-2xl p-4 mb-4">
              <p className="text-sm text-cozy-clay font-serif">{error}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleSendLetter}
              disabled={text.length < 10 || loading}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${text.length > 10 && !loading ? 'bg-cozy-deep text-white hover:scale-105 active:scale-95' : 'bg-cozy-sand text-white cursor-not-allowed opacity-50'}`}
            >
              <Send size={24} className={text.length > 10 ? 'ml-1' : ''} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterWrite;