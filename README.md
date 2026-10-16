# Zoho Analytics MCP — Internal Briefing

A static HTML/CSS/JS site designed for GitHub Pages.

## Pages
- `index.html` — overview with an interactive delivery-model graph (hover or tap a node for that distribution's current-state details)
- `architecture.html` — remote/local distribution model
- `tools.html` — interactive tool availability explorer
- `graph.js` — powers the interactive delivery-model graph on the overview page

## Deploy to GitHub Pages
1. Create a GitHub repository.
2. Copy all files in this folder into the repository root.
3. Push to the default branch.
4. In GitHub: Settings → Pages → deploy from the branch containing these files.

No build step or external dependency is required.

## Source basis
The content is based on the supplied internal notes:
- `state_of_mcp.md`
- `state_of_plugins.md`
- `consolidated_tools_list.md`

Where the source notes do not give exact counts, the site intentionally avoids inventing counts.
