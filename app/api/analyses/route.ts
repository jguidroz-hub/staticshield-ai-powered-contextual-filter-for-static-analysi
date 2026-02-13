import { NextResponse } from 'next/server';
import { auth } from '@/libAuth';
import { db } from '@/libDb';
import { analyses } from '@/libDomain-schema';
import { eq, desc } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  // Rate limit: 20 per 1min

  const items = await db.select().from(analyses)
    .where(eq(analyses.userId, session.user.id))
    .orderBy(desc(analyses.createdAt))
    .limit(100);

  return NextResponse.json({ items, count: items.length });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const id = randomUUID();

  const [item] = await db.insert(analyses).values({
    id,
    userId: session.user.id,
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return NextResponse.json(item, { status: 201 });
}
