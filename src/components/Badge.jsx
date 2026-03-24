export default function Badge({ status }) {
  const map = {
    pending:           'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    approved:          'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    rejected:          'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    awaiting_guarantor:'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    member:            'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    accountant:        'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    admin:             'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  };
  const label = {
    awaiting_guarantor: 'Awaiting Guarantor',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[status] || map.member}`}>
      {label[status] || status}
    </span>
  );
}
