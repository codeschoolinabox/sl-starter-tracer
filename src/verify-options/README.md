# verify-options

Semantic validation called by the API layer after JSON Schema validation and default-filling.

Enforces constraints JSON Schema cannot express — cross-field rules such as
mutually exclusive options, conditional required fields, and range constraints.

If your options have no such constraints, leave `index.ts` as a no-op.

## Files

- `index.ts` — `verifyOptions(options)` — throws `OptionsSemanticInvalidError` on violations
- `types.ts` — local constraint types (avoids cross-boundary import from `record/`)
- `tests/` — unit tests for semantic validation
