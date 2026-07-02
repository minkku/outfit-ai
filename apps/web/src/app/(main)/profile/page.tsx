'use client';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/features/auth/hooks/useLogout';

export default function ProfilePage() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">프로필</h2>
      <Button
        variant="outline"
        onClick={() => logout()}
        disabled={isPending}
      >
        {isPending ? '로그아웃 중...' : '로그아웃'}
      </Button>
    </div>
  );
}
