# verify-options — Architecture & Decisions

## Why this exists

JSON Schema (draft-07) cannot express cross-field constraints. If your tracer options
have mutual exclusion rules, conditional required fields, or other relationships between
options, enforce them here — after the API layer has validated the schema and filled defaults.

If your options have no such constraints, leave `index.ts` as a no-op. The file stays
as a placeholder so the structure is clear for future contributors.

## Why a folder?

Keeps validation logic, local types, and tests co-located and out of `src/`. If new
constraints are added, each can get its own helper file here.

## Constraints

TODO: Document each semantic constraint your options require.

Example structure:

### `option-a` / `option-b` mutual exclusion

TODO: Explain why these two options cannot be provided together, and what happens if they are.

JSON Schema cannot express "at most one of these two values may be set" — a code
check in `verifyOptions` is clearer and easier to maintain.
