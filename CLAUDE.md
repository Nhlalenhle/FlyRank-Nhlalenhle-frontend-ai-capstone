# Project conventions

Capstone for the FlyRank Frontend AI Engineering track. Use this file (and `.cursor/rules/`) as the source of truth for stack and workflow.

## Stack

- Runtime: Node.js LTS
- App: Vite + React + TypeScript
- Styling: Tailwind CSS
- Package manager: npm
- Editor: Cursor
- Version control: Git + GitHub, Conventional Commits 1.0.0

## Git

- Commit messages: `<type>(optional-scope): <description>`
- Allowed types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`
- Subject line: imperative, lowercase, no period
- Do not commit secrets, `.env` files, or `node_modules`

## Frontend

- Use functional React components and TypeScript.
- Keep components small; colocate styles with the UI they belong to.
- Prefer semantic HTML and accessible defaults (labels, keyboard, contrast).
- Do not use unexplained `any`; handle errors instead of swallowing them.

## Testable form rules

1. Required text fields must reject empty and whitespace-only values after trimming.
2. Every input with a validation error must set `aria-invalid` and reference its visible error with `aria-describedby`.
3. Form behavior changes must include tests for valid submission, invalid input, and recovery after correcting input; run the relevant test command and report its actual result.
4. Keep the success status empty until validation succeeds; expose submission feedback through a status/live region.
5. Reuse the project's existing framework and test tools. Do not add dependencies or change unrelated files without explaining why.

## AI-assisted work

- Ask the assistant to change one concern at a time.
- Review generated code before committing.
- Verify UI in the browser when layout or behavior changes.
- Never claim tests, lint, or build checks passed unless the commands were actually executed.
- Prefer project rules over repeating the same instructions in chat.
