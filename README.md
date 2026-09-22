![test-data-gen — Nicholas Ashkar editorial artwork](assets/nicholas-ashkar/banner.png)

# test-data-gen

Generate synthetic fixture data for local development and test inputs.

Provides user, address, date, UUID, text and other generators, plus custom templates and a subset of JSON Schema generation. Outputs JSON, CSV or SQL text.


<a id="install"></a>

## Quickstart

Package runtime requirement: Node.js `>=20`. Git is needed to obtain this pinned source checkout.

```bash
git clone https://github.com/NickCirv/test-data-gen.git
cd test-data-gen
git checkout ddaf01937494c41b8c8a1f950d003bf02f1d56b5
node index.js user --count 2 --seed 42 --from 2020-01-01 --to 2020-12-31
```

This source-derived example has not been executed in this review. The example requests two synthetic user records with bounded dates. It is not real customer data or a captured output sample.







<a id="commands"></a>

<a id="options"></a>

<a id="output-formats"></a>

<a id="deterministic-output"></a>

<a id="custom-templates"></a>

<a id="json-schema-generation"></a>

## Usage

```bash
node index.js uuid --count 3 --seed 42
node index.js user --count 5 --format csv
node index.js custom '{{name}} <{{email}}>'
node index.js from-schema schema.json --count 3
```

`--stream` emits continuously until stopped. `--table` selects the SQL table name; output is text and is not applied to a database.

[Command reference](docs/REFERENCE.md) covers arguments, modes and output controls.



<a id="security-notes"></a>

<a id="what-it-is-not"></a>

## Behavior and limits

A seed controls the pseudorandom generator, but date defaults that depend on the current time can change output unless dates are fixed. Values are not statistically representative or guaranteed unique. SQL identifiers/templates require trusted input and review before execution. Generated payment-looking values are for fixtures only; no payment-provider acceptance or cryptographic suitability is established.

## Development

Declared package scripts:

| Script | Command |
| --- | --- |
| `test` | `node --test` |

The smoke test syntax-checks the entrypoint; it does not exercise CLI behavior or integrations.

## Research

[Source review and claim ledger](docs/RESEARCH.md) records revision `ddaf01937494`, inspected files and verification gaps.

## License and attribution

Protected license and attribution files remain unchanged: [LICENSE](https://github.com/NickCirv/test-data-gen/blob/ddaf01937494c41b8c8a1f950d003bf02f1d56b5/LICENSE).

[Artwork credits](assets/nicholas-ashkar/CREDITS.md) · [Nicholas Ashkar — consulting](https://nicholashkar.com/#oxblood-contact)
