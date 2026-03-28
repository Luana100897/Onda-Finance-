import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useTransactions } from '@/hooks/useTransactions';
import { TransferForm } from '@/components/forms/TransferForm';
import {
  Eye, EyeOff, LayoutDashboard, SendHorizontal, LogOut,
  ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp, FileText, X,
} from 'lucide-react';
import './dashboard.css';

export function Dashboard() {
  const { user, balance, logout } = useAuthStore();
  const { data: transactions, isLoading } = useTransactions();
  const [showBalance, setShowBalance] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExtratoOpen, setIsExtratoOpen] = useState(false);

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Wallet color="white" size={18} />
          </div>
          <span className="sidebar-logo-name">FintechFlow</span>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-nav-label">Menu</p>
          <button className="sidebar-nav-btn active">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            className="sidebar-nav-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <SendHorizontal size={18} /> Nova Transferência
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{user?.name.charAt(0)}</div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">{user?.name}</p>
              <p className="sidebar-user-email">{user?.email}</p>
            </div>
          </div>
          <button className="sidebar-logout-btn" onClick={logout}>
            <LogOut size={15} /> Encerrar Sessão
          </button>
        </div>
      </aside>
      <main className="dashboard-main">

        <div className="mobile-header">
          <div className="mobile-header-brand">
            <div className="mobile-header-icon">
              <Wallet color="white" size={16} />
            </div>
            <span className="mobile-header-name">FintechFlow</span>
          </div>
          <div className="mobile-header-avatar">{user?.name.charAt(0)}</div>
        </div>


        <div className="page-header">
          <div className="page-header-top">
            <div>
              <p className="page-header-title-tag">Visão Geral</p>
              <h1 className="page-header-h1">
                Olá, {user?.name.split(' ')[0]} 👋
              </h1>
              <p className="page-header-sub">
                Acompanhe suas finanças e realize transações com segurança.
              </p>
            </div>
            <button
              className="transfer-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <SendHorizontal size={16} /> Transferir
            </button>
          </div>
        </div>


        <div className="cards-grid">
          <div className="balance-card">
            <div className="balance-card-header">
              <span className="balance-label">Saldo Disponível</span>
              <button
                className="balance-toggle-btn"
                onClick={() => setShowBalance(!showBalance)}
                aria-label={showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="balance-amount">
              {showBalance
                ? `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                : '••••••••'}
            </p>
          </div>

          <div className="yield-card">
            <div className="yield-icon">
              <TrendingUp color="#10b981" size={20} />
            </div>
            <p className="yield-label">Rendimento no mês</p>
            <p className="yield-amount">+ R$ 142,50</p>
            <span className="yield-badge">103% do CDI</span>
          </div>
        </div>

        <div className="transactions-card">
          <div className="transactions-header">
            <h2 className="transactions-title">Últimas Movimentações</h2>
            <button className="transactions-link-btn" onClick={() => setIsExtratoOpen(true)}>Ver extrato</button>
          </div>

          {isLoading ? (
            <div className="transactions-loading">Carregando...</div>
          ) : (
            <div className="transactions-list">
              {transactions?.map((t) => (
                <div key={t.id} className="transaction-item">
                  <div className="transaction-left">
                    <div className={`transaction-icon ${t.type}`}>
                      {t.type === 'incoming'
                        ? <ArrowDownLeft size={20} />
                        : <ArrowUpRight size={20} />}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p className="transaction-desc">{t.description}</p>
                      <p className="transaction-date">{t.date}</p>
                    </div>
                  </div>
                  <p className={`transaction-amount ${t.type}`}>
                    {t.type === 'incoming' ? '+' : '−'} R${' '}
                    {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <nav className="bottom-nav">
        <button className="bottom-nav-btn active" aria-label="Dashboard">
          <LayoutDashboard size={22} />
          <span>Início</span>
        </button>
        <button
          className="bottom-nav-btn"
          aria-label="Nova transferência"
          onClick={() => setIsModalOpen(true)}
        >
          <SendHorizontal size={22} />
          <span>Transferir</span>
        </button>
        <button className="bottom-nav-btn" aria-label="Sair" onClick={logout}>
          <LogOut size={22} />
          <span>Sair</span>
        </button>
      </nav>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-panel"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-header-title">
                <SendHorizontal color="#10b981" size={18} />
                <h2 className="modal-h2">Nova Transferência</h2>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <TransferForm onSuccess={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {isExtratoOpen && (
        <div
          className="extrato-overlay"
          onClick={() => setIsExtratoOpen(false)}
        >
          <div
            className="extrato-panel"
            onClick={e => e.stopPropagation()}
          >
            <div className="extrato-header">
              <div className="extrato-header-title">
                <div className="extrato-header-icon">
                  <FileText size={18} color="#10b981" />
                </div>
                <div>
                  <h2 className="extrato-h2">Extrato</h2>
                  <p className="extrato-subtitle">Todas as movimentações</p>
                </div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setIsExtratoOpen(false)}
                aria-label="Fechar extrato"
              >
                <X size={16} />
              </button>
            </div>

            <div className="extrato-summary">
              <div className="extrato-summary-item extrato-summary-in">
                <p className="extrato-summary-label">Entradas</p>
                <p className="extrato-summary-value">
                  + R$ {transactions
                    ?.filter(t => t.type === 'incoming')
                    .reduce((acc, t) => acc + t.amount, 0)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="extrato-summary-divider" />
              <div className="extrato-summary-item extrato-summary-out">
                <p className="extrato-summary-label">Saídas</p>
                <p className="extrato-summary-value">
                  − R$ {transactions
                    ?.filter(t => t.type === 'outgoing')
                    .reduce((acc, t) => acc + t.amount, 0)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="extrato-list">
              {transactions?.map((t) => (
                <div key={t.id} className="extrato-item">
                  <div className={`extrato-item-icon ${t.type}`}>
                    {t.type === 'incoming'
                      ? <ArrowDownLeft size={18} />
                      : <ArrowUpRight size={18} />}
                  </div>
                  <div className="extrato-item-info">
                    <p className="extrato-item-desc">{t.description}</p>
                    <p className="extrato-item-date">{t.date}</p>
                  </div>
                  <p className={`extrato-item-amount ${t.type}`}>
                    {t.type === 'incoming' ? '+' : '−'} R${' '}
                    {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
