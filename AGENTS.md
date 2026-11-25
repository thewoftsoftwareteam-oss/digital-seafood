# Project Rules (`digital-seafood`)

## 1. Git & Deployment Policy (Strict)
- **Commit Only**: You may stage (`git add`) and commit (`git commit`) verified changes locally on `main`.
- **Never Push Without Approval**: NEVER run `git push`, `npm run deploy` (`gh-pages`), or modify any remote branch unless the user explicitly tells you to push/deploy in the current request. Always wait for the user's decision before pushing.

## 2. Multi-Agent Team Workflow & Pass Permissions
This repository uses a 3-agent team defined in `agents/` and tracked on `TASKS.md`:
- **`coordinator`** (`agents/coordinator.md`): Creates tasks in `TASKS.md`, assigns tasks to `developer`, dispatches finished work to `reviewer`, and finalizes `DONE`.
- **`developer`** (`agents/developer.md`): Implements tasks assigned by `coordinator`, runs `npm run build` + gradient checks, and passes completed work to `reviewer` and `coordinator`.
- **`reviewer`** (`agents/reviewer.md`): Audits implementation against `TASKS.md` & `AGENTS.md`, re-runs `npm run build`, and passes `[APPROVED]` to `coordinator` or `[CHANGES REQUESTED]` back to `developer`.
- **Inter-Agent Pass Permissions**: When starting a new session that invokes the team, define all three subagents (`coordinator`, `developer`, `reviewer`) via `define_subagent` using the prompts in `agents/*.md` with `EnableWriteTools: true` and `EnableSubagentTools: true` so every agent can pass tasks and feedback directly via `invoke_subagent` / `send_message`.

## 3. UI & Design Constraints
- **No Gradients**: Strictly use solid colors (`bg-[#ea580c]`, `bg-white`, `dark:bg-[#141416]`, etc.). Do not use `bg-gradient-*` anywhere.
- **Dark / Light Mode**: Support class-based `dark:` styling cleanly in all active customer components.
- **Mobile Appbar Stability**: Keep fixed dimensions on `Navbar.jsx` (`h-16 sm:h-[68px]`) so toggling Khmer/English or theme never shifts layout height.
- **Customer Scope**: Keep customer view focused on browsing, dish customization, dual USD/KHR price viewing, and waiter selection sheets; manager tools belong behind `?admin=1`.

## 4. Maintenance
- Read and update `DEVELOPMENT_LOG.md` and `TASKS.md` when adding features, changing dependencies, or altering state keys.
