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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-violet-100 via-indigo-50 via-50% to-amber-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="animated-bg">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-200/20 animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-amber-200/20 animate-float-medium" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-pink-200/15 animate-float-fast" />
      </div>

      {/* Floating emoji decorations */}
      <div className="absolute top-[12%] left-[8%] text-3xl animate-float-slow opacity-30 select-none">
        🎯
      </div>
      <div className="absolute top-[20%] right-[12%] text-2xl animate-float-medium opacity-25 select-none">
        🌟
      </div>
      <div className="absolute bottom-[25%] left-[15%] text-2xl animate-float-fast opacity-20 select-none">
        🚀
      </div>
      <div className="absolute bottom-[15%] right-[10%] text-3xl animate-float-slow opacity-25 select-none">
        💡
      </div>

      <div className="w-full max-w-sm animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="text-4xl animate-float-slow inline-block">🎒</span>
            <span className="text-2xl text-indigo-300 animate-sparkle">✦</span>
            <span className="text-4xl animate-float-medium inline-block">🎓</span>
            <span className="text-2xl text-amber-300 animate-sparkle" style={{ animationDelay: '0.5s' }}>✦</span>
            <span className="text-4xl animate-float-fast inline-block">💼</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight animate-gradient-shift">
            Job Story
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            あなたの未来のキャリアを見つけよう
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl shadow-indigo-100/50 p-6 space-y-4 border border-white/50">
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all text-base"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1.5">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn-glow w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200/50 transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            はじめる
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          パスワードは不要です。同じIDで履歴が残ります。
        </p>
      </div>
    </div>
  );
}
