import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { gunzipSync } from "zlib";

export const handle: Handle = async ({ event, resolve }) => {
    // Obtém o cookie de sessão da requisição
    let sessionToken = event.cookies.get("session");

    if (!sessionToken) return resolve(event) // Sem token, ignora

    // Verifica se o cookie existe no banco de dados
    let cookie = await db
        .select({
            cookie: users.sessionToken
        })
        .from(users)
        .where(eq(users.sessionToken, sessionToken));
    
    if (!cookie.length) return resolve(event) // Cookie não encontrado no banco

    // Valida e decodifica os dados do usuário
    if (sessionToken && sessionToken === cookie[0].cookie) {
        const [, gzipped] = sessionToken.split(".")

        if (!gzipped) throw new Error("Formato de cookie inválido!");

        // Descomprime os dados do usuário do cookie
        const decoded = Buffer.from(gzipped, "base64");
        const decompressedData: Auth = JSON.parse(gunzipSync(decoded).toString());

        // Armazena os dados autenticados no contexto local
        event.locals.auth = decompressedData;
    }

    return resolve(event)
}