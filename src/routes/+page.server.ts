export const load = ({ locals, cookies }) => {
    const isLogged = cookies.get("session");

    if (isLogged) {
        return {
            loggedIn: true,
            profile: locals.auth
        }
    }

    locals.auth = null; // just for good measure

    return {
        loggedIn: false,
        profile: {}
    }
}