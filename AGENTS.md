<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Orquestração Codex + DeepSeek

Antes de qualquer tarefa, leia:

- `docs/AI_TEAM_ORCHESTRATION.md`
- `docs/AVAILABLE_SERVICES.md`
- `docs/ARCHITECTURE_DECISIONS.md`
- `docs/DEPLOYMENT_OPTIONS.md`
- `docs/SECURITY_AND_SECRETS.md`
- o arquivo usado como Sala de Comunicação entre Codex e DeepSeek: `docs/AI_COMMAND_ROOM.md`

Codex atua como líder, arquiteto, diretor criativo e auditor.
DeepSeek atua como executor sênior.

Toda tarefa deve ser delegada, executada, reportada e revisada pela Sala de Comunicação.

## Project Tooling Context

Before proposing infrastructure, database, deployment, authentication, observability, tests, security, analytics, payments, or design/front-end tooling, consult `docs/AVAILABLE_SERVICES.md`.

This project has access to selected GitHub Student Developer Pack services. Prefer those options before suggesting paid, generic, or unknown external tools, but verify current availability, limits, pricing after any free period, and user approval before activating real services.

## Project Quality Contract

This is an authored WPM.OS portfolio, not a generic template. Preserve the operating-system/console identity unless a change is justified by accessibility, performance, security, maintainability, or clear UX evidence.

Before editing, state the problem, likely cause, affected files, correction plan, risk, and validation command. Keep changes small and reviewable: one category at a time, no broad rewrites, no visual direction changes without justification, and no new dependency without explaining weight, purpose, alternatives, and risk.

After editing, report files changed, what changed, why it changed, commands run, command results, and manual checks still pending.

Quality criteria:
- Clean TypeScript with small focused components.
- Consistent design tokens, spacing, typography, focus states, and motion rules.
- WCAG 2.2 AA as the accessibility reference.
- Mobile performance before decorative effects.
- No exposed secrets, unsafe HTML, or unreviewed external scripts.
- External links need `rel="noopener noreferrer"` when using `_blank`.
- Motion, WebGL, video, and sound must have fallback/control and respect reduced motion.

Critical areas:
- Deployment target and URL/base path alignment.
- Security headers, CSP, dependency vulnerabilities, and environment variables.
- Keyboard navigation, focus trapping, heading structure, and contrast.
- Media size, bundle size, lazy loading, and WebGL/mobile fallback.
- Documentation must stay aligned with the actual repo state.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- ALWAYS read graphify-out/GRAPH_REPORT.md before reading any source files, running grep/glob searches, or answering codebase questions. The graph is your primary map of the codebase.
- IF graphify-out/wiki/index.md EXISTS, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
