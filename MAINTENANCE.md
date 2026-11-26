# MythColoring maintenance and release rules

1. Before development, check `git status`, the active branch, and fetch the current remote branch.
2. Do not conclude that branches have no common ancestor from an incomplete or shallow history; deepen or unshallow first when possible.
3. All Codex chats must use the same primary MythColoring repository rather than initializing project copies.
4. Do not reinitialize Git history for this project.
5. Do not force-push unless a separately reviewed recovery plan explicitly authorizes it.
6. Do not use the GitHub API to create an independent commit chain as a default publishing path.
7. Do not bypass GitHub with a manual Cloudflare production deployment by default.
8. After every production release, verify that local Git, GitHub `main`, and the Cloudflare production deployment reference the intended version.
9. Keep unfinished assets, private files, and unrelated scripts out of commits.
10. Check production D1 migration state before release; never rerun an already-applied production migration.
