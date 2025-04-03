import type { PageServerLoad, Actions, RouteParams } from './$types.js';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginForm } from './schema';
import { randomBytes } from 'crypto';
import * as argon2 from 'argon2'; // look it's me!
import { users } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db/index.js';
import { eq } from 'drizzle-orm';
import { gzipSync } from 'zlib';
import { PRODUCTION } from '$env/static/private';

function setCookie(event: RequestEvent, cookie: string, auth: Auth) {
    console.log("Setting cookie:", cookie); // Debugging

    event.locals.auth = auth; // Ensure we store user data in locals

    event.cookies.set("session", cookie, {
        httpOnly: true,
        secure: Boolean(PRODUCTION), // Auto-switch based on environment
        path: "/",
        sameSite: "lax", // Helps prevent CSRF issues
        maxAge: 60 * 60 * 24 * 60 // 60 days in seconds
    });

    console.log("Cookie set successfully!"); // Debugging
}

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginForm))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginForm));

		if (!form.valid) return fail(400, { form });

        const row = await db
            .select()
            .from(users)
            .where(eq(users.email, form.data.email))
            .execute()

        const isValid = await argon2.verify(row[0].hash, form.data.password)

        if (isValid) {
            const { hash, ...dataSafe } = row[0]; 

            // if no cookie me hungy :(
            if (!row[0].sessionToken) {
                const randomByte = randomBytes(32).toString("hex");
                const gzipped = gzipSync(JSON.stringify(dataSafe)).toString("base64");
                const cookie = `NAT20COOKIE-${randomByte}.${gzipped}`;
                
                setCookie(event, cookie, dataSafe);
    
                await db
                    .update(users)
                    .set({ sessionToken: cookie })
                    .where(eq(users.email, form.data.email));
                
                console.log(`DING DONG MOTHERFUCKER A USER LOGGED IN! \nUsername: ${row[0].username}\n==========================`)
                return redirect(303, "/dashboard");
            }

            setCookie(event, row[0].sessionToken, dataSafe);
            console.log(`DING DONG MOTHERFUCKER A USER LOGGED IN! \nUsername: ${row[0].username}\n==========================`)
            
            return redirect(303, "/dashboard");
        }
	}
};
