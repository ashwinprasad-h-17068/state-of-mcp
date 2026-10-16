const tools = [
  {name:'queryData / query_data',desc:'Run a SQL query and return data.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'partial',plugins:'yes',additional_notes:'Node uses <code>queryData</code>; the Python variants use <code>query_data</code>. In Zoho MCP the closest equivalent is <code>createExportJobSQLQuery</code>, an async SQL export job rather than a direct top-N result. It needs <code>getExportJobDetails</code> for polling and <code>downloadExportedData</code> to fetch the output.'},
  {name:'exportView / export_view',desc:'Export a table, chart or dashboard.',node:'yes','python-local':'yes','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Not in Docker-Remote because it needs file transfer. In Zoho MCP it maps to <code>exportDataView</code> (synchronous export of a view\'s data) and the async bulk-export trio above.'},
  {name:'importData / import_data',desc:'Import data into an existing table.',node:'yes','python-local':'yes','python-remote':'no',zoho:'no',plugins:'yes',additional_notes:'Not in Docker-Remote because it needs file transfer. Docker-Local also accepts a local file path (csv/json). Zoho MCP has no import tool; <code>addRow</code> says to use the Bulk Import API for bulk inserts, but that API isn\'t registered.'},
  {name:'getWorkspacesList / get_workspaces_list',desc:'List workspaces in the organisation.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'In Zoho MCP this maps to <code>getAllWorkspaces</code> and <code>getOwnedWorkspaces</code>, which both require an <code>org-id</code> (from <code>getOrganizations</code>).'},
  {name:'searchViews / search_views / getViews',desc:'Find or list views in a workspace.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'partial',plugins:'yes',additional_notes:'In Zoho MCP this is the raw API <code>getViews</code>, which only lists views. The other distributions wrap it with custom logic (name matching, RAG) to give more agent-friendly results.'},
  {name:'getViewDetails / get_view_details',desc:'Get view columns, types and report details.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'In Zoho MCP this is <code>getViewDetails</code>, plus <code>getQueryTableDetails</code> for a query table\'s SQL and columns.'},
  {name:'listAggregateFormulas',desc:'List aggregate formulas.',node:'yes','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Available in Node.js, Zoho MCP, and Plugins.'},
  {name:'checkConnection',desc:'Step-by-step MCP server health check.',node:'yes','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes',additional_notes:'Node-only. Not applicable to Zoho MCP, where the platform hosts the server.'},
  {name:'readReportMetadata',desc:'Read full design metadata of a report.',node:'yes','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Available in Node.js, Zoho MCP, and Plugins.'},
  {name:'addAggregateFormula / create_aggregate_formula',desc:'Create an aggregate formula.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'Node and Zoho MCP use <code>addAggregateFormula</code>; the Python variants use <code>create_aggregate_formula</code>.'},
  {name:'createWorkspace / create_workspace',desc:'Create a workspace.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'Available everywhere.'},
  {name:'createTable / create_table',desc:'Create a new table.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'Available everywhere.'},
  {name:'createQueryTable / create_query_table',desc:'Create a derived table from SQL.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'Available everywhere.'},
  {name:'createChartReport / create_chart_report',desc:'Create a chart report.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'In Zoho MCP the generic <code>createReport</code> covers chart, pivot and summary. Docker docs list bar, line, pie, scatter and bubble charts.'},
  {name:'createSummaryReport / create_summary_report',desc:'Create a grouped-aggregate summary report.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'In Zoho MCP this is <code>createReport</code>.'},
  {name:'createPivotReport / create_pivot_report',desc:'Create a pivot report.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'In Zoho MCP this is <code>createReport</code>.'},
  {name:'updateChart / updateSummary / updatePivot',desc:'Modify an existing report.',node:'yes','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Node has three separate tools. Zoho MCP has one <code>updateReport</code> that covers all report types. Not in either Python distribution.'},
  {name:'createLookup',desc:'Create a lookup relationship between tables.',node:'yes','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes',additional_notes:'Node-only.'},
  {name:'deleteLookup',desc:'Remove a lookup relationship.',node:'yes','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes',additional_notes:'Node-only.'},
  {name:'deleteView / delete_view',desc:'Delete a table, report or dashboard.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'In Zoho MCP the view is moved to trash.'},
  {name:'addRow / add_row',desc:'Add a single row.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'Available everywhere.'},
  {name:'updateRows / update_rows',desc:'Update matching rows.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'Zoho MCP\'s API supports upsert via <code>addIfNotExist</code>.'},
  {name:'deleteRows / delete_rows',desc:'Delete matching rows.',node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes',additional_notes:'In Zoho MCP it can also clear all rows.'},
  {name:'getOrganizations',desc:'List organisations and provide org-id context.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Zoho MCP-only; the other servers handle org context internally.'},
  {name:'getFolders',desc:'List folders in a workspace.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Zoho MCP-only.'},
  {name:'createFolder',desc:'Create a folder (up to two nesting levels).',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Zoho MCP-only.'},
  {name:'renameFolder',desc:'Rename a folder and optionally update its description.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Zoho MCP-only.'},
  {name:'deleteFolder',desc:'Delete a folder, optionally with its views.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Zoho MCP-only.'},
  {name:'moveViewsToFolder',desc:'Move views into a folder.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Zoho MCP-only.'},
  {name:'editQueryTable',desc:'Update SQL definition of an existing query table.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Zoho MCP-only.'},
  {name:'getQueryTableDetails',desc:'Get SQL and column metadata of a query table.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Zoho MCP-only.'},
  {name:'editAggregateFormula',desc:'Edit an existing aggregate formula in a table.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Available in Zoho MCP and Plugins. Extends the Node.js aggregate formula support with the ability to modify an existing formula.'},
  {name:'editCustomFormulas',desc:'Edit existing custom formulas.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Available in Zoho MCP and Plugins. Allows editing custom formula definitions, extending the Node.js formula toolset.'},
  {name:'createDashboard',desc:'Create a new dashboard.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Available in Zoho MCP and Plugins. Dashboard creation is not available in the Node.js or Python MCP distributions.'},
  {name:'readDashboardMetaData',desc:'Read the metadata of an existing dashboard.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Available in Zoho MCP and Plugins. Complements the Node.js <code>readReportMetadata</code> which covers charts/pivots/summaries only.'},
  {name:'editDashboard',desc:'Edit an existing dashboard.',node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes',additional_notes:'Available in Zoho MCP and Plugins. Dashboard editing is not available in the Node.js or Python MCP distributions.'}
];

const labels = {node:'Node.js','python-local':'Python · Local','python-remote':'Python · Remote',zoho:'Zoho MCP',plugins:'Plugins'};
const root = document.getElementById('toolList');
const empty = document.getElementById('emptyState');
const distCountsEl = document.getElementById('distCounts');

/* ---- tool counts per distribution ---- */
function computeCounts() {
  const counts = {};
  Object.keys(labels).forEach(k => {
    counts[k] = tools.filter(t => t[k] === 'yes' || t[k] === 'partial').length;
  });
  return counts;
}

function renderDistCounts(activeFilter) {
  const counts = computeCounts();
  distCountsEl.innerHTML = Object.keys(labels).map(k => {
    const isActive = activeFilter === k;
    return `<span class="dist-count-chip${isActive ? ' dist-count-active' : ''}">
      <span class="dist-count-label">${labels[k]}</span>
      <span class="dist-count-num">${counts[k]} tool${counts[k] !== 1 ? 's' : ''}</span>
    </span>`;
  }).join('');
}

/* ---- chip ---- */
function chip(label, state) {
  return `<span class="coverage-chip ${state}">${label}: ${state === 'yes' ? 'Available' : state === 'partial' ? 'Partial' : '—'}</span>`;
}

/* ---- render tool list ---- */
function render(filter = 'all') {
  const visible = tools.filter(t => filter === 'all' || t[filter] === 'yes' || t[filter] === 'partial');
  root.innerHTML = visible.map(t => `
    <article class="tool-row">
      <div class="tool-info">
        <div class="tool-name">${t.name}</div>
        <div class="tool-desc">${t.desc}</div>
      </div>
      <div class="coverage">${Object.keys(labels).map(k => chip(labels[k], t[k])).join('')}</div>
      <div class="tool-notes">${t.additional_notes || ''}</div>
    </article>`).join('');
  empty.hidden = visible.length > 0;
  renderDistCounts(filter);
}

/* ---- filters ---- */
const filterButtons = [...document.querySelectorAll('.filter')];

function setFilter(key, updateHash) {
  if (key !== 'all' && !labels.hasOwnProperty(key)) return;
  filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === key));
  render(key);
  if (updateHash) history.replaceState(null, '', key === 'all' ? location.pathname : '#filter=' + key);
}

filterButtons.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter, true)));

function applyHash() {
  const m = location.hash.match(/^#filter=([\w-]+)$/);
  setFilter(m ? m[1] : 'all', false);
}
window.addEventListener('hashchange', applyHash);
applyHash();
