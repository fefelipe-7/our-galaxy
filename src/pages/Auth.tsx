import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, loading, error } = useAuthContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Preencha todos os campos');
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/home');
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Erro ao autenticar');
    }
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-cozy-cream shadow-2xl overflow-hidden relative font-sans flex flex-col">
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-cozy-sage/20 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
      <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 bg-cozy-clay/20 rounded-full blur-3xl opacity-60"></div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 z-10">
        <div className="w-full max-w-sm">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-cozy-deep font-bold mb-2">
              {isSignUp ? 'Criar Conta' : 'Bem-vindo'}
            </h1>
            <p className="text-cozy-sageDark text-sm">
              {isSignUp
                ? 'Junte-se ao nosso espaço privado'
                : 'Entre no seu espaço privado'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-cozy-sageDark mb-2 tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cozy-sage" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-white rounded-2xl pl-12 pr-4 py-4 text-cozy-deep outline-none focus:ring-2 ring-cozy-sage/20 transition-all border border-cozy-sageLight/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-cozy-sageDark mb-2 tracking-wider">
                Senha
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cozy-sage" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white rounded-2xl pl-12 pr-4 py-4 text-cozy-deep outline-none focus:ring-2 ring-cozy-sage/20 transition-all border border-cozy-sageLight/20"
                />
              </div>
            </div>

            {(error || localError) && (
              <div className="bg-cozy-clay/10 border border-cozy-clay/30 rounded-2xl p-4">
                <p className="text-sm text-cozy-clay font-serif">
                  {error || localError}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-cozy-deep text-white text-lg font-bold py-5 rounded-[2rem] shadow-float hover:bg-cozy-charcoal active:scale-95 transition-all duration-300 flex items-center justify-between px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSignUp ? 'Criar Conta' : 'Entrar'}</span>
              <div className="bg-white/10 p-2 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} className="text-cozy-cream" />
              </div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-cozy-sageDark text-sm mb-4">
              {isSignUp ? 'Já tem conta?' : 'Não tem conta?'}
            </p>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setLocalError(null);
              }}
              className="text-cozy-deep font-bold hover:text-cozy-charcoal transition-colors"
            >
              {isSignUp ? 'Fazer login' : 'Criar conta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
