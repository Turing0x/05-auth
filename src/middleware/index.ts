import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ["/protected"];

export const onRequest = defineMiddleware((context, next) => {
  const authHeaders = context.request.headers.get("authorization");
  if (privateRoutes.includes(context.url.pathname)) {
    if (!authHeaders) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }
    checkLocalAuth(authHeaders, next);
  }

  return next();
});

const checkLocalAuth = (data: string, next: MiddlewareNext) => {
  const [username, password] = atob(data.split(" ").at(-1) ?? "");
  if (username === "admin" && password === "admin") {
    return next();
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic real="Secure Area"',
    },
  });
};
