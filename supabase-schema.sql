-- Job Story: Supabase テーブルスキーマ
-- Supabase Dashboard > SQL Editor で実行してください

-- ユーザーテーブル（IDのみログイン）
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 診断履歴テーブル
CREATE TABLE diagnosis_records (
  id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  primary_trait TEXT NOT NULL,
  secondary_trait TEXT NOT NULL,
  traits JSONB NOT NULL,
  game_mode TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, id)
);

CREATE INDEX idx_diagnosis_user ON diagnosis_records(user_id, created_at DESC);

-- ゲーム結果テーブル
CREATE TABLE game_results (
  id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  game_mode TEXT NOT NULL,
  primary_trait TEXT NOT NULL,
  stats JSONB NOT NULL,
  discovered_job_ids TEXT[] NOT NULL DEFAULT '{}',
  recommended_job_ids TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, id)
);

CREATE INDEX idx_results_user ON game_results(user_id, created_at DESC);

-- 体験振り返りテーブル
CREATE TABLE experience_reflections (
  id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_id TEXT NOT NULL,
  job_title TEXT NOT NULL,
  date TEXT NOT NULL,
  interest_level INTEGER NOT NULL,
  interest_tags TEXT[] NOT NULL DEFAULT '{}',
  free_comment TEXT NOT NULL DEFAULT '',
  scores JSONB NOT NULL DEFAULT '{}',
  result_title TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, id)
);

CREATE INDEX idx_reflections_user ON experience_reflections(user_id, created_at DESC);

-- RLS無効化（IDのみログインのシンプル運用のため）
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnosis_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;

-- 全操作を許可するポリシー（anon keyでアクセス）
CREATE POLICY "Allow all on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on diagnosis_records" ON diagnosis_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on game_results" ON game_results FOR ALL USING (true) WITH CHECK (true);
ALTER TABLE experience_reflections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on experience_reflections" ON experience_reflections FOR ALL USING (true) WITH CHECK (true);
