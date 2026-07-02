export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Outfit AI</h1>
          <p className="mt-1 text-sm text-muted-foreground">AI 옷 코디 추천 서비스</p>
        </div>
        {children}
      </div>
    </div>
  );
}
