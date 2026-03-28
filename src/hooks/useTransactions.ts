import { useAuthStore } from '@/store/useAuthStore';

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  date: string;
  description: string;
}

const mockTransactions: Transaction[] = [
  { id: 'mock1', type: 'incoming', amount: 1500, date: '01/10/2023', description: 'Salário Liquído' },
  { id: 'mock2', type: 'outgoing', amount: 350, date: '02/10/2023', description: 'Conta de Energia' },
  { id: 'mock3', type: 'outgoing', amount: 50.5, date: '05/10/2023', description: 'Market' },
  { id: 'mock4', type: 'incoming', amount: 200, date: '10/10/2023', description: 'Pix João' },
];

export const useTransactions = () => {
  const recentTransfers = useAuthStore((state) => state.recentTransfers);

  const transactions: Transaction[] = [...recentTransfers, ...mockTransactions];

  return { data: transactions, isLoading: false };
};
