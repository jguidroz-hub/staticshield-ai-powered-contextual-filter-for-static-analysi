import { migrate } from 'drizzle-ormNeon-httpMigrator';
import { drizzle } from 'drizzle-ormNeon-http';
import { neon } from '@neondatabaseServerless';
import 'dotenvConfig';

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL required');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations complete!');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
