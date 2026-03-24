export const SHARE_VALUE = 2000;
export const PENALTY_RATE = 0.05;
export const GIVEAWAY_CUT = 0.95;

export const mockUsers = [
  { id: 1, name: 'Jean Uwimana',      role: 'member',     shares: 10, penalty: 0,   hasWonGiveaway: false, joinDate: '2023-01-10', phone: '+250 788 100 001' },
  { id: 2, name: 'Marie Mukamana',    role: 'member',     shares: 15, penalty: 200, hasWonGiveaway: false, joinDate: '2023-01-10', phone: '+250 788 100 002' },
  { id: 3, name: 'Paul Habimana',     role: 'member',     shares: 8,  penalty: 0,   hasWonGiveaway: true,  joinDate: '2023-02-05', phone: '+250 788 100 003' },
  { id: 4, name: 'Grace Uwase',       role: 'accountant', shares: 12, penalty: 0,   hasWonGiveaway: false, joinDate: '2023-01-10', phone: '+250 788 100 004' },
  { id: 5, name: 'David Nkurunziza',  role: 'admin',      shares: 20, penalty: 0,   hasWonGiveaway: false, joinDate: '2023-01-10', phone: '+250 788 100 005' },
  { id: 6, name: 'Sarah Ingabire',    role: 'member',     shares: 5,  penalty: 400, hasWonGiveaway: false, joinDate: '2023-03-15', phone: '+250 788 100 006' },
  { id: 7, name: 'Eric Mugisha',      role: 'member',     shares: 18, penalty: 0,   hasWonGiveaway: false, joinDate: '2023-02-20', phone: '+250 788 100 007' },
  { id: 8, name: 'Alice Umutoni',     role: 'member',     shares: 7,  penalty: 0,   hasWonGiveaway: false, joinDate: '2023-04-01', phone: '+250 788 100 008' },
  { id: 9, name: 'Claude Niyonzima', role: 'member',     shares: 22, penalty: 100, hasWonGiveaway: false, joinDate: '2023-01-10', phone: '+250 788 100 009' },
  { id: 10, name: 'Diane Uwera',      role: 'member',     shares: 9,  penalty: 0,   hasWonGiveaway: false, joinDate: '2023-05-12', phone: '+250 788 100 010' },
];

export const mockPayments = [
  {
    id: 1,
    userId: 2,
    userName: 'Marie Mukamana',
    amount: 4000,
    transactionId: 'TXN-2024-123456',
    momoName: 'Marie M.',
    screenshot: 'https://placehold.co/400x600/22c55e/ffffff?text=MoMo+Receipt',
    status: 'pending',
    date: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 6,
    userName: 'Sarah Ingabire',
    amount: 2000,
    transactionId: 'TXN-2024-789012',
    momoName: 'Sarah I.',
    screenshot: 'https://placehold.co/400x600/3b82f6/ffffff?text=MoMo+Receipt',
    status: 'pending',
    date: new Date().toISOString(),
  },
  {
    id: 3,
    userId: 9,
    userName: 'Claude Niyonzima',
    amount: 6000,
    transactionId: 'TXN-2024-345678',
    momoName: 'Claude N.',
    screenshot: 'https://placehold.co/400x600/8b5cf6/ffffff?text=MoMo+Receipt',
    status: 'pending',
    date: new Date().toISOString(),
  },
];

export const mockLoans = [
  {
    id: 1,
    borrowerId: 2,
    borrowerName: 'Marie Mukamana',
    amount: 50000,
    guarantorId: 7,
    guarantorName: 'Eric Mugisha',
    status: 'approved',
    date: '2024-01-15',
  },
  {
    id: 2,
    borrowerId: 6,
    borrowerName: 'Sarah Ingabire',
    amount: 30000,
    guarantorId: 1,
    guarantorName: 'Jean Uwimana',
    status: 'pending',
    date: '2024-02-10',
  },
  {
    id: 3,
    borrowerId: 10,
    borrowerName: 'Diane Uwera',
    amount: 20000,
    guarantorId: 8,
    guarantorName: 'Alice Umutoni',
    status: 'awaiting_guarantor',
    date: '2024-03-01',
  },
];

export const mockGiveawayHistory = [
  { id: 1, month: 'March 2024',    winnerId: 9,  winnerName: 'Claude Niyonzima', amount: 427000 },
  { id: 2, month: 'February 2024', winnerId: 7,  winnerName: 'Eric Mugisha',     amount: 399000 },
  { id: 3, month: 'January 2024',  winnerId: 3,  winnerName: 'Paul Habimana',    amount: 285000 },
  { id: 4, month: 'December 2023', winnerId: 10, winnerName: 'Diane Uwera',      amount: 270000 },
];
