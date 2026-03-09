import { useState } from 'react';

interface LoginPageProps {
  onLogin: (userId: string) => void;
}

/** ログイン画面（IDのみ） */
export function LoginPage({ onLogin }: LoginPageProps) {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = userId.trim();
    if (!trimmed) {
      setError('IDを入力してください');
      return;
    }
    if (trimmed.length < 2) {
      setError('2文字以上で入力してください');
      return;
    }
    if (trimmed.length > 20) {
      setError('20文字以内で入力してください');
      return;
    }
    onLogin(trimmed);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      <div className="w-full max-w-sm animate-fade-in">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl">🎒</span>
            <span className="text-3xl text-gray-300">→</span>
            <span className="text-4xl">🎓</span>
            <span className="text-3xl text-gray-300">→</span>
            <span className="text-4xl">💼</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
            Job Story
          </h1>
          <p className="text-sm text-gray-400">
            IDを入力してはじめよう
          </p>
        </div>

        {/* ログインフォーム */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-semibold text-gray-700 mb-2">
              あなたのID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setError('');
              }}
              placeholder="ニックネームやIDを入力"
              autoFocus
              autoComplete="username"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-300 focus:border-indigo-400 focus:outline-none transition-colors text-base"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1.5">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            ログイン
          </button>
        </form>

        <p className="text-center text-xs text-gray-300 mt-6">
          パスワードは不要です。同じIDで履歴が残ります。
        </p>
      </div>
    </div>
  );
}
