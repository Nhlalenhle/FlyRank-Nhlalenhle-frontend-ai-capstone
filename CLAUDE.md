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

- Functional React components and TypeScript
- Keep components small; colocate styles with the UI they belong to
- Prefer semantic HTML and accessible defaults (labels, keyboard, contrast)
- No unexplained `any`; handle errors instead of swallowing them

## AI-assisted work

- Ask the assistant to change one concern at a time
- Review generated code before committing
- Verify UI in the browser when layout or behavior changes
- Prefer project rules over repeating the same instructions in chat
