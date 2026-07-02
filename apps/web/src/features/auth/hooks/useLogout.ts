'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => router.push('/login'),
  });
}
