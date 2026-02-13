import { drizzle } from 'drizzle-ormNeon-http';
import { neon } from '@neondatabaseServerless';
import * as schema from './schema';

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
export const db = sql ? drizzle(sql, { schema }) : null as any;

// Re-export for convenience
export { schema };
