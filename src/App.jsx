import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import MySavings from './pages/MySavings';
import PayShares from './pages/PayShares';
import RequestLoan from './pages/RequestLoan';
import VerifyPayments from './pages/VerifyPayments';
import LoanApprovals from './pages/LoanApprovals';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Giveaway from './pages/Giveaway';
import { mockUsers, mockPayments, mockLoans, mockGiveawayHistory, SHARE_VALUE } from './data/mockData';

const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

function App() {
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);
  const [users, setUsers]             = useState(mockUsers);
  const [payments, setPayments]       = useState(mockPayments);
  const [loans, setLoans]             = useState(mockLoans);
  const [giveawayHistory, setGiveawayHistory] = useState(mockGiveawayHistory);
  const [currentPage, setCurrentPage] = useState('my-savings');
  const [toast, setToast]             = useState(null);
  const [darkMode, setDarkMode]       = useState(false);

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleRoleChange = (newRole) => {
    const user = users.find((u) => u.role === newRole);
    if (!user) return;
    setCurrentUser(user);
    const defaults = { member: 'my-savings', accountant: 'verify-payments', admin: 'dashboard' };
    setCurrentPage(defaults[newRole]);
  };

  const handlePaymentSubmit = (paymentData) => {
    const newPayment = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      ...paymentData,
      status: 'pending',
      date: new Date().toISOString(),
    };
    setPayments((prev) => [...prev, newPayment]);
    showToast('Payment submitted for verification');
  };

  const handleVerifyPayment = (paymentId, userId, amount) => {
    const daysLate = Math.floor(Math.random() * 4); // 0–3 days
    const penalty  = daysLate > 0 ? daysLate * SHARE_VALUE * 0.05 : 0;
    const sharesAdded = amount / SHARE_VALUE;

    setPayments((prev) => prev.filter((p) => p.id !== paymentId));
    setUsers((prev) => prev.map((u) => {
      if (u.id !== userId) return u;
      return { ...u, shares: u.shares + sharesAdded, penalty: u.penalty + penalty };
    }));

    return { sharesAdded, daysLate, penalty };
  };

  const handleFlagPayment = (paymentId) => {
    setPayments((prev) => prev.filter((p) => p.id !== paymentId));
    showToast('Payment flagged and removed', 'error');
  };

  const handleLoanRequest = (loanData) => {
    const guarantor = users.find((u) => u.id === loanData.guarantorId);
    const newLoan = {
      id: Date.now(),
      borrowerId: currentUser.id,
      borrowerName: currentUser.name,
      guarantorId: loanData.guarantorId,
      guarantorName: guarantor?.name ?? '—',
      amount: loanData.amount,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setLoans((prev) => [...prev, newLoan]);
    showToast('Loan request submitted successfully');
  };

  const handleRunGiveaway = (winnerId, winnerName, amount) => {
    const entry = {
      id: Date.now(),
      month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      winnerId,
      winnerName,
      amount: Math.floor(amount),
    };
    setGiveawayHistory((prev) => [entry, ...prev]);
    setUsers((prev) => prev.map((u) => (u.id === winnerId ? { ...u, hasWonGiveaway: true } : u)));
  };

  const currentUserData = users.find((u) => u.id === currentUser.id) ?? currentUser;

  const renderPage = () => {
    switch (currentPage) {
      case 'my-savings':      return <MySavings user={currentUserData} />;
      case 'pay-shares':      return <PayShares onSubmit={handlePaymentSubmit} />;
      case 'request-loan':    return <RequestLoan user={currentUserData} users={users} onSubmit={handleLoanRequest} />;
      case 'verify-payments': return <VerifyPayments payments={payments} onVerify={handleVerifyPayment} onFlag={handleFlagPayment} />;
      case 'loan-approvals':  return <LoanApprovals loans={loans} />;
      case 'dashboard':       return <Dashboard users={users} giveawayHistory={giveawayHistory} />;
      case 'user-management': return <UserManagement users={users} />;
      case 'giveaway':        return <Giveaway users={users} giveawayHistory={giveawayHistory} onRunGiveaway={handleRunGiveaway} />;
      default:                return <MySavings user={currentUserData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar role={currentUser.role} currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          user={currentUser}
          onRoleChange={handleRoleChange}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((d) => !d)}
          notifCount={payments.length}
        />
        <main className="flex-1 p-4 lg:p-8 overflow-auto scrollbar-thin">
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} {...PAGE_TRANSITION}>
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
