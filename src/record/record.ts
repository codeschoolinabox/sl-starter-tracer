/**
 * @file RecordFunction — instrument + execute code, return steps.
 *
 * TODO: Replace this stub. Implement record() for your tracer engine.
 * Called by @study-lenses/tracing after config validation and option merging.
 *
 * Contract:
 *   - Receives frozen `config.meta` (execution limits) and `config.options` (tracer options)
 *   - Returns a Promise of readonly steps (1-indexed, conforming to StepCore)
 *   - Throws ParseError | RuntimeError | LimitExceededError on failure
 *
 * See @study-lenses/tracing for full RecordFunction contract and error types.
 */

import type { MetaConfig } from '@study-lenses/tracing';

// TODO: Remove eslint-disable once this is a real async implementation
// eslint-disable-next-line @typescript-eslint/require-await
async function record(
  code: string,
  config: { readonly meta: MetaConfig; readonly options: unknown },
): Promise<readonly unknown[]> {
  // TODO: Call your tracer engine here, adapt output to StepCore shape.
  return [];
}

export default record;
