/* Interactive mental-model graph for the Zoho Analytics MCP ecosystem.
   Builds the delivery-option tree, draws SVG connectors between the nodes,
   and shows each distribution's current-state details in a tooltip on
   hover, keyboard focus or tap. No external dependencies. */

/* Tool counts per distribution key (kept in sync with app.js data) */
const TOOL_COUNTS = (function() {
  const tools = [
    {node:'yes','python-local':'yes','python-remote':'partial',zoho:'partial',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'partial',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'yes','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'yes','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'yes','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'yes','python-local':'yes','python-remote':'yes',zoho:'yes',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'yes',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'},
    {node:'no','python-local':'no','python-remote':'no',zoho:'no',plugins:'yes'}
  ];
  const keys = ['node','python-local','python-remote','zoho','plugins'];
  const counts = {};
  keys.forEach(k => { counts[k] = tools.filter(t => t[k] === 'yes' || t[k] === 'partial').length; });
  return counts;
})();

const GRAPH_NODES = {
  root: {
    card: {title: 'Zoho Analytics', sub: 'MCP ecosystem'},
    kicker: 'THE ECOSYSTEM',
    title: 'Zoho Analytics MCP',
    subtitle: 'One product surface, several distributions',
    rows: [
      ['The model', 'Separate where the server runs — remote or local — from how it is packaged and maintained.'],
      ['Why it matters', 'The choice changes installation, authentication, maintenance and, most importantly, the tools available.']
    ],
    link: {href: '#landscape', label: 'See the landscape →'}
  },
  remote: {
    card: {title: 'Remote'},
    kicker: 'DELIVERY MODEL',
    title: 'Remote',
    subtitle: 'Zoho-hosted or customer-hosted',
    rows: [
      ['Hosting', 'Managed by Zoho, or self-hosted by the org-admin on customer infrastructure.'],
      ['Why customers pick it', 'Lower setup friction. Installation is easier and authentication can happen through the browser session, without manually creating credentials such as client IDs and refresh tokens.']
    ]
  },
  local: {
    card: {title: 'Local'},
    kicker: 'DELIVERY MODEL',
    title: 'Local',
    subtitle: 'Runs on the customer machine',
    rows: [
      ['Hosting', 'Runs locally inside the customer environment.'],
      ['Why customers pick it', 'More control. Maintained by the Zoho Analytics team with custom logic over regular APIs, supporting different development environments and preferences.']
    ]
  },
  'zoho-mcp': {
    card: {title: 'Zoho MCP', sub: 'Managed remote'},
    kicker: 'REMOTE · MANAGED',
    title: 'Zoho MCP',
    subtitle: 'Managed remote, hosted through catalyst',
    rows: [
      ['Hosting', 'Zoho-hosted through catalyst. Customers connect through a provided link and authenticate through the browser session.'],
      ['What stands out', 'Authentication is easier through the browser session. It acts as a MCP Registry rather than a simple MCP Server'],
      ['Direction', 'Positioned to expose all Zoho Analytics functionality as tools, with a registry model that lets customers choose tool combinations.']
    ],
    pill: {label: 'Expanding', tone: 'progress'},
    link: {href: 'tools.html#filter=zoho', label: 'Tool coverage →'},
    toolCountKey: 'zoho'
  },
  'self-hosted': {
    card: {title: 'Self-Hosted Remote', sub: 'Docker · Python'},
    kicker: 'REMOTE · SELF-HOSTED',
    title: 'Self-Hosted Remote',
    subtitle: 'Docker / Python based',
    rows: [
      ['Hosting', 'The Organization admin (customer) hosts the Docker image on their own infrastructure and shares a link internally.'],
      ['What stands out', 'As a Remote MCP Server, provides easier authentication for the end users while differentiating itself from Zoho MCP by providing custom logic in MCP tools over regular APIs'],
      ['Limitations', 'Except file-transfer tools such as import/export are unavailable due to technical constraints.']
    ],
    pill: {label: 'File-transfer gap', tone: 'limited'},
    link: {href: 'tools.html#filter=python-remote', label: 'Tool coverage →'},
    toolCountKey: 'python-remote'
  },
  'python-local': {
    card: {title: 'Docker / Python', sub: 'Local runtime'},
    kicker: 'LOCAL',
    title: 'Docker / Python',
    subtitle: 'Local runtime',
    rows: [
      ['Hosting', 'Runs locally from the Docker-based Python server.'],
      ['What stands out', 'Custom tool logic is designed to be more agent-friendly, but some tools still lag behind Node.js.']
    ],
    pill: {label: 'Catching up', tone: 'progress'},
    link: {href: 'tools.html#filter=python-local', label: 'Tool coverage →'},
    toolCountKey: 'python-local'
  },
  'node-local': {
    card: {title: 'Node.js', sub: 'Local runtime'},
    kicker: 'LOCAL',
    title: 'Node.js',
    subtitle: 'Local runtime',
    rows: [
      ['Hosting', 'Local MCP distribution maintained by the Zoho Analytics team.'],
      ['What stands out', 'Most actively used regular MCP distribution, with more tools available.'],
      ['Also the base for', 'The Claude Marketplace MCPB package and the Plugins distribution are built over this Node.js set.']
    ],
    pill: {label: 'Broadest regular MCP', tone: 'good'},
    link: {href: 'tools.html#filter=node', label: 'Tool coverage →'},
    children: ['claude-marketplace', 'plugins'],
    toolCountKey: 'node'
  },
  'claude-marketplace': {
    card: {title: 'Claude Marketplace', sub: 'MCPB format'},
    kicker: 'BUILT OVER NODE.JS · MARKETPLACE',
    title: 'Claude Marketplace',
    subtitle: 'MCPB package format',
    rows: [
      ['Hosting', 'Listed on the Claude Marketplace.'],
      ['Built over', 'Claude requires the MCPB package format; the Analytics MCPB is built over the Node.js local version.']
    ],
    pill: {label: 'Marketplace listing', tone: 'neutral'},
    link: {href: 'tools.html#filter=node', label: 'Tool coverage →'},
    toolCountKey: 'node'
  },
  plugins: {
    card: {title: 'Plugins', sub: 'Plugin platform'},
    kicker: 'BUILT OVER NODE.JS · PLUGIN PLATFORM',
    title: 'Plugins',
    subtitle: 'Tagged Node.js package + Agent skill',
    rows: [
      ['Hosting', 'Distributed through the plugin platform.'],
      ['Built over', 'A tagged Node.js-based MCP package plus an Agent skill.'],
      ['What stands out', 'Goes beyond the Node.js tool set with folders, modeling and dashboard edits. Prompt bloating is not a concern in this setup.']
    ],
    pill: {label: 'Broadest surface', tone: 'strong'},
    link: {href: 'tools.html#filter=plugins', label: 'Tool coverage →'},
    badge: '+ extended tools',
    extends: true,
    dashedLink: true,
    toolCountKey: 'plugins'
  }
};

const GRAPH_TREE = [
  {id: 'remote', accent: 'blue', children: ['zoho-mcp', 'self-hosted']},
  {id: 'local', accent: 'green', children: ['python-local', 'node-local']}
];

(function () {
  const wrap = document.getElementById('modelGraph');
  if (!wrap) return;

  const SVGNS = 'http://www.w3.org/2000/svg';
  const links = document.createElementNS(SVGNS, 'svg');
  links.setAttribute('class', 'graph-links');
  links.setAttribute('aria-hidden', 'true');
  wrap.appendChild(links);

  const nodeEls = {};

  function makeNode(id, cls, inner) {
    const node = document.createElement('div');
    node.className = cls;
    node.dataset.tip = id;
    node.tabIndex = 0;
    node.setAttribute('aria-describedby', 'graphTooltip');
    node.innerHTML = inner;
    nodeEls[id] = node;
    return node;
  }
  function toolCountBadge(data) {
    if (!data.toolCountKey) return '';
    const c = TOOL_COUNTS[data.toolCountKey];
    return c !== undefined ? `<em class="node-tool-count">${c} tools</em>` : '';
  }
  function leafInner(data) {
    return `<b>${data.card.title}</b><small>${data.card.sub}</small>` +
      toolCountBadge(data) +
      (data.badge ? `<em class="node-badge">${data.badge}</em>` : '');
  }

  /* ---- build the tree ---- */
  const rootNode = makeNode('root', 'graph-node graph-root',
    `<span>${GRAPH_NODES.root.card.title}</span><small>${GRAPH_NODES.root.card.sub}</small>`);
  wrap.appendChild(rootNode);

  const branches = document.createElement('div');
  branches.className = 'graph-branches';
  GRAPH_TREE.forEach(branch => {
    const data = GRAPH_NODES[branch.id];
    const col = document.createElement('div');
    col.className = 'graph-branch accent-' + branch.accent;
    col.appendChild(makeNode(branch.id, 'graph-node branch-head', `<b>${data.card.title}</b>`));

    const leaves = document.createElement('div');
    leaves.className = 'branch-leaves';
    branch.children.forEach(id => {
      const child = GRAPH_NODES[id];
      leaves.appendChild(makeNode(id, 'graph-node graph-leaf' + (child.extends ? ' node-extends' : ''), leafInner(child)));
    });
    col.appendChild(leaves);

    /* nested packaging nodes hanging off a leaf (e.g. Node.js) */
    branch.children.forEach(id => {
      const child = GRAPH_NODES[id];
      if (!child.children) return;
      const sub = document.createElement('div');
      sub.className = 'branch-leaves sub-leaves';
      child.children.forEach(sid => {
        const sd = GRAPH_NODES[sid];
        sub.appendChild(makeNode(sid, 'graph-node graph-leaf' + (sd.extends ? ' node-extends' : ''), leafInner(sd)));
      });
      col.appendChild(sub);
    });

    branches.appendChild(col);
  });
  wrap.appendChild(branches);

  const tip = document.createElement('div');
  tip.className = 'graph-tooltip';
  tip.id = 'graphTooltip';
  tip.setAttribute('role', 'tooltip');
  tip.hidden = true;
  wrap.appendChild(tip);

  /* ---- SVG connectors between parent and child nodes ---- */
  function anchor(node, edge) {
    const w = wrap.getBoundingClientRect();
    const r = node.getBoundingClientRect();
    return {x: r.left - w.left + r.width / 2, y: (edge === 'top' ? r.top : r.bottom) - w.top};
  }
  function linkPath(parent, child) {
    const a = anchor(parent, 'bottom'), b = anchor(child, 'top');
    const dy = Math.max(18, (b.y - a.y) * 0.6);
    return `M ${a.x} ${a.y} C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`;
  }
  function addPath(d, cls) {
    const p = document.createElementNS(SVGNS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('class', cls);
    links.appendChild(p);
  }
  function drawLinks() {
    while (links.firstChild) links.removeChild(links.firstChild);
    GRAPH_TREE.forEach(branch => {
      const head = nodeEls[branch.id];
      addPath(linkPath(rootNode, head), 'graph-link link-root');
      branch.children.forEach(id => {
        addPath(linkPath(head, nodeEls[id]), 'graph-link link-branch');
        const child = GRAPH_NODES[id];
        (child.children || []).forEach(sid => {
          const cls = 'graph-link link-sub' + (GRAPH_NODES[sid].dashedLink ? ' link-dashed' : '');
          addPath(linkPath(nodeEls[id], nodeEls[sid]), cls);
        });
      });
    });
  }

  /* ---- tooltip ---- */
  let current = null;
  let hideTimer = null;

  function cancelHide() { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } }
  function hideTip() {
    cancelHide();
    tip.hidden = true;
    current = null;
  }
  function scheduleHide() {
    cancelHide();
    hideTimer = setTimeout(hideTip, 260);
  }

  function showTip(node) {
    const data = GRAPH_NODES[node.dataset.tip];
    if (!data) return;
    cancelHide();
    if (node === current && !tip.hidden) return;
    current = node;
    const toolCount = data.toolCountKey !== undefined ? TOOL_COUNTS[data.toolCountKey] : undefined;
    const countBadge = toolCount !== undefined
      ? `<span class="tip-tool-count">${toolCount} tool${toolCount !== 1 ? 's' : ''}</span>`
      : '';
    const meta = (data.pill || data.link || countBadge)
      ? `<div class="tip-meta">${data.pill ? `<span class="pill ${data.pill.tone}">${data.pill.label}</span>` : '<span></span>'}${countBadge}${data.link ? `<a href="${data.link.href}">${data.link.label}</a>` : ''}</div>`
      : '';
    tip.innerHTML =
      `<div class="tip-kicker">${data.kicker}</div>` +
      `<div class="tip-title">${data.title}</div>` +
      `<div class="tip-sub">${data.subtitle}</div>` +
      `<dl class="tip-rows">${data.rows.map(row => `<div><dt>${row[0]}</dt><dd>${row[1]}</dd></div>`).join('')}</dl>` +
      meta;
    tip.hidden = false;
    positionTip(node);
  }
  function positionTip(node) {
    tip.style.visibility = 'hidden';
    tip.hidden = false;
    const w = wrap.getBoundingClientRect();
    const r = node.getBoundingClientRect();
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    const cx = r.left - w.left + r.width / 2;
    const left = Math.min(Math.max(8, cx - tw / 2), Math.max(8, w.width - tw - 8));
    let top = r.top - w.top - th - 14, below = false;
    if (top < 6) { top = r.bottom - w.top + 14; below = true; }
    tip.style.left = Math.round(left) + 'px';
    tip.style.top = Math.round(top) + 'px';
    tip.classList.toggle('below', below);
    tip.style.setProperty('--caret-x', Math.round(Math.max(16, Math.min(cx - left, tw - 16))) + 'px');
    tip.style.visibility = '';
  }

  /* hover — small hide delay so the tooltip link stays clickable */
  wrap.addEventListener('mouseover', e => {
    const node = e.target.closest('.graph-node');
    if (node) { showTip(node); return; }
    if (e.target.closest('.graph-tooltip')) cancelHide();
  });
  wrap.addEventListener('mouseout', e => {
    const to = e.relatedTarget;
    if (to && to.closest && (to.closest('.graph-node') || to.closest('.graph-tooltip'))) return;
    if (e.target.closest('.graph-node') || e.target.closest('.graph-tooltip')) scheduleHide();
  });
  wrap.addEventListener('mouseleave', hideTip);

  /* tap / click — toggles the tooltip on touch devices */
  wrap.addEventListener('click', e => {
    const node = e.target.closest('.graph-node');
    if (node) {
      if (!tip.hidden && current === node) hideTip();
      else showTip(node);
    } else if (!e.target.closest('.graph-tooltip')) {
      hideTip();
    }
  });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) hideTip(); });

  /* keyboard */
  wrap.addEventListener('focusin', e => {
    const node = e.target.closest('.graph-node');
    if (node) showTip(node);
  });
  wrap.addEventListener('focusout', e => {
    const to = e.relatedTarget;
    if (to && to.closest && (to.closest('.graph-node') || to.closest('.graph-tooltip'))) return;
    if (e.target.closest('.graph-node') || e.target.closest('.graph-tooltip')) hideTip();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTip(); });

  /* ---- keep connectors and any open tooltip in sync with the layout ---- */
  let raf = null;
  function sync() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      drawLinks();
      if (current && !tip.hidden) positionTip(current);
    });
  }
  if ('ResizeObserver' in window) new ResizeObserver(sync).observe(wrap);
  window.addEventListener('resize', sync);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
  sync();
})();
