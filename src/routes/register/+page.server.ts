import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerForm } from './schema';
import { randomBytes } from 'crypto';
import * as argon2 from 'argon2'; // look it's me!
import { users } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db/index.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerForm))
	};
};

export const actions: Actions = {
    default: async (event) => {
        // Validação do formulário de registro
        const form = await superValidate(event, zod(registerForm));

        if (!form.valid) return fail(400, { form });
        // Confirmação de senha deve ser igual
        if (form.data.password !== form.data.passwordConfirm) return fail(400, { form });

        // Cria hash seguro da senha com Argon2
        const hash = await argon2.hash(form.data.password);

        // Cria objeto de usuário para inserção
        const user: typeof users.$inferInsert = {
            username: form.data.username,
            email: form.data.email,
            hash: hash,
            desc: "",
        }

        // Insere usuário no banco de dados
        await db.insert(users).values(user);
        
        return redirect(303, "/login");
    }
};
