# @study-lenses/trace-\<lang\>-\<engine\> — Architecture & Decisions

## Why this tracer exists

TODO: Describe what language/engine this tracer targets and why it exists as a separate package.

Example: "Instruments Python source code using the X engine, returning a step-by-step
execution trace. Exists as a separate package so other `@study-lenses` tracers can
follow the same `TracerModule` contract without coupling."

## Architecture

```text
code (string)
  → record/index.ts   ← entry point (env detection if needed)
  → record/record.ts  ← your engine: instrument + execute
  → StepCore[]        ← returned via @study-lenses/tracing wrappers
```

`src/index.ts` is wire-up only — no logic. All tracer logic lives in `record/`.

### Pipeline

```mermaid
flowchart TB
    consumer1["<b>CONSUMER PROGRAM</b><br/>(educational tool)<br/><br/>calls trace(tracer, code, config?)"]

    consumer1 -- "source code + partial config" --> prepareMeta

    subgraph wrapper ["@study-lenses/tracing — API WRAPPER"]
        direction TB

        subgraph validation ["VALIDATION (sync)"]
            direction TB
            prepareMeta["<b>Prepare meta config</b><br/>expand shorthand, fill defaults,<br/>validate against wrapper schema"]
            prepareOpts["<b>Prepare tracer options</b><br/>expand shorthand, fill defaults,<br/>validate against tracer schema<br/>(skipped if no optionsSchema)"]
            freezeConfig["<b>Freeze config</b><br/>deep-freeze resolved<br/>meta + options"]
            verifyOpts["<b>Verify options semantics</b><br/>cross-field constraints<br/>(skipped if no verifyOptions)"]

            prepareMeta --> prepareOpts --> freezeConfig --> verifyOpts
        end

        subgraph execution ["EXECUTION (async)"]
            direction TB
            executeTracer["<b>Execute tracer</b><br/>call record() with code +<br/>fully resolved frozen config"]
        end

        subgraph postprocessing ["POST-PROCESSING (sync)"]
            direction TB
            validateSteps["<b>Validate steps</b><br/>array of POJOs, 1-indexed step,<br/>valid source locations"]
            freezeOutput["<b>Freeze output</b><br/>deep-freeze steps for<br/>immutable consumer access"]

            validateSteps --> freezeOutput
        end

        verifyOpts -- "code + frozen config" --> executeTracer
        executeTracer -- "raw steps" --> validateSteps
    end

    freezeOutput -- "frozen steps" --> consumer2
    consumer2["<b>CONSUMER PROGRAM</b><br/>(receives frozen steps)"]

    subgraph tracermod ["YOUR TRACER MODULE  ★ = you implement this"]
        direction TB
        tid["<b>★ id</b>  (required)<br/>unique identifier; used for<br/>cache invalidation"]
        tlangs["<b>★ langs</b>  (required)<br/>supported file extensions"]
        tschema["<b>★ optionsSchema</b>  (optional)<br/>JSON Schema for tracer options"]
        tverify["<b>★ verifyOptions</b>  (optional)<br/>cross-field semantic checks"]
        trecord["<b>★ record</b>  (required)<br/>instruments + executes code,<br/>returns execution steps"]

        tid ~~~ tlangs
        tlangs ~~~ tschema
        tschema ~~~ tverify
        tverify ~~~ trecord
    end

    tschema -. "uses schema" .-> prepareOpts
    tverify -. "calls verify" .-> verifyOpts
    trecord -. "calls record" .-> executeTracer

    style wrapper fill:none,stroke:#333,stroke-width:3px
    style validation fill:none,stroke:#666,stroke-dasharray:5 5
    style execution fill:none,stroke:#666,stroke-dasharray:5 5
    style postprocessing fill:none,stroke:#666,stroke-dasharray:5 5
    style tracermod fill:#fff8e1,stroke:#f9a825,stroke-width:2px
    style consumer1 fill:#e3f2fd,stroke:#1565c0
    style consumer2 fill:#e3f2fd,stroke:#1565c0
```

## Key decisions

### Engine choice

TODO: Why did you choose this engine/approach? What alternatives did you consider?

### Error mapping

TODO: How does your engine signal errors? How do you map them to `ParseError`,
`RuntimeError`, and `LimitExceededError`?

### Step format

TODO: What step shape does your engine produce? How do you adapt it to `StepCore`?
Are steps 0-indexed or 1-indexed internally?

### Options design

TODO: What options does this tracer expose? Why JSON Schema + `verifyOptions`
instead of just one or the other?

## What this package deliberately does NOT do

TODO: List concerns explicitly out of scope.
