# record/

Tracer core. Exposes one function: `record(code, config)`.

## What this directory contains

```
record/
  index.ts          ← Entry point. Re-exports record.ts (add env detection here if needed).
  record.ts         ← RecordFunction stub. TODO: implement your tracer here.
  types.ts          ← Internal types (RawStep, TracerOptions). TODO: replace placeholders.
  tests/
    record.test.ts         ← Integration tests for record(). TODO: add your tests.
```

## Your Implementation

`record.ts` is where your tracer engine goes. It receives:

- `code` — the source code string to trace
- `config.meta` — frozen execution limits (`maxSteps`, `maxTime`, etc.)
- `config.options` — frozen tracer options (validated against your schema)

It must return a `Promise<readonly StepCore[]>` and throw `ParseError`, `RuntimeError`,
or `LimitExceededError` on failure. See `@study-lenses/tracing` for the full contract.

## The Pipeline

```
record(code, { meta, options })        ← record/index.ts (entry, env detection if needed)
  └─ your engine call                  ← record/record.ts (your implementation)
       └─ adapt to StepCore shape
            └─ renumber steps (1-indexed if needed)
```

## What `index.ts` exposes

`record(code, { meta, options })` — the `RecordFunction` as required by
`@study-lenses/tracing`. Called by the tracing wrappers after schema validation and
options verification.

If your engine needs environment detection (e.g. browser vs. Node, Pyodide vs. CPython),
add that logic in `index.ts` rather than `record.ts`.

## Tests

- `record.test.ts` — integration tests through `record()`: real code strings, checks
  step structure, error propagation
