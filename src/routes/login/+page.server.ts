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

// Função para configurar o cookie de sessão de forma segura
function setCookie(event: RequestEvent, cookie: string, auth: Auth) {
    event.locals.auth = auth;

    event.cookies.set("session", cookie, {
        httpOnly: true,  // Cookie inacessível via JavaScript
        secure: Boolean(PRODUCTION), // HTTPS apenas em produção
        path: "/",
        sameSite: "lax", // Prevenção básica de CSRF
        maxAge: 60 * 60 * 24 * 60 // 60 dias
    });
}

export const actions: Actions = {
    default: async (event) => {
        // Validação do formulário com Zod
        const form = await superValidate(event, zod(loginForm));

        if (!form.valid) return fail(400, { form });

        // Busca usuário pelo email
        const row = await db
            .select()
            .from(users)
            .where(eq(users.email, form.data.email))
            .execute()

        // Verifica a senha com Argon2
        const isValid = await argon2.verify(row[0].hash, form.data.password)

        if (isValid) {
            const { hash, ...dataSafe } = row[0]; 

            // Gera novo token se não existir
            if (!row[0].sessionToken) {
                const randomByte = randomBytes(32).toString("hex");
                const gzipped = gzipSync(JSON.stringify(dataSafe)).toString("base64");
                const cookie = `NAT20COOKIE-${randomByte}.${gzipped}`;
                
                setCookie(event, cookie, dataSafe);
    
                // Atualiza o token no banco de dados
                await db
                    .update(users)
                    .set({ sessionToken: cookie })
                    .where(eq(users.email, form.data.email));
                
                return redirect(303, "/dashboard");
            }

            // Reutiliza token existente
            setCookie(event, row[0].sessionToken, dataSafe);
            
            return redirect(303, "/dashboard");
        }
    }
};

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginForm))
	};
};