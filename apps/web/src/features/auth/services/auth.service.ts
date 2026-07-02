import { createClient } from '@/lib/supabase/client';

const ERROR_MAP: Record<string, string> = {
  'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'Email not confirmed': '이메일 인증이 필요합니다. 받은 편지함을 확인해 주세요.',
  'User already registered': '이미 가입된 이메일입니다.',
};

function toKoreanError(message: string): string {
  return ERROR_MAP[message] ?? message;
}

export const authService = {
  async login(email: string, password: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(toKoreanError(error.message));
  },

  async register(email: string, password: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(toKoreanError(error.message));
    return { needsConfirmation: !data.session };
  },

  async logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },
};
