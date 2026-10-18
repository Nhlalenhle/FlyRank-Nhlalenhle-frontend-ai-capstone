# FE-03: AI-Assisted Workflow Comparison

## Objective
This drill implements an account-settings form for the StudyPilot academic-planning capstone. It compares a one-sentence prompt with a specification-led workflow on the same Vite, React, and TypeScript baseline.

## Round 1: Vague prompt
The prompt was: “Build an account settings form with validation and a save button.” The initial implementation is in `fe03-vague`. It includes a name, email, reminders checkbox, and a save message. Its validation checks `name.trim()` but checks email only with `email.includes("@")`. It also combines all validation feedback into one generic message, so the user cannot tell which field needs correction. The checkbox has an accessible name, but error states are not connected to fields.

## Round 2: Structured workflow
The implementation in `fe03-specified` adds a separate `validate` function, field-level errors, explicit `aria-invalid` and conditional `aria-describedby`, autocomplete hints, a live status region, and tests using Vitest and Testing Library. The email rule rejects missing values and uses a basic email-format pattern. The form does not announce success while errors remain. Correcting a field clears its displayed error.

## Specific comparison and AI mistake
In `src/App.tsx`, the vague version accepts values such as `a@` because the only email condition is `includes("@")`. The structured version rejects that value with a format check. This is a concrete correctness defect in the baseline, not a subjective style preference. The vague version also renders a generic message instead of linking field errors to controls; the structured version adds stable error IDs and `aria-describedby`. The structured version includes tests for valid submission, whitespace-only names, missing email, malformed email, and correcting a name after an error.

## Review effort and verification
The structured workflow requires more upfront specification and test-writing, but it produces explicit acceptance criteria and repeatable checks. Record actual elapsed time for prompting, implementation, review, debugging, and testing before submitting this drill; do not estimate these numbers after the fact. The GitHub connector was used to commit files remotely, but it does not execute npm commands or render a browser in this workflow. Therefore test and build results remain unverified here and must be confirmed with `npm install`, `npm test`, and `npm run build` in a Node.js environment.

## Conclusion
AI output is a draft, not evidence of correctness. File-aware requirements, accessible error behavior, focused tests, and explicit verification instructions make review more objective. For future capstone features, use the structured workflow and report only checks that were actually run.
