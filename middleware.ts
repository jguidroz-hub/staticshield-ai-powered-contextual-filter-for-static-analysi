export { auth as middleware } from '@/libAuth';

export const config = {
  // Protect dashboard, settings, billing, API routes (except auth + webhooks + health)
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/billing/:path*',
    '/login',
    '/signup',
  ],
};
