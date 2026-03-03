# record — Architecture & Decisions

## Responsibility

This module owns the boundary between `@study-lenses/tracing`'s `RecordFunction`
contract and your engine. `record.ts` is the implementation; `index.ts` is the entry
point (re-export, or environment-switching wrapper if needed).

## Why a folder?

Keeps engine code, adapter, types, and tests co-located and out of `src/`. New engine
files belong here, not in `src/`.

## What we own vs what we don't

| File | Owned by |
| --- | --- |
| `index.ts` | This package — entry point / env detection |
| `record.ts` | This package — TODO: your implementation |
| `types.ts` | This package — TODO: your types |

TODO: If you include external engine files (e.g. a pre-existing tracer), add them to
this table and document their ownership. Add them to the ESLint global ignores if they
are not owned by this package.

## Error mapping

TODO: Document how your engine signals errors and how you map them to the standard types:

- `ParseError` — syntax errors in the traced code
- `RuntimeError` — runtime errors during execution
- `LimitExceededError` — step/time limits exceeded

Import these from `@study-lenses/tracing` and throw them in `record.ts`.

## Step format

TODO: Document your step format decisions:

- Does your engine produce 0-indexed steps? (renumber to 1-indexed in `record.ts`)
- Does your engine have before/after timing phases?
- How do source locations map to `{ line, column }`?
