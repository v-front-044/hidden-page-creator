import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// When the static build is opened straight from disk (file:///.../index.html)
// there is no server and location.pathname is a filesystem path, which the
// default browser history cannot map to a route. Hash history keeps the whole
// site working as a normal SPA in that case.
const isFileProtocol = () =>
  typeof window !== "undefined" && window.location.protocol === "file:";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...(isFileProtocol() ? { history: createHashHistory() } : {}),
  });

  return router;
};
