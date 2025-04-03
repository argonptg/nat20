import type { Handle } from "@sveltejs/kit";
import { gunzipSync } from "zlib";

export const handle: Handle = async ({ event, resolve }) => {
    let sessionToken = event.cookies.get("session");

    if (sessionToken) {
        const [, gzipped] = sessionToken.split(".")

        if (!gzipped) throw new Error("Invalid cookie format!");

        const decoded = Buffer.from(gzipped, "base64");
        const decompressedData: Auth = JSON.parse(gunzipSync(decoded).toString());

        event.locals.auth = decompressedData;
    }

    return resolve(event)
}