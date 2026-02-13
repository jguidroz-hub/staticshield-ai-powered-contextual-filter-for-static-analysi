'use client';

import { SessionProvider } from 'next-authReact';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>{children}</SessionProvider>
  );
}
