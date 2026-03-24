const COLORS = [
  'bg-blue-600', 'bg-purple-600', 'bg-green-600',
  'bg-rose-600', 'bg-amber-600', 'bg-cyan-600', 'bg-indigo-600',
];

export default function Avatar({ name, size = 'md', className = '' }) {
  const idx = name ? name.charCodeAt(0) % COLORS.length : 0;
  const sizeMap = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  return (
    <div className={`${COLORS[idx]} ${sizeMap[size]} rounded-full flex items-center justify-center text-white font-semibold shrink-0 ${className}`}>
      {name ? name.charAt(0).toUpperCase() : '?'}
    </div>
  );
}
