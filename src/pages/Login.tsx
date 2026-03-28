import { useAuthStore } from '@/store/useAuthStore';
import { FormEvent, useState } from 'react';
import { Wallet } from 'lucide-react';

const MOCK_EMAIL = 'maria@fintechflow.com';
const MOCK_PASSWORD = 'Senha@1234';

function validatePassword(password: string): string | null {
  if (password.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
  if (!/[A-Z]/.test(password)) return 'A senha deve conter pelo menos 1 letra maiúscula.';
  if (!/[0-9]/.test(password)) return 'A senha deve conter pelo menos 1 número.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'A senha deve conter pelo menos 1 caractere especial (ex: @, #, !).';
  return null;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 18px',
  backgroundColor: 'rgba(39,39,42,0.8)',
  border: '1px solid rgba(63,63,70,0.8)',
  borderRadius: '12px',
  color: '#f4f4f5',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
};

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  border: '1px solid rgba(239,68,68,0.7)',
};

export function Login() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState(MOCK_EMAIL);
  const [password, setPassword] = useState(MOCK_PASSWORD);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }
    setPasswordError(null);

    if (email !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
      setLoginError('E-mail ou senha incorretos.');
      return;
    }

    login({ id: 'u1', name: 'Maria da Silva', email: MOCK_EMAIL }, 'mock-jwt-token-777');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#09090b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        margin: '0 20px',
        padding: '56px',
        backgroundColor: 'rgba(24,24,27,0.95)',
        border: '1px solid rgba(63,63,70,0.5)',
        borderRadius: '24px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '52px', height: '52px',
            background: 'linear-gradient(135deg, #34d399, #059669)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
          }}>
            <Wallet color="white" size={24} />
          </div>
          <span style={{ color: '#fff', fontSize: '18px', fontWeight: '600', letterSpacing: '-0.3px' }}>
            FintechFlow
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: 0, color: '#fff', fontSize: '28px', fontWeight: '700' }}>
            Acesse sua conta
          </h1>
          <p style={{ margin: '8px 0 0', color: '#71717a', fontSize: '14px' }}>
            Experimente o futuro das simulações bancárias
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="E-mail"
              value={email}
              onChange={e => { setEmail(e.target.value); setLoginError(null); }}
              style={loginError ? inputErrorStyle : inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#10b981')}
              onBlur={e => (e.currentTarget.style.borderColor = loginError ? 'rgba(239,68,68,0.7)' : 'rgba(63,63,70,0.8)')}
            />
          </div>

          <div>
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Senha"
              value={password}
              onChange={e => { setPassword(e.target.value); setPasswordError(null); setLoginError(null); }}
              style={passwordError || loginError ? inputErrorStyle : inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#10b981')}
              onBlur={e => (e.currentTarget.style.borderColor = (passwordError || loginError) ? 'rgba(239,68,68,0.7)' : 'rgba(63,63,70,0.8)')}
            />

            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { label: 'Mínimo 8 caracteres', ok: password.length >= 8 },
                { label: '1 letra maiúscula', ok: /[A-Z]/.test(password) },
                { label: '1 número', ok: /[0-9]/.test(password) },
                { label: '1 caractere especial', ok: /[^A-Za-z0-9]/.test(password) },
              ].map(rule => (
                <span key={rule.label} style={{
                  fontSize: '11px',
                  color: password.length === 0 ? '#52525b' : rule.ok ? '#10b981' : '#f87171',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}>
                  {password.length === 0 ? '○' : rule.ok ? '✓' : '✗'} {rule.label}
                </span>
              ))}
            </div>
            {passwordError && (
              <p style={{ color: '#f87171', fontSize: '12px', marginTop: '6px' }}>{passwordError}</p>
            )}
          </div>

          {loginError && (
            <p style={{
              color: '#f87171', fontSize: '13px', textAlign: 'center',
              backgroundColor: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '10px', padding: '10px',
              margin: 0,
            }}>
              {loginError}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%', padding: '15px',
              backgroundColor: '#10b981',
              border: 'none', borderRadius: '12px',
              color: '#fff', fontSize: '16px', fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#059669')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#10b981')}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
