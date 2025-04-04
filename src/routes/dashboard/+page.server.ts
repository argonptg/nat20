import { db } from '$lib/server/db/index.js';
import { characters, users } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
    if (!locals.auth) return { chars: [] };

    const chars = await db
        .select()
        .from(characters)
        .where(eq(characters.userId, locals.auth.id));
    
    console.log('chars[0]);
}