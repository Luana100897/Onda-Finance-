import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  date: string;
  description: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  balance: number;
  recentTransfers: Transaction[];
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
  addTransfer: (t: Transaction) => void;
}

const load = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
};

const save = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

const INITIAL_BALANCE = 20000;

export const useAuthStore = create<AuthState>((set) => ({
  user: load<User | null>('@fintech:user', null),
  token: localStorage.getItem('@fintech:token') || null,
  balance: load<number>('@fintech:balance', INITIAL_BALANCE),
  recentTransfers: load<Transaction[]>('@fintech:transfers', []),
  isAuthenticated: !!localStorage.getItem('@fintech:token'),

  login: (user, token) => {

    const savedBalance = load<number>('@fintech:balance', INITIAL_BALANCE);
    const savedTransfers = load<Transaction[]>('@fintech:transfers', []);
    localStorage.setItem('@fintech:token', token);
    save('@fintech:user', user);
    set({ user, token, isAuthenticated: true, balance: savedBalance, recentTransfers: savedTransfers });
  },

  logout: () => {

    localStorage.removeItem('@fintech:token');
    save('@fintech:user', null);
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateBalance: (newBalance) => {
    save('@fintech:balance', newBalance);
    set({ balance: newBalance });
  },

  addTransfer: (t) => set((state) => {
    const updated = [t, ...state.recentTransfers];
    save('@fintech:transfers', updated);
    return { recentTransfers: updated };
  }),
}));
