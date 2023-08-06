# Action Regex Match

This actions serves as successor of [actions-ecosystem/action-regex-match](https://github.com/actions-ecosystem/action-regex-match).

## Inputs

|  NAME   |                      DESCRIPTION                      |   TYPE   | REQUIRED | DEFAULT |
| ------- | ----------------------------------------------------- | -------- | -------- | ------- |
| `text`  | A text as the target for `inputs.regex`.              | `string` | `true`   | `N/A`   |
| `regex` | A regex for `inputs.text`. Supports capturing groups. | `string` | `true`   | `N/A`   |
| `flags` | Flags for inputs.regex. e.g.) `'g'`, `'gm'`           | `string` | `false`  | `''`    |

## Outputs

|   NAME   |                                          DESCRIPTION                                           |   TYPE   |
| -------- | ---------------------------------------------------------------------------------------------- | -------- |
| `match`  | The whole matched text. If the `inputs.regex` doesn't match `inputs.text`, this value is `''`. | `string` |
| `group1` | The 1st captured group.                                                                        | `string` |
| `group2` | The 2nd captured group.                                                                        | `string` |
| `group3` | The 3rd captured group.                                                                        | `string` |
| `group4` | The 4th captured group.                                                                        | `string` |
| `group5` | The 5th captured group.                                                                        | `string` |
| `group6` | The 6th captured group.                                                                        | `string` |
| `group7` | The 7th captured group.                                                                        | `string` |
| `group8` | The 8th captured group.                                                                        | `string` |
| `group9` | The 9th captured group.                                                                        | `string` |

## Example

```yaml
name: Add Label with Comment

on: [issue_comment]

jobs:
  create_comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: kaisugi/action-regex-match@v1.0.0
        id: regex-match
        with:
          text: ${{ github.event.comment.body }}
          regex: '^/label\s*(.*?)\s*$'

      - uses: actions-ecosystem/action-add-labels@v1
        if: ${{ steps.regex-match.outputs.match != '' }}
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          labels: ${{ steps.regex-match.outputs.group1 }}
```

```yaml
name: Create Comment with Regex Match

on: [issue_comment]

jobs:
  create_comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: kaisugi/action-regex-match@v1.0.0
        id: regex-match
        with:
          text: ${{ github.event.comment.body }}
          regex: '```typescript([\s\S]*)```'
          flags: gm

      - uses: actions-ecosystem/action-create-comment@v1
        if: ${{ steps.regex-match.outputs.match != '' }}
        with:
          github_token: ${{ secrets.github_token }}
          body: |
            Hello, @${{ github.actor }}!

            The raw TypeScript code is here.

            ---

            ${{ steps.regex-match.outputs.group1 }}

            ---
```

## License

Apache-2.0