/*
  # User verification schema

  1. New Tables
    - `user_verification`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `verification_code` (text)
      - `verified` (boolean)
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `user_verification` table
    - Add policy for authenticated users to read/update their own verification
*/

CREATE TABLE IF NOT EXISTS user_verification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  verification_code text NOT NULL,
  verified boolean DEFAULT false,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_verification ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own verification"
  ON user_verification
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own verification"
  ON user_verification
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);