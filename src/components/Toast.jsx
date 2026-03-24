import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CONFIG = {
  success: { icon: CheckCircle2, bg: 'bg-green-600',  bar: 'bg-green-400' },
  error:   { icon: AlertCircle,  bg: 'bg-red-600',    bar: 'bg-red-400'   },
  info:    { icon: Info,         bg: 'bg-blue-600',   bar: 'bg-blue-400'  },
};

export default function Toast({ message, type = 'success', onClose }) {
  const { icon: Icon, bg, bar } = CONFIG[type] || CONFIG.info;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed top-5 right-5 z-[100] w-80 max-w-[calc(100vw-2rem)]"
        >
          <div className={`${bg} text-white rounded-xl shadow-2xl overflow-hidden`}>
            <div className="flex items-start gap-3 px-4 py-3">
              <Icon size={20} className="shrink-0 mt-0.5" />
              <p className="flex-1 text-sm font-medium leading-snug">{message}</p>
              <button onClick={onClose} className="shrink-0 hover:opacity-70 transition mt-0.5">
                <X size={16} />
              </button>
            </div>
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: 'linear' }}
              style={{ transformOrigin: 'left' }}
              className={`h-1 ${bar}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
