/*
  # Create media_stats table

  ## Purpose
  Replaces Firebase Firestore for tracking views and likes on gallery media items.

  ## New Tables
  - `media_stats`
    - `id` (uuid, primary key, auto-generated)
    - `filename` (text, unique) - the media file name used as identifier
    - `views` (integer, default 0) - view count
    - `likes` (integer, default 0) - like count
    - `created_at` (timestamptz) - record creation timestamp

  ## Security
  - RLS enabled
  - Public SELECT allowed (gallery is public)
  - Public INSERT allowed (for creating new stat records)
  - Public UPDATE allowed (for incrementing views/likes)
  - No DELETE allowed
*/

CREATE TABLE IF NOT EXISTS media_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text UNIQUE NOT NULL,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read media stats"
  ON media_stats FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can insert media stats"
  ON media_stats FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can update media stats"
  ON media_stats FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
