# Command reference

Use `node index.js` from the pinned source checkout described in the [README](../README.md). The entries below describe the inspected implementation.

| Command or argument | Behavior |
| --- | --- |
| `user / address / uuid / date / credit-card` | Generate records of the selected built-in type. |
| `custom TEMPLATE` | Generate values from placeholders such as {{name}} and {{email}}. |
| `from-schema FILE` | Generate data from the supported subset of a JSON Schema file. |
| `-n, --count N` | Set records per generated batch; defaults to one. |
| `-f, --format FORMAT` | Select json, csv or sql output. |
| `-t, --table NAME` | Set the SQL insert table name; defaults to records. |
| `-s, --seed VALUE` | Seed the generator for repeatable output. |
| `--from DATE --to DATE` | Set the date-generation range. |
| `--stream` | Emit repeated batches every 500 ms until interrupted. |

For prerequisites, file writes, external services and known limitations, see [Behavior and limits](../README.md#behavior-and-limits).

Implementation: [index.js](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/index.js); [review evidence](RESEARCH.md).
