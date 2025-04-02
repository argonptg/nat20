import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginForm } from './schema';
import { randomBytes } from 'crypto';
import * as argon2 from 'argon2'; // look it's me!
import { users } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db/index.js';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginForm))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginForm));

		if (!form.valid) return fail(400, { form });

        const row = db.select().from(users).where(eq(users.email, form.data.email))

        // hashing is cool :sunglasses:
        const hash = await argon2.hash(form.data.password);

        // const user: typeof users.$inferInsert = {
        //     username: form.data.username,
        //     hash: hash,
        //     desc: "",
        // }

        //await db.insert(users).values(user);
        //console.log(`DING DONG MOTHERFUCKER A USER REGISTERED! \nUsername: ${form.data.username}\n==========================`)
	}
};
