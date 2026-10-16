| tool_name | short_description | available_at | additional_notes |
|---|---|---|---|
| queryData / query_data | Run a SQL query on a workspace and return the top N rows | Node, Docker-Local, Docker-Remote, Zoho-MCP (partial) | Node uses `queryData`; the Python variants use `query_data`. In Zoho-MCP the closest equivalent is `createExportJobSQLQuery`, an async SQL export job rather than a direct top-N result. It needs `getExportJobDetails` for polling and `downloadExportedData` to fetch the output. |
| exportView / export_view | Export a table, chart or dashboard in a given format | Node, Docker-Local, Zoho-MCP | Not in Docker-Remote because it needs file transfer. In Zoho-MCP it maps to `exportDataView` (synchronous export of a view's data) and the async bulk-export trio above. |
| importData / import_data | Import data into an existing table, from a JSON list or a file | Node, Docker-Local | Not in Docker-Remote because it needs file transfer. Docker-Local also accepts a local file path (csv/json). Zoho-MCP has no import tool; `addRow` says to use the Bulk Import API for bulk inserts, but that API isn't registered. |
| getWorkspacesList / get_workspaces_list | List workspaces in the user's org | Node, Docker-Local, Docker-Remote, Zoho-MCP | In Zoho-MCP this maps to `getAllWorkspaces` and `getOwnedWorkspaces`, which both require an `org-id` (from `getOrganizations`). |
| searchViews / search_views / getViews | List or search the views in a workspace, by name match or natural-language (RAG) query | Node, Docker-Local, Docker-Remote, Zoho-MCP | In Zoho-MCP this is the raw API `getViews`, which only lists views. The other distributions wrap it with custom logic (name matching, RAG) to give more agent-friendly results. |
| getViewDetails / get_view_details | Get details of a view (columns and types for tables, charts for dashboards, etc.) | Node, Docker-Local, Docker-Remote, Zoho-MCP | In Zoho-MCP this is `getViewDetails`, plus `getQueryTableDetails` for a query table's SQL and columns. |
| listAggregateFormulas | List aggregate formulas in a workspace or view | Node, Zoho-MCP, Plugins | Available in Node.js, Zoho-MCP, and Plugins. |
| checkConnection | Step-by-step health check of the MCP server (config, network, DNS, OAuth) | Node | Node-only. Not applicable to Zoho-MCP, where the platform hosts the server. |
| readReportMetadata | Read the full design metadata of a chart, pivot or summary report | Node, Zoho-MCP, Plugins | Available in Node.js, Zoho-MCP, and Plugins. |
| addAggregateFormula / create_aggregate_formula | Create an aggregate formula in a table | Node, Docker-Local, Docker-Remote, Zoho-MCP | Node and Zoho-MCP use `addAggregateFormula`; the Python variants use `create_aggregate_formula`. |
| createWorkspace / create_workspace | Create a new workspace | Node, Docker-Local, Docker-Remote, Zoho-MCP | Available everywhere. |
| createTable / create_table | Create a new table in a workspace | Node, Docker-Local, Docker-Remote, Zoho-MCP | Available everywhere. |
| createQueryTable / create_query_table | Create a derived table from a SQL query | Node, Docker-Local, Docker-Remote, Zoho-MCP | Available everywhere. |
| createChartReport / create_chart_report | Create a chart report on a table | Node, Docker-Local, Docker-Remote, Zoho-MCP | In Zoho-MCP the generic `createReport` covers chart, pivot and summary. Docker docs list bar, line, pie, scatter and bubble charts. |
| createSummaryReport / create_summary_report | Create a grouped-aggregate summary report | Node, Docker-Local, Docker-Remote, Zoho-MCP | In Zoho-MCP this is `createReport`. |
| createPivotReport / create_pivot_report | Create a pivot report (rows, columns, data fields) | Node, Docker-Local, Docker-Remote, Zoho-MCP | In Zoho-MCP this is `createReport`. |
| updateChart / updateSummary / updatePivot | Modify an existing report (type, axes or columns, filters, title) | Node, Zoho-MCP | Node has three separate tools. Zoho-MCP has one `updateReport` that covers all report types. Not in either Python distribution. |
| createLookup | Create a lookup relationship between columns of two tables (one-to-many, source to target) | Node | Node-only. |
| deleteLookup | Remove a lookup relationship from a column | Node | Node-only. |
| deleteView / delete_view | Delete a table, report or dashboard | Node, Docker-Local, Docker-Remote, Zoho-MCP | In Zoho-MCP the view is moved to trash. |
| addRow / add_row | Add a single row to a table | Node, Docker-Local, Docker-Remote, Zoho-MCP | Available everywhere. |
| updateRows / update_rows | Update rows matching criteria | Node, Docker-Local, Docker-Remote, Zoho-MCP | Zoho-MCP's API supports upsert via `addIfNotExist`. |
| deleteRows / delete_rows | Delete rows matching criteria | Node, Docker-Local, Docker-Remote, Zoho-MCP | In Zoho-MCP it can also clear all rows. |
| getOrganizations | List orgs the user can access (source of `org-id`) | Zoho-MCP | Zoho-MCP-only; the other servers handle org context internally. |
| getFolders | List folders in a workspace | Zoho-MCP | Zoho-MCP-only. |
| createFolder | Create a folder (two nesting levels max) | Zoho-MCP | Zoho-MCP-only. |
| renameFolder | Rename a folder and optionally update its description | Zoho-MCP | Zoho-MCP-only. |
| deleteFolder | Delete a folder, optionally with its views | Zoho-MCP | Zoho-MCP-only. |
| moveViewsToFolder | Move views into a folder | Zoho-MCP | Zoho-MCP-only. |
| editQueryTable | Update the SQL definition of an existing query table | Zoho-MCP | Zoho-MCP-only. |
| getQueryTableDetails | Get the SQL and column metadata of a query table | Zoho-MCP | Zoho-MCP-only. |
| editAggregateFormula | Edit an existing aggregate formula in a table | Zoho-MCP, Plugins | Available in Zoho-MCP and Plugins. Extends the Node.js MCP aggregate formula support with the ability to modify an existing formula. |
| editCustomFormulas | Edit existing custom formulas | Zoho-MCP, Plugins | Available in Zoho-MCP and Plugins. Allows editing custom formula definitions, extending the Node.js MCP formula toolset. |
| createDashboard | Create a new dashboard | Zoho-MCP, Plugins | Available in Zoho-MCP and Plugins. Dashboard creation is not available in the Node.js or Python MCP distributions. |
| readDashboardMetaData | Read the metadata of an existing dashboard | Zoho-MCP, Plugins | Available in Zoho-MCP and Plugins. Exposes full dashboard design metadata; complements the Node.js `readReportMetadata` which covers charts/pivots/summaries only. |
| editDashboard | Edit an existing dashboard | Zoho-MCP, Plugins | Available in Zoho-MCP and Plugins. Dashboard editing is not available in the Node.js or Python MCP distributions. |
