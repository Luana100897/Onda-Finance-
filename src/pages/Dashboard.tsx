import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useTransactions } from '@/hooks/useTransactions';
import { TransferForm } from '@/components/forms/TransferForm';
import { Eye, EyeOff, LayoutDashboard, SendHorizontal, LogOut, ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp } from 'lucide-react';

const colors = {
  bg: '#09090b',
  sidebar: '#0f0f11',
  card: '#18181b',
  cardBorder: 'rgba(63,63,70,0.5)',
  text: '#f4f4f5',
  muted: '#71717a',
  emerald: '#10b981',
  emeraldDark: '#059669',
  emeraldAlpha: 'rgba(16,185,129,0.15)',
  red: '#ef4444',
};

export function Dashboard() {
  const { user, balance, logout } = useAuthStore();
  const { data: transactions, isLoading } = useTransactions();
  const [showBalance, setShowBalance] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: colors.bg, color: colors.text, fontFamily: 'system-ui, sans-serif' }}>

      <aside style={{
        width: '260px', minWidth: '260px',
        backgroundColor: colors.sidebar,
        borderRight: `1px solid ${colors.cardBorder}`,
        display: 'flex', flexDirection: 'column',
      }}>

        <div style={{ padding: '28px 24px', borderBottom: `1px solid ${colors.cardBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px',
              background: 'linear-gradient(135deg, #34d399, #059669)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
            }}>
              <Wallet color="white" size={18} />
            </div>
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.3px' }}>FintechFlow</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ color: colors.muted, fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 8px', margin: '0 0 8px' }}>Menu</p>

          <button style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            backgroundColor: colors.emeraldAlpha, color: colors.emerald, fontWeight: '600', fontSize: '14px',
          }}>
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              backgroundColor: 'transparent', color: colors.muted, fontWeight: '500', fontSize: '14px',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.muted; }}
          >
            <SendHorizontal size={18} /> Nova Transferência
          </button>
        </nav>

        <div style={{ padding: '16px', borderTop: `1px solid ${colors.cardBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #34d399, #0f766e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: '700', fontSize: '15px', flexShrink: 0,
            }}>
              {user?.name.charAt(0)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ margin: 0, color: '#fff', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</p>
              <p style={{ margin: 0, color: colors.muted, fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '9px', borderRadius: '10px', border: `1px solid rgba(239,68,68,0.2)`,
              backgroundColor: 'transparent', color: colors.red, fontSize: '13px', fontWeight: '500', cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <LogOut size={15} /> Encerrar Sessão
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ margin: '0 0 4px', color: colors.emerald, fontSize: '13px', fontWeight: '600' }}>Visão Geral</p>
            <h1 style={{ margin: 0, color: '#fff', fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>
              Olá, {user?.name.split(' ')[0]} 👋
            </h1>
            <p style={{ margin: '6px 0 0', color: colors.muted, fontSize: '14px' }}>
              Acompanhe suas finanças e realize transações com segurança.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 22px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              backgroundColor: colors.emerald, color: '#fff', fontSize: '14px', fontWeight: '600',
              boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.emeraldDark)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.emerald)}
          >
            <SendHorizontal size={16} /> Transferir Agora
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>

          <div style={{ padding: '32px', backgroundColor: colors.card, borderRadius: '20px', border: `1px solid ${colors.cardBorder}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ color: colors.muted, fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Saldo Disponível</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '8px', padding: '7px', cursor: 'pointer', color: colors.muted, display: 'flex' }}
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p style={{ margin: 0, color: '#fff', fontSize: '42px', fontWeight: '800', letterSpacing: '-1px' }}>
              {showBalance ? `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••••'}
            </p>
          </div>

          <div style={{
            padding: '32px', borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08))',
            border: `1px solid rgba(16,185,129,0.2)`,
          }}>
            <div style={{ width: '40px', height: '40px', background: colors.emeraldAlpha, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <TrendingUp color={colors.emerald} size={20} />
            </div>
            <p style={{ margin: '0 0 4px', color: colors.muted, fontSize: '13px' }}>Rendimento no mês</p>
            <p style={{ margin: '0 0 12px', color: '#fff', fontSize: '24px', fontWeight: '700' }}>+ R$ 142,50</p>
            <span style={{ backgroundColor: colors.emeraldAlpha, color: colors.emerald, fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '6px' }}>
              103% do CDI
            </span>
          </div>
        </div>

        <div style={{ backgroundColor: colors.card, borderRadius: '20px', border: `1px solid ${colors.cardBorder}`, padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '18px', fontWeight: '700' }}>Últimas Movimentações</h2>
            <button style={{ background: 'none', border: 'none', color: colors.emerald, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
              Ver extrato completo
            </button>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: colors.muted }}>Carregando...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {transactions?.map((t) => (
                <div key={t.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: '12px',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: t.type === 'incoming' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.10)',
                      color: t.type === 'incoming' ? colors.emerald : colors.red,
                    }}>
                      {t.type === 'incoming' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                    <div>
                      <p style={{ margin: 0, color: '#fff', fontSize: '14px', fontWeight: '600' }}>{t.description}</p>
                      <p style={{ margin: '2px 0 0', color: colors.muted, fontSize: '12px' }}>{t.date}</p>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: t.type === 'incoming' ? colors.emerald : '#fff' }}>
                    {t.type === 'incoming' ? '+' : '−'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '460px',
              backgroundColor: colors.card, borderRadius: '20px',
              border: `1px solid ${colors.cardBorder}`,
              boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: `1px solid ${colors.cardBorder}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SendHorizontal color={colors.emerald} size={18} />
                <h2 style={{ margin: 0, color: '#fff', fontSize: '18px', fontWeight: '700' }}>Nova Transferência</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: colors.muted, cursor: 'pointer', borderRadius: '8px', padding: '6px 10px', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '28px' }}>
              <TransferForm onSuccess={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
