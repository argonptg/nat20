export const load = ({ locals, cookies }) => {
    // Verifica se existe um cookie de sessão
    const isLogged = cookies.get("session");

    // Se o usuário estiver autenticado
    if (isLogged) {
        return {
            loggedIn: true,
            profile: locals.auth  // Retorna os dados do usuário armazenados no hook
        }
    }

    // Limpa qualquer dado de autenticação residual
    locals.auth = null;

    // Retorna estado não autenticado
    return {
        loggedIn: false,
        profile: {}  // Objeto vazio para evitar erros em componentes
    }
}