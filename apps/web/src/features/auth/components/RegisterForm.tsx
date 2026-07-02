'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegister } from '../hooks/useRegister';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, isSuccess, data, error } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  if (isSuccess && data?.needsConfirmation) {
    return (
      <Card>
        <CardContent className="pt-6 text-center space-y-2">
          <p className="text-base font-semibold text-foreground">이메일을 확인해 주세요</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{email}</span>으로<br />
            인증 링크를 보냈습니다.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">로그인으로 돌아가기</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="8자 이상 입력해 주세요"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button type="submit" form="register-form" className="w-full" disabled={isPending}>
          {isPending ? '가입 중...' : '회원가입'}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-foreground font-medium underline underline-offset-4">
            로그인
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
