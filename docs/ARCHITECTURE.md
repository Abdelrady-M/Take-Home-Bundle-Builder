# Architecture

Carting Dashboard is a React 19 SPA on Vite, built on the Mongez (`@mongez/*`)
application framework. This document covers how the app boots, the conventions a
new feature must follow, and the traps currently in the codebase.

## Stack

| Concern | Package |
| --- | --- |
| App bootstrap | `@mongez/react` |
| Routing, layouts, middleware | `@mongez/react-router` |
| State | `@mongez/react-atom` / `@mongez/atom` |
| Forms + validation | `@mongez/react-form` |
| HTTP | `@mongez/http` (v3, native fetch) |
| Current user / session | `@mongez/user` |
| i18n | `@mongez/localization`, `@mongez/react-localization` |
| Caching | `@mongez/cache` |
| `<head>` management | `@mongez/react-helmet` |
| Vite integration | `@mongez/vite` |
| UI | Tailwind v4, Radix UI, shadcn-style `src/components/ui` |

`@mongez/vite` reads `tsconfig.json` and mirrors its `paths` into Vite's resolver,
so path aliases are declared once.

## Boot sequence

```
src/main.tsx
  └─ import "./config/config"          ← side-effect: all configuration
  └─ startApplication()                ← @mongez/react takes over
```

`src/config/config.ts` runs before anything renders. In order, it:

1. imports `./initial-config` first (ordering matters — the blank line after it
   stops `organize-imports` from sorting it away),
2. configures `@mongez/react-helmet`,
3. calls `setRouterConfigurations(routerConfigurations)`,
4. calls `setAppConfigurations(appConfigurations)` with the localization setup.

`src/config/router-configurations.ts` then defines the routing contract:

- `setApps([frontOfficeApp])` where `frontOfficeApp` is **`src/app/app-modules.json`**
- `rootComponent` → `layouts/Root`
- `notFound` → redirect to `URLS.notFound`
- `lazyLoading.loaders` → how apps and modules are code-split (below)

## The module system

`src/app/app-modules.json` is the routing manifest. Each entry maps URL prefixes
to a module directory:

```json
{
  "path": "/",
  "name": "front-office",
  "modules": [
    { "name": "account", "entry": ["/account", "/login", "/register", "..."] },
    { "name": "home", "entry": ["/"] },
    { "name": "design-system", "entry": ["/design-system"] }
  ]
}
```

When the user navigates to an `entry` prefix, the router lazy-loads that module
via the `loaders` in `router-configurations.ts`:

- `app` loader → `import("app/app-main")` — `src/app/app-main.ts`, which only
  imports global localization.
- `module` loader → `import("app/${module}/main.ts")`

So each module is a directory under `src/app/<module>/` with a `main.ts` whose
sole job is `import "./routes"`. Registering the routes is a side effect of
importing the module.

### Adding a module

1. Create `src/app/<name>/main.ts` containing `import "./routes";`
2. Create `src/app/<name>/routes.ts` and register routes through the helpers in
   `src/app/config/router.ts` (never `router.add` directly).
3. Add `{ "name": "<name>", "entry": ["/your-prefix"] }` to `app-modules.json`.

Miss step 3 and the module never loads. Miss step 1 and the lazy import throws at
navigation time, not at build time.

> **Known drift:** `app-modules.json` declares an `informative-pages` module
> (`/about-us`, `/privacy-policy`, `/terms-conditions`) that does not exist on
> disk. Navigating to those paths will fail to resolve the module.

### Route helpers

`src/app/config/router.ts` wraps `@mongez/react-router` with four helpers.
Use these so layout and auth middleware stay consistent:

- `publicRoutes(routes)` — visitors and users; wrapped in `BaseLayout`
- `guardedRoutes(routes)` — logged-in only (`Guardian` middleware) + `BaseLayout`
- `reverseGuardedRoutes(routes)` — logged-out only (`ReverseGuardian`), e.g. `/login`
- `accountRoutes(routes)` — guarded, no `BaseLayout` (dashboard shell)

## Directory layout

```
src/
  main.tsx              entry
  config/               active configuration (config, router, initial-config)
  app/                  ← THE LIVE APPLICATION
    app-modules.json    routing manifest
    app-main.ts         app-level lazy entry
    config/router.ts    route helper wrappers
    account/            module: atoms, hooks, middleware, pages, service, user
    home/               module: atoms, pages, services
    design-system/      module: showcase pages
  apps/front-office/    ← DEAD starter-template code, see Traps
  components/ui/        shadcn-style Radix primitives
  design-system/        shared app components, hooks, types
  layouts/              Root, BaseLayout
  shared/               endpoint, flags, urls, utils, localization, hooks
  localization/         global translations (common, countries)
```

A module owns its own `atoms/`, `hooks/`, `service/`, `pages/`. Cross-module
code belongs in `shared/` or `design-system/`.

## Data flow

**HTTP.** `src/shared/endpoint/index.ts` builds the `Http` instance: `baseURL`
from `apiBaseUrl`, an `auth` factory that reads the bearer token off `user`, a
`before` interceptor injecting the `lang` header, and an `after` interceptor that
unwraps the `{ data: ... }` envelope, calls `user.login()` when the payload
carries a user, and logs out + redirects on 401.

`@mongez/http` v3 resolves with a `{ data, error }` union instead of rejecting.
This codebase's services opt into `{ throw: true }` so the existing
`.then()/.catch()` callers keep working:

```ts
const options = { throw: true };
export function login(data: any) {
  return endpoint.post("/login", data, options);
}
```

New code may prefer the idiomatic union — just be consistent within a service.

**State.** Module-scoped atoms, e.g. `src/app/home/atoms/index.ts`:

```ts
export const counterAtom = atom({ key: "counter", default: 0 });
```

**Session.** `src/app/account/user/index.ts` subclasses `@mongez/user`'s `User`,
backs it with `@mongez/cache` under key `"usr"`, and calls `setCurrentUser(user)`
so other packages resolve it. Import it via the `user` alias.

**Config/env.** Every `import.meta.env` read is centralized in
`src/shared/flags/index.tsx`. Only `APP_`-prefixed vars reach the client.

## Styling

Tailwind **v4**. The PostCSS plugin moved to `@tailwindcss/postcss`, and
`src/main.css` uses the v4 entry form:

```css
@import "tailwindcss";
@config "../tailwind.config.ts";
```

`@config` keeps the existing JS config (theme tokens, `tailwindcss-animate`)
working under v4. Design tokens are HSL triplets on `:root` / `.dark`, consumed
as `hsl(var(--token))`. Autoprefixer is gone — v4 prefixes for itself.

## Traps

These are real and will bite. They are documented, not fixed.

**1. `shared/endpoint.ts` shadows `shared/endpoint/index.ts`.** A `.ts` file wins
module resolution over a sibling directory's `index.ts`, so every
`import ... from "shared/endpoint"` resolves to the *file* — the front-office
copy — and `shared/endpoint/index.ts` is unreachable.

The consequence is subtle: `endpoint.ts` imports
`apps/front-office/account/user`, which is a **different `User` instance** from
the one your components get via the `user` alias. Both persist to cache key
`"usr"`, so reloads agree, but an in-memory `user.login()` fired from the
interceptor does not update the instance the UI reads. Deleting
`shared/endpoint.ts` and repointing the two front-office service files fixes it.

**2. `src/apps/front-office/**` is dead code.** It is the Mongez starter template.
Nothing reachable from `main.tsx` imports it; the live app is `src/app/`. It
still typechecks and lints, so it silently costs you on every refactor. It exists
only because trap #1 depends on `endpoint.ts`, which imports from it.

**3. `parseError()` still expects the Axios shape.** `src/shared/utils/parse-error.tsx`
reads `error.response.data.errors`. Under `@mongez/http` v3, `HttpError` exposes
the parsed body as `.body` and `.response` is a raw fetch `Response`. Validation
errors surfaced through select inputs (`design-system/hooks/use-select.tsx`) will
render incorrectly until this is ported.

**4. `yarn dev` is not a dev server.** It is
`rm -rf node_modules/.vite && unlink yarn.lock && yarn update && yarn install && yarn start`
— it deletes the lockfile and bumps every dependency to its latest major. Use
`yarn start`.

**5. TypeScript is pinned to 5.x.** TS 7's native compiler crashes
`typescript-eslint` at require time, and `typescript-eslint`'s peer range caps at
`<6.1.0`. Bumping TypeScript to 7 breaks `yarn lint` entirely.

**6. No tests.** `src/setupTests.ts` imports `@testing-library/jest-dom`, but
neither it nor a runner is in `package.json`. `yarn build` and `yarn lint` are
the only gates.

**7. Not a git repository.** There is no undo. The `prepare` script's
`husky install` fails for this reason on every `yarn install`; dependencies still
install correctly.

## Quality gates

```bash
yarn tsc     # tsc --noEmit
yarn lint    # eslint --fix, --max-warnings 0
yarn build   # tsc && vite build
```

All three pass as of the Mongez v3 / Tailwind v4 upgrade. The `huskier`
pre-commit hook runs `format`, `lint`, and `tsc` — but only once this becomes a
git repository.
