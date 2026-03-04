# @study-lenses/trace-\<lang\>-\<engine\>

[![npm version](https://img.shields.io/npm/v/TODO.svg)](https://www.npmjs.com/package/TODO)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> TODO: Language tracer for `@study-lenses/tracing`.

## Pedagogical Purpose

**Neutral infrastructure:** This package provides raw execution traces for
educational tool developers. It makes no pedagogical decisions — those belong in the
tools that consume it.

The trace data is deliberately granular: every expression evaluation, variable read,
function call, and control-flow step is captured. Educational tools decide which
subset to show and how to present it.

## Who Is This For

**Primary — Educational tool developers:** Building Study Lenses, custom analysis tools,
or other learning environments that need execution traces.

**Secondary — CS instructors:** Using this package directly to build course-specific
debugging aids or step-through visualizations.

## Install

```bash
npm install @study-lenses/trace-<lang>-<engine>
```

## Quick Start

```typescript
import trace from '@study-lenses/trace-<lang>-<engine>';

const steps = await trace('// TODO: your code here');
console.log(steps);
```

## API Summary

`@study-lenses/trace-<lang>-<engine>` pre-configures all four `@study-lenses/tracing` wrappers
with this tracer:

| Export | Description |
|--------|-------------|
| `trace(code, config?)` | Positional args, throws on error. Default export. |
| `tracify({ code, config? })` | Keyed args, returns Result (no throw). |
| `embody` | Chainable builder with tracer pre-set, throws on error. |
| `embodify({ code?, config? })` | Immutable chainable builder, returns Result. |

See [DOCS.md](./DOCS.md) for the full API reference and options.

## Design Principles

### What this package provides

- TODO: Describe your tracer's capabilities here
- The four standard `@study-lenses/tracing` wrappers, pre-bound to this tracer

### What this package does NOT do

- Make pedagogical decisions (what to show, how to explain)
- Persist or accumulate traces across calls
- TODO: List other out-of-scope concerns

## Architecture

```
TODO: code → your engine → steps
```

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

MIT © 2025 Evan Cole
