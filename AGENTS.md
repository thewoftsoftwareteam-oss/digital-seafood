# Project Rules (`digital-seafood`)

## 1. Git & Deployment Policy (Strict)
- **Commit Only**: You may stage (`git add`) and commit (`git commit`) verified changes locally on `main`.
- **Never Push Without Approval**: NEVER run `git push`, `npm run deploy` (`gh-pages`), or modify any remote branch unless the user explicitly tells you to push/deploy in the current request. Always wait for the user's decision before pushing.

## 2. UI & Design Constraints
- **No Gradients**: Strictly use solid colors (`bg-[#ea580c]`, `bg-white`, `dark:bg-[#141416]`, etc.). Do not use `bg-gradient-*` anywhere.
- **Dark / Light Mode**: Support class-based `dark:` styling cleanly in all active customer components.
- **Mobile Appbar Stability**: Keep fixed dimensions on `Navbar.jsx` (`h-16 sm:h-[68px]`) so toggling Khmer/English or theme never shifts layout height.
- **Customer Scope**: Keep customer view focused on browsing, dish customization, dual USD/KHR price viewing, and waiter selection sheets; manager tools belong behind `?admin=1`.

## 3. Maintenance
- Read and update `DEVELOPMENT_LOG.md` when adding features, changing dependencies, or altering state keys.
