import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transferSchema, TransferData } from '@/schemas/transferSchema';
import { useAuthStore } from '@/store/useAuthStore';
import { useTransferMutation } from '@/hooks/useTransferMutation';
import { toast } from 'sonner';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  backgroundColor: 'rgba(39,39,42,0.6)',
  border: '1px solid rgba(63,63,70,0.8)',
  borderRadius: '12px',
  color: '#f4f4f5',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#a1a1aa',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '8px',
};

const errorStyle: React.CSSProperties = {
  color: '#f87171',
  fontSize: '12px',
  marginTop: '5px',
};

export function TransferForm({ onSuccess }: { onSuccess?: () => void }) {
  const { balance, updateBalance, addTransfer } = useAuthStore();
  const transferMutation = useTransferMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransferData>({

    resolver: zodResolver(transferSchema) as any,
  });

  const onSubmit = (data: TransferData) => {
    if (data.amount > balance) {
      toast.error('Saldo insuficiente para esta transferência.');
      return;
    }
    transferMutation.mutate(data as TransferData, {
      onSuccess: () => {
        updateBalance(balance - data.amount);
        addTransfer({
          id: `t_${Date.now()}`,
          type: 'outgoing',
          amount: data.amount,
          date: new Date().toLocaleDateString('pt-BR'),
          description: `Transferência para ${data.recipient}`,
        });
        toast.success(`Transferência de R$ ${data.amount.toFixed(2)} realizada!`);
        reset();
        if (onSuccess) onSuccess();
      },
    });
  };

  const isPending = isSubmitting || transferMutation.isPending;

  return (

    <form onSubmit={handleSubmit(onSubmit as any)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <div>
        <label htmlFor="recipient" style={labelStyle}>Nome do Destinatário</label>
        <input
          {...register('recipient')}
          id="recipient"
          placeholder="Ex: João da Silva"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = '#10b981')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(63,63,70,0.8)')}
        />
        {errors.recipient && <p style={errorStyle}>{errors.recipient.message as string}</p>}
      </div>

      <div>
        <label htmlFor="account" style={labelStyle}>Conta de Destino</label>
        <input
          {...register('account')}
          id="account"
          type="text"
          inputMode="numeric"
          placeholder="Somente números"
          style={inputStyle}
          onKeyDown={e => {
         
            if (!['0','1','2','3','4','5','6','7','8','9','Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#10b981')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(63,63,70,0.8)')}
        />
        {errors.account && <p style={errorStyle}>{errors.account.message as string}</p>}
      </div>

      <div>
        <label htmlFor="amount" style={labelStyle}>Valor (R$)</label>
        <input
          {...register('amount')}
          id="amount"
          type="number"
          step="0.01"
          placeholder="0,00"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = '#10b981')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(63,63,70,0.8)')}
        />
        {errors.amount && <p style={errorStyle}>{errors.amount.message as string}</p>}
      </div>

      <div style={{
        padding: '12px 16px',
        backgroundColor: 'rgba(16,185,129,0.08)',
        borderRadius: '10px',
        border: '1px solid rgba(16,185,129,0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ color: '#a1a1aa', fontSize: '13px' }}>Saldo disponível</span>
        <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '700' }}>
          R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <button
        type="submit"
        disabled={isPending}
        style={{
          width: '100%', padding: '14px',
          backgroundColor: isPending ? '#047857' : '#10b981',
          border: 'none', borderRadius: '12px',
          color: '#fff', fontSize: '15px', fontWeight: '600',
          cursor: isPending ? 'not-allowed' : 'pointer',
          opacity: isPending ? 0.7 : 1,
          boxShadow: '0 4px 14px rgba(16,185,129,0.25)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { if (!isPending) e.currentTarget.style.backgroundColor = '#059669'; }}
        onMouseLeave={e => { if (!isPending) e.currentTarget.style.backgroundColor = '#10b981'; }}
      >
        {isPending ? 'Processando...' : 'Confirmar Transferência'}
      </button>
    </form>
  );
}
