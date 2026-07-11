<!--
  This file is auto-generated from AGENTS.md by agent-kit for GitHub Copilot.
  Do not edit directly — your changes will be overwritten on the next sync.
  Source: ./AGENTS.md
  Regenerate: npx agent-kit sync
-->

# AGENTS.md

> This file is the single source of truth for instructions given to AI coding
> agents working in this repository. Tool-specific files (`CLAUDE.md`,
> `.gemini/GEMINI.md`, `.github/copilot-instructions.md`, `CONVENTIONS.md`)
> are derived from this file by [agent-kit](https://github.com/hassanzohdy/agent-kit).
>
> **Edit this file, never the derived ones.** Then run `npx agent-kit sync`.

## Project overview

Carting Dashboard — a React 19 + TypeScript single-page app built with Vite and
the [Mongez](https://github.com/hassanzohdy) ecosystem (`@mongez/*`), styled with
Tailwind CSS v4 and Radix UI primitives (shadcn-style components in
`src/components/ui`).

Mongez supplies the application framework, not just utilities: routing, forms,
state atoms, localization, HTTP, and the current-user session all come from
`@mongez/*` packages. Prefer their APIs over hand-rolled equivalents.

See `docs/ARCHITECTURE.md` for how the app boots, how routing and modules are
wired, and the known traps in this codebase. Read it before making structural
changes.

## Skills

This project's dependencies ship skills — focused, task-specific guides your
AI coding agent loads on demand (Claude Code, Cursor, Codex, Copilot, Gemini, and
others each read them from their own skills directory). Before searching the
codebase for examples, reading a package's source/types/README, or inferring an
API by hand, **first check the available skills and load any that match the
package or task**. Skills are the source of truth for how to use a package —
consult them before reverse-engineering usage from code.

131 skills are exported from 19 `@mongez/*` packages into `.claude/skills/`,
named `mongez-<package>-<topic>` (e.g. `mongez-http-interceptors`,
`mongez-react-form-validation`, `mongez-atom-overview`). They are generated
artifacts — do not hand-edit them; re-run `npx agent-kit sync` instead.

## Commands

- `yarn start` — start the dev server (this is the everyday command)
- `yarn build` — typecheck then production build (`tsc && vite build`)
- `yarn tsc` — typecheck only
- `yarn lint` — ESLint with `--fix`, failing on any warning
- `yarn format` — Prettier over `src`
- `yarn preview` — serve the production build

There is **no test runner configured.** `src/setupTests.ts` imports
`@testing-library/jest-dom`, but neither that package nor a runner is installed.
Do not claim tests pass; there are none to run.

**Do not run `yarn dev`.** Despite the name, it deletes `yarn.lock`, runs
`ncu -u` to bump every dependency to its latest major, and reinstalls. It is a
dependency-upgrade script, not a dev-server script. Use `yarn start`.

## Code style

Prettier (`.prettierrc.json`) is authoritative: 2 spaces, double quotes,
semicolons, trailing commas, 80 columns, `arrowParens: "avoid"`,
`bracketSameLine: true`. `prettier-plugin-organize-imports` rewrites import
order and will convert an unresolvable named import into a default import — if
imports keep changing under you, the module's exports are the real problem.

ESLint enforces two rules worth knowing up front:

- `@typescript-eslint/consistent-type-imports` — type-only imports must use
  `import type`.
- `unused-imports/no-unused-imports` — unused imports are errors, not warnings.

Import via the `tsconfig.json` path aliases rather than long relative paths:
`shared/*`, `design-system/*`, `layouts/*`, `assets/*`, `localization/*`,
`app/*`, `apps/*`, `user`, `@/*`, `@ui/*`. `@mongez/vite` mirrors these aliases
into Vite automatically by reading `tsconfig.json`, so a path added in one place
works in both.

Environment variables are exposed through `src/shared/flags/index.tsx`, never
read from `import.meta.env` directly at the call site. Only the `APP_` prefix is
exposed to the client (`envPrefix` in `vite.config.ts`).

## Boundaries

- **TypeScript is pinned to 5.x on purpose.** TypeScript 7's native compiler
  crashes `typescript-eslint` (`Cannot read properties of undefined (reading
  'Cjs')`), and its peer range caps at `<6.1.0`. Do not bump it to 7 until the
  lint toolchain supports it.
- `CLAUDE.md`, `.gemini/GEMINI.md`, `.github/copilot-instructions.md`, and
  `CONVENTIONS.md` are generated. Edit `AGENTS.md` and re-sync.
- `.claude/skills/**` is generated. Edit the upstream package, not the export.
- This directory is **not a git repository**, so there is no undo. Confirm before
  deleting or overwriting anything you did not create.
- `src/apps/front-office/**` is unreachable starter-template code, and
  `src/shared/endpoint.ts` shadows the real `src/shared/endpoint/index.ts`.
  Both are documented in `docs/ARCHITECTURE.md`. Do not add features there, and
  do not delete them without asking — the shadowing is load-bearing today.
