# Wyze Bundle Builder

A product-configurator single-page app: shoppers step through **Choose your
cameras → Choose your plan → Choose your sensors → Add extra protection**,
picking products/variants/quantities at each step, while a live **Review**
panel on the side keeps a running summary of the security bundle — line
items, quantities, discounts, monthly plan cost, and total savings — ending
in a **Checkout** call to action. It was implemented from a Figma design (see
`src/app/home` for the feature code).

It's a React 19 + TypeScript SPA built with Vite and the
[Mongez](https://github.com/hassanzohdy) (`@mongez/*`) application framework —
routing, forms, state atoms, HTTP, localization, and session management all come
from Mongez packages rather than being hand-rolled. UI is Tailwind CSS v4 with
Radix UI primitives (shadcn-style components in `src/components/ui`). The repo
itself started from an internal Mongez/Vite/Tailwind starter template, which is
why some generic scaffolding (e.g. `src/apps/front-office`) still exists
alongside the real feature — see `docs/ARCHITECTURE.md` for what's live vs.
leftover.

For how the app boots, the module/routing system, and known rough edges in this
codebase, see **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

## Prerequisites

- Node.js (developed against v24; anything reasonably current should work)
- Yarn 1 (classic) — `yarn --version` should print `1.x`

## Getting started

```bash
yarn install
yarn start
```

`yarn start` runs `vite --host` and serves the app at the URL Vite prints.

> **Do not run `yarn dev`.** Despite the name, it deletes `yarn.lock`, runs
> `npx ncu -u` to bump every dependency to its latest version (including
> breaking majors), and reinstalls. It's a dependency-upgrade script, not a
> dev-server command. Use `yarn start`.

## Environment variables

Config is read from `.env` and re-exported through `src/shared/flags/index.tsx`
— application code should import from there, not read `import.meta.env`
directly.

- **`.env.example`** is the committed template. It documents every variable
  the app reads, with safe placeholder/default values. Keep it in sync
  whenever a variable is added or removed in `src/shared/flags/index.tsx`.
- **`.env`** is your local copy — gitignored, never committed, safe to hold
  real API keys/secrets. Create it once via:

  ```bash
  cp .env.example .env
  ```

  then fill in whatever real values your task needs (API URL/key, Google/
  Facebook client IDs, etc.). The app metadata vars (`APP_NAME`,
  `APP_DESCRIPTION`, locale/direction, ...) already have sensible defaults in
  `.env.example` and normally don't need to change.

Only variables prefixed `APP_` are exposed to the client build
(`envPrefix` in `vite.config.ts`). A few flags — `FACEBOOK_APP_ID`,
`FACEBOOK_APP_VERSION`, `GOOGLE_CLIENT_ID`, `GOOGLE_MAP_API_KEY` — are read
without that prefix and will be `undefined` in the bundle until either the
prefix is added to their names or `envPrefix` is widened. `APP_API_URL`,
`APP_API_KEY`, `APP_API_OS`, and `APP_BASE_PATH` are also read by
`shared/flags` but are empty in `.env.example` — fill them in if the feature
you're working on needs them.

## Scripts

| Command        | Does                                                   |
| -------------- | ------------------------------------------------------ |
| `yarn start`   | Start the dev server                                   |
| `yarn build`   | Typecheck, then production build (`tsc && vite build`) |
| `yarn preview` | Serve the production build locally                     |
| `yarn tsc`     | Typecheck only (`tsc --noEmit`)                        |
| `yarn lint`    | ESLint with `--fix`, fails on any warning              |
| `yarn format`  | Prettier over `src`                                    |

There is no test runner configured — `yarn build` and `yarn lint` are the
quality gates.

## Project structure

```
src/
  main.tsx        entry point
  config/         active app + router configuration
  app/            the live application (routes, pages, services, per-module state)
    home/         the Wyze Bundle Builder feature itself — atoms, components,
                   product data, cart hook, and the BundleBuilderPage
  components/ui/  shadcn-style Radix primitives
  design-system/  shared app components, hooks, types
  layouts/        Root, BaseLayout
  shared/         HTTP client, env flags, URLs, shared utils, localization
  localization/   global translation files
  apps/front-office/  unreachable starter-template leftovers — do not build on
                       this, see docs/ARCHITECTURE.md
```

Full detail — the module/routing system, data flow, styling, and known traps —
is in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Code style

Prettier and ESLint are enforced (`yarn format`, `yarn lint`). Import via the
`tsconfig.json` path aliases (`shared/*`, `design-system/*`, `app/*`, `@/*`,
`@ui/*`, etc.) rather than long relative paths — `@mongez/vite` mirrors these
into Vite automatically.
