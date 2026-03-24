import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle2, CreditCard, Hash, Banknote, ImagePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { SHARE_VALUE } from '../data/mockData';

const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
      <Icon size={14} className="text-slate-400" />
      {label}
    </label>
    {children}
  </div>
);

const inputCls = 'w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';

export default function PayShares({ onSubmit }) {
  const [form, setForm] = useState({ momoName: '', transactionId: '', amount: '' });
  const [screenshot, setScreenshot] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: ([file]) => file && setScreenshot({ file, preview: URL.createObjectURL(file) }),
  });

  const shares = form.amount ? Math.floor(Number(form.amount) / SHARE_VALUE) : 0;
  const valid  = form.momoName && form.transactionId && Number(form.amount) >= SHARE_VALUE && screenshot;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit({ ...form, amount: Number(form.amount), screenshot: screenshot.preview });
    setForm({ momoName: '', transactionId: '', amount: '' });
    setScreenshot(null);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pay Shares</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Submit your MoMo payment for verification</p>
      </div>

      {/* Info banner */}
      <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl px-4 py-3">
        <CreditCard size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
        <p className="text-sm text-blue-800 dark:text-blue-300">
          1 share = <span className="font-bold">{SHARE_VALUE.toLocaleString()} RWF</span>. Amount must be a multiple of {SHARE_VALUE.toLocaleString()} RWF.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Name on MoMo Account" icon={CreditCard}>
            <input
              type="text"
              required
              value={form.momoName}
              onChange={(e) => setForm({ ...form, momoName: e.target.value })}
              className={inputCls}
              placeholder="e.g. Jean Uwimana"
            />
          </Field>

          <Field label="Transaction ID" icon={Hash}>
            <input
              type="text"
              required
              value={form.transactionId}
              onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
              className={`${inputCls} font-mono`}
              placeholder="e.g. TXN-2024-123456"
            />
          </Field>

          <Field label="Amount (RWF)" icon={Banknote}>
            <input
              type="number"
              required
              min={SHARE_VALUE}
              step={SHARE_VALUE}
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={inputCls}
              placeholder={`${SHARE_VALUE}, ${SHARE_VALUE * 2}, ${SHARE_VALUE * 3}...`}
            />
            {shares > 0 && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1.5 font-medium">
                = {shares} share{shares !== 1 ? 's' : ''}
              </p>
            )}
          </Field>

          {/* Dropzone */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <ImagePlus size={14} className="text-slate-400" />
              Payment Screenshot
            </label>
            {!screenshot ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
                  ${isDragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-700/30'
                  }`}
              >
                <input {...getInputProps()} />
                <Upload size={36} className={`mx-auto mb-3 ${isDragActive ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600'}`} />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {isDragActive ? 'Drop your screenshot here' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">PNG, JPG up to 10 MB</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
              >
                <img src={screenshot.preview} alt="Preview" className="w-full max-h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => setScreenshot(null)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition shadow-lg"
                >
                  <X size={14} />
                </button>
                <p className="absolute bottom-3 left-3 text-white text-xs font-medium">{screenshot.file.name}</p>
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={!valid}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
          >
            {submitted ? <><CheckCircle2 size={18} /> Submitted!</> : 'Submit Payment'}
          </button>
        </form>
      </div>
    </div>
  );
}
