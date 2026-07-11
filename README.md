# Carting Dashboard

A React 19 + TypeScript single-page app built with Vite and the
[Mongez](https://github.com/hassanzohdy) (`@mongez/*`) application framework —
routing, forms, state atoms, HTTP, localization, and session management all come
from Mongez packages rather than being hand-rolled. UI is Tailwind CSS v4 with
Radix UI primitives (shadcn-style components in `src/components/ui`).

For how the app boots, the module/routing system, and known rough edges in this
codebase, see **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

For AI coding agent conventions (Claude Code, Cursor, Copilot, etc.), see
**[AGENTS.md](AGENTS.md)**.

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

Config is read from `.env` (already present in this repo) and re-exported
through `src/shared/flags/index.tsx` — application code should import from
there, not read `import.meta.env` directly.

Only variables prefixed `APP_` are exposed to the client build
(`envPrefix` in `vite.config.ts`). A few flags — `FACEBOOK_APP_ID`,
`FACEBOOK_APP_VERSION`, `GOOGLE_CLIENT_ID`, `GOOGLE_MAP_API_KEY` — are read
without that prefix and will be `undefined` in the bundle until either the
prefix is added to their names or `envPrefix` is widened. `APP_API_URL`,
`APP_API_KEY`, `APP_API_OS`, and `APP_BASE_PATH` are also read by
`shared/flags` but are not currently set in `.env` — add them if the feature
you're working on needs them.

## Scripts

| Command | Does |
| --- | --- |
| `yarn start` | Start the dev server |
| `yarn build` | Typecheck, then production build (`tsc && vite build`) |
| `yarn preview` | Serve the production build locally |
| `yarn tsc` | Typecheck only (`tsc --noEmit`) |
| `yarn lint` | ESLint with `--fix`, fails on any warning |
| `yarn format` | Prettier over `src` |

There is no test runner configured — `yarn build` and `yarn lint` are the
quality gates.

## Project structure

```
src/
  main.tsx        entry point
  config/         active app + router configuration
  app/            the live application (routes, pages, services, per-module state)
  components/ui/  shadcn-style Radix primitives
  design-system/  shared app components, hooks, types
  layouts/        Root, BaseLayout
  shared/         HTTP client, env flags, URLs, shared utils, localization
  localization/   global translation files
```

Full detail — the module/routing system, data flow, styling, and known traps —
is in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Code style

Prettier and ESLint are enforced (`yarn format`, `yarn lint`). Import via the
`tsconfig.json` path aliases (`shared/*`, `design-system/*`, `app/*`, `@/*`,
`@ui/*`, etc.) rather than long relative paths — `@mongez/vite` mirrors these
into Vite automatically.

## AI coding agents

This repo ships [Mongez skills](https://github.com/hassanzohdy/agent-kit) for
AI coding agents — 130+ focused usage guides for the `@mongez/*` packages,
synced via `@mongez/agent-kit` into `.claude/skills/` (and equivalent folders
for other agents). They refresh automatically on `yarn install` via the
`postinstall` script. See [AGENTS.md](AGENTS.md) for details.
