import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { clearMessages } from '../app/services/slices/usersSlice';

const AUTO_DISMISS_MS = 4000;

export default function GlobalAlert() {
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.users);
  const [visible, setVisible] = useState(false);

  const message = error || successMessage;
  const isError = Boolean(error);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => dispatch(clearMessages()), 300);
      }, AUTO_DISMISS_MS);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => dispatch(clearMessages()), 300);
  };

  if (!message) return null;

  return (
    <div
      className={`fixed top-6 right-6 z-[100] max-w-sm w-full transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-lg shadow-lg border ${
          isError
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-green-50 border-green-200 text-green-700'
        }`}
      >
        {isError ? (
          <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
        )}
        <p className="text-sm flex-1">{message}</p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
