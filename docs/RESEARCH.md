# Source review — test-data-gen

## Revision and method

Inspected public commit: [`ddaf01937494c41b8c8a1f950d003bf02f1d56b5`](https://github.com/NickCirv/test-data-gen/commit/ddaf01937494c41b8c8a1f950d003bf02f1d56b5). Source tree: `a555bc747530607646031d151cf5e0707b20a3d1`. Capture scope: all eligible text files; 6 of 6 eligible files.

This review read captured implementation and documentation. It did not install dependencies, execute project commands, call project APIs, check package publication or establish live CI status. Examples are source-derived, not captured execution transcripts.

## Claim ledger

| Claim | Evidence | Status |
| --- | --- | --- |
| Seeded generator, time defaults, formats and schema subset | [index.js](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/index.js) | Verified in inspected source; execution unverified |

## Findings and verification gaps

A seed controls the pseudorandom generator, but date defaults that depend on the current time can change output unless dates are fixed. Values are not statistically representative or guaranteed unique. SQL identifiers/templates require trusted input and review before execution. Generated payment-looking values are for fixtures only; no payment-provider acceptance or cryptographic suitability is established.

The captured smoke test only asks Node to syntax-check the entrypoint. It does not exercise behavior, integrations or failure paths. Neither that test nor installation was run in this review.

| Dimension | Result |
| --- | --- |
| Purpose and documented commands | Partially verified: static source inspection |
| Clean installation and examples | Unverified |
| Test suite and live CI | Unverified |
| Performance and security guarantees | Unverified |
| Publication | Local documentation only |

## Documentation inventory

- [README.md](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/README.md) — Rewritten; historic section anchors retained where practical.
- [LICENSE](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/LICENSE) — protected document preserved unchanged.

## Captured source inventory

- [LICENSE](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/LICENSE) — Git blob `05b804beeec7d1a6c933d087387ba4adf6463d93`.
- [README.md](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/README.md) — Git blob `25cd36f47204cad76ea34fb07c1b3a8f113d4d2e`.
- [package.json](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/package.json) — Git blob `59a2aed2b28dc54072e6c5c7ba4a266e225ecfc6`.
- [.github/workflows/ci.yml](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/.github/workflows/ci.yml) — Git blob `44515034a394670de44454a7a1bd2c7ef0c9836e`.
- [index.js](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/index.js) — Git blob `dcb2fded7ea7fb9a010b33ad41c7b3b2d63e7899`.
- [test/smoke.test.js](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/test/smoke.test.js) — Git blob `ebbccaaf2583b4850575f835313e4b0afd21bff7`.

## Scope boundary

Capture excludes lockfiles, binary artwork, generated output, vendored dependencies and files above the acquisition size limit. The tree records their existence; no verification claim is made for omitted content. Protected documents and historical records are not replaced.

## Reference coverage

Added [command reference](REFERENCE.md) from the argument parser, command handlers and source-defined help at the pinned revision. README examples remain unexecuted.
