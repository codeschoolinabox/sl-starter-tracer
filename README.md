# @study-lenses/CHANGEME

[![npm version](https://img.shields.io/npm/v/@study-lenses/CHANGEME.svg)](https://www.npmjs.com/package/@study-lenses/CHANGEME)
[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> TODO: One sentence — what language/runtime does this tracer instrument?

A `@study-lenses` tracer package. Instruments and executes source code,
returning a step-by-step execution trace for educational tooling.

## Install

```bash
npm install @study-lenses/CHANGEME
```

## Quick Start

```typescript
import trace from '@study-lenses/CHANGEME';

// CHANGEME: replace with a real example for your language
const steps = await trace('let x = 1 + 2;');
console.log(steps);
```

## Tracer Contract

This package implements the `@study-lenses/tracing` tracer interface:

| Export                  | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `trace(code, config?)`  | Instrument and execute code, return steps          |
| `tracify(config)`       | Pre-bind config, return a `trace` function         |
| `embody(code, config?)` | Instrument and execute, return embodied result     |
| `embodify(config)`      | Pre-bind config, return an `embody` function       |
| `tracer`                | The raw `TracerModule` (for introspection)         |

## What to Implement

Fork this repo, then fill in:

1. `src/id.ts` — unique tracer ID (format: `'lang:engine'`)
2. `src/langs.ts` — file extensions this tracer handles
3. `src/options.schema.json` — options this tracer accepts
4. `src/record/` — the actual instrumentation + execution engine
5. `src/verify-options/` — semantic option constraints (if any)

## Architecture

TODO: brief description of the tracer engine and how it instruments code.

### Where Your Tracer Plugs In

The ★ items are what you implement. Everything else is handled by the `@study-lenses/tracing` wrapper — config validation, freezing, steps conformity checks, and error handling.

```mermaid
flowchart TB
    consumer1["<b>CONSUMER PROGRAM</b><br/>(educational tool)<br/><br/>calls trace(tracer, code, config?)"]

    consumer1 -- "code + config" --> validation

    subgraph wrapper ["@study-lenses/tracing — API WRAPPER"]
        direction TB
        validation["<b>VALIDATE CONFIG</b> · sync<br/>expand shorthand, fill defaults,<br/>schema + semantic validation"]
        execution["<b>EXECUTE TRACER</b> · async<br/>call record() with code +<br/>fully resolved frozen config"]
        postprocessing["<b>VALIDATE + FREEZE STEPS</b> · sync<br/>check StepCore conformity,<br/>deep-freeze for consumer"]

        validation --> execution --> postprocessing
    end

    postprocessing -- "frozen steps" --> consumer2
    consumer2["<b>CONSUMER PROGRAM</b><br/>(receives frozen steps)"]

    subgraph tracermod ["YOUR TRACER MODULE  ★ = you implement this"]
        direction TB
        fields["<b>★ id</b> · unique identifier<br/><b>★ langs</b> · supported extensions<br/><b>★ optionsSchema</b> · JSON Schema (optional)<br/><b>★ verifyOptions</b> · semantic checks (optional)<br/><b>★ record</b> · instruments + executes code"]
    end

    tracermod -. "schema + verify" .-> validation
    tracermod -. "record()" .-> execution

    style wrapper fill:none,stroke:#333,stroke-width:3px
    style tracermod fill:#fff8e1,stroke:#f9a825,stroke-width:2px
    style consumer1 fill:#e3f2fd,stroke:#1565c0
    style consumer2 fill:#e3f2fd,stroke:#1565c0
```

See [DEV.md](./DEV.md) for full conventions and TDD workflow.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [DEV.md](./DEV.md).

## License

MIT © [YEAR] [NAME]
