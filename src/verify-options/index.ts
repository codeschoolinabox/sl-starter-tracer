/**
 * @file Semantic validation for tracer options.
 *
 * TODO: Add cross-field constraints that JSON Schema cannot express.
 * Called by @study-lenses/tracing after schema validation and default-filling.
 *
 * Example use: mutually exclusive array options, conditional required fields.
 * If your options have no such constraints, leave this as a no-op.
 *
 * Throw OptionsSemanticInvalidError (from @study-lenses/tracing) on violation.
 */

function verifyOptions(options: unknown): void {
  // no-op stub — add constraints here or leave empty
}

export default verifyOptions;
