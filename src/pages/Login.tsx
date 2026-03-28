import { useAuthStore } from '@/store/useAuthStore';
import { FormEvent, useState } from 'react';
import { Wallet } from 'lucide-react';
import './login.css';

const MOCK_EMAIL = 'maria@fintechflow.com';
const MOCK_PASSWORD = 'Senha@1234';

function validatePassword(password: string): string | null {
  if (password.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
  if (!/[A-Z]/.test(password)) return 'A senha deve conter pelo menos 1 letra maiúscula.';
  if (!/[0-9]/.test(password)) return 'A senha deve conter pelo menos 1 número.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'A senha deve conter pelo menos 1 caractere especial (ex: @, #, !).';
  return null;
}

const passwordRules = [
  { label: 'Mínimo 8 caracteres', test: (p: string) => p.length >= 8 },
  { label: '1 letra maiúscula',   test: (p: string) => /[A-Z]/.test(p) },
  { label: '1 número',            test: (p: string) => /[0-9]/.test(p) },
  { label: '1 caractere especial', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

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
    if (pwdError) { setPasswordError(pwdError); return; }
    setPasswordError(null);

    if (email !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
      setLoginError('E-mail ou senha incorretos.');
      return;
    }

    login({ id: 'u1', name: 'Maria da Silva', email: MOCK_EMAIL }, 'mock-jwt-token-777');
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <div className="login-brand-icon">
            <Wallet color="white" size={24} />
          </div>
          <span className="login-brand-name">FintechFlow</span>
        </div>

        <div className="login-heading">
          <h1>Acesse sua conta</h1>
          <p>Experimente o futuro das simulações bancárias</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>

          <div>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="E-mail"
              value={email}
              onChange={e => { setEmail(e.target.value); setLoginError(null); }}
              className={`login-input${loginError ? ' error' : ''}`}
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
              className={`login-input${passwordError || loginError ? ' error' : ''}`}
            />

            <div className="login-hints">
              {passwordRules.map(rule => {
                const ok = rule.test(password);
                const cls = password.length === 0 ? 'hint-idle' : ok ? 'hint-ok' : 'hint-fail';
                const icon = password.length === 0 ? '○' : ok ? '✓' : '✗';
                return (
                  <span key={rule.label} className={`login-hint ${cls}`}>
                    {icon} {rule.label}
                  </span>
                );
              })}
            </div>

            {passwordError && <p className="login-field-error">{passwordError}</p>}
          </div>

          {loginError && (
            <p className="login-error-banner">{loginError}</p>
          )}

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>

      </div>
    </div>
  );
}
