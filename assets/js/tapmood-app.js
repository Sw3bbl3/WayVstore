(function () {
  const cfg = {
    url: window.TAPMOOD_SUPABASE_URL || document.querySelector('meta[name="tapmood-supabase-url"]')?.content,
    key: window.TAPMOOD_SUPABASE_ANON_KEY || document.querySelector('meta[name="tapmood-supabase-anon-key"]')?.content,
  };

  const demo = {
    company: { id: '00000000-0000-0000-0000-000000000101', name: 'Northstar Labs', plan: 'Enterprise', seats: 140, used: 96, mood: 84 },
    people: [
      { name: 'Maya Chen', email: 'maya@northstar.test', team: 'Product', mood: 92 },
      { name: 'Owen Reed', email: 'owen@northstar.test', team: 'Engineering', mood: 81 },
      { name: 'Ari Morgan', email: 'ari@northstar.test', team: 'Sales', mood: 76 },
      { name: 'Leah Smith', email: 'leah@northstar.test', team: 'People', mood: 89 },
    ],
    companies: [
      { id: '00000000-0000-0000-0000-000000000101', name: 'Northstar Labs', plan: 'Enterprise', seats: 140, used: 96, mood: 84 },
      { id: '00000000-0000-0000-0000-000000000102', name: 'Horizon Health', plan: 'Scale', seats: 220, used: 204, mood: 79 },
      { id: '00000000-0000-0000-0000-000000000103', name: 'Luma Studio', plan: 'Growth', seats: 55, used: 41, mood: 91 },
    ],
  };

  let state = { user: null, role: 'hr', company: { ...demo.company }, people: [...demo.people], companies: [...demo.companies], connected: false };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const client = cfg.url && cfg.key && window.supabase ? window.supabase.createClient(cfg.url, cfg.key, { auth: { persistSession: true, autoRefreshToken: true } }) : null;

  function text(selector, message) { const el = $(selector); if (el) el.textContent = message || ''; }
  function html(selector, markup) { const el = $(selector); if (el) el.innerHTML = markup || ''; }
  function isAdminEmail(email = '') { return /(^admin@|\+admin@)/i.test(email); }
  function escape(value = '') { return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
  function initialView() { return document.body.dataset.initialView || new URLSearchParams(location.search).get('view') || 'dashboard'; }
  function setStatus(message, isError = false) { text('#auth-status', message); $('#auth-status')?.classList.toggle('is-error', isError); }
  function supabaseError(result) { if (result?.error) throw result.error; return result?.data; }

  async function loadRemoteData() {
    if (!client) return false;
    const [companiesResult, peopleResult] = await Promise.all([
      client.from('companies').select('*').order('name'),
      client.from('people').select('*').order('name'),
    ]);
    const companies = supabaseError(companiesResult);
    const people = supabaseError(peopleResult);
    if (companies?.length) {
      state.companies = companies;
      state.company = companies.find(c => c.id === state.company.id) || companies[0];
    }
    if (people?.length) state.people = people.filter(p => !p.company_id || p.company_id === state.company.id);
    state.connected = true;
    return true;
  }

  async function bootSession() {
    if (!client) return;
    const { data } = await client.auth.getSession();
    if (data?.session?.user) await openWorkspace(data.session.user);
  }

  async function login(email, password) {
    if (client) {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await openWorkspace(data.user);
    } else {
      await openWorkspace({ email, user_metadata: { full_name: isAdminEmail(email) ? 'Platform Admin' : 'HR Lead' } });
    }
  }

  async function openWorkspace(user) {
    state.user = user;
    state.role = isAdminEmail(user.email) ? 'admin' : 'hr';
    $('#login-card')?.classList.add('hidden');
    $('#workspace')?.classList.remove('hidden');
    text('#session-subtitle', user.email);
    text('#role-label', state.role === 'admin' ? 'Tapmood admin console' : 'HR dashboard');
    const adminTab = document.querySelector('[data-view="admin"]');
    if (adminTab) adminTab.hidden = state.role !== 'admin';
    text('#workspace-title', state.role === 'admin' ? 'Manage every Tapmood company.' : `Welcome back, ${state.company.name}.`);
    await loadRemoteData().catch(error => setStatus(`Supabase read failed: ${error.message}`, true));
    showView(initialView());
    render();
  }

  function metric(label, value, detail, icon) { return `<article class="metric-card"><i data-lucide="${icon}"></i><small>${escape(label)}</small><strong>${escape(value)}</strong><span>${escape(detail)}</span></article>`; }
  function renderDashboard() {
    const avg = Math.round(state.people.reduce((sum, p) => sum + Number(p.mood || 80), 0) / Math.max(1, state.people.length));
    html('#metric-grid', [
      metric('Mood score', avg, state.connected ? 'Live from Supabase' : '+7 points in 30 days', 'smile-plus'),
      metric('Active seats', state.people.length, `${Math.max(0, state.company.seats - state.people.length)} available`, 'badge-check'),
      metric('Participation', '93%', 'Last pulse survey', 'radio-tower'),
      metric('Risk alerts', '3', 'Two trending down', 'bell-ring'),
    ].join(''));
    const teams = [...new Set(state.people.map(p => p.team || 'General'))];
    html('#team-bars', teams.map(team => { const group = state.people.filter(p => (p.team || 'General') === team); const score = Math.round(group.reduce((s, p) => s + Number(p.mood || 80), 0) / Math.max(1, group.length)); return `<div class="bar-row"><span>${escape(team)}</span><div><b style="width:${score}%"></b></div><strong>${score}</strong></div>`; }).join(''));
    html('#action-list', ['Schedule manager listening tour for Sales.', 'Celebrate Product launch recovery.', 'Invite Engineering to focus-time experiment.'].map(item => `<li><i data-lucide="sparkles"></i>${escape(item)}</li>`).join(''));
  }
  function renderPeople() {
    const used = state.people.length;
    const width = Math.min(100, used / Math.max(1, state.company.seats) * 100);
    const fill = $('#seat-meter-fill'); if (fill) fill.style.width = `${width}%`;
    text('#seat-copy', `${used} of ${state.company.seats} seats assigned on the ${state.company.plan} plan.`);
    html('#people-table', `<div class="table-head"><span>Name</span><span>Team</span><span>Mood</span></div>` + state.people.map(p => `<div class="table-row"><span><strong>${escape(p.name)}</strong><small>${escape(p.email)}</small></span><span>${escape(p.team)}</span><span>${escape(p.mood || 82)}</span></div>`).join(''));
  }
  function renderSettings() {
    const name = $('#company-name'); if (name) name.value = state.company.name || '';
    const plan = $('#company-plan'); if (plan) plan.value = state.company.plan || 'Growth';
    text('#connection-copy', client ? (state.connected ? 'Connected to Supabase. Auth, table reads, inserts, and updates are live.' : 'Supabase configured. Sign in to load live data.') : 'Demo mode: copy assets/js/tapmood-config.example.js to tapmood-config.js and fill in URL + anon key.');
  }
  function renderAdmin() {
    html('#admin-metrics', `<strong>${state.companies.length}</strong><span>companies</span><strong>${state.companies.reduce((s, c) => s + Number(c.seats || 0), 0)}</strong><span>licensed seats</span>`);
    html('#company-table', `<div class="table-head"><span>Company</span><span>Seats</span><span>Mood</span></div>` + state.companies.map(c => `<div class="table-row"><span><strong>${escape(c.name)}</strong><small>${escape(c.plan)}</small></span><span>${escape(c.used || 0)}/${escape(c.seats)}</span><span>${escape(c.mood || 80)}</span></div>`).join(''));
  }
  function render() { renderDashboard(); renderPeople(); renderSettings(); renderAdmin(); if (window.lucide) window.lucide.createIcons(); }

  function showView(view) {
    if (view === 'admin' && state.role !== 'admin') view = 'dashboard';
    $$('.tap-tabs button').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    $$('[data-view-panel]').forEach(panel => panel.classList.toggle('hidden', panel.dataset.viewPanel !== view));
    const title = { dashboard: 'Dashboard', people: 'People & seats', settings: 'Settings', admin: 'Admin' }[view] || 'Dashboard';
    document.title = `${title} | Tapmood`;
  }

  async function addPerson(event) {
    event.preventDefault();
    const person = { name: $('#person-name').value.trim(), email: $('#person-email').value.trim(), team: $('#person-team').value.trim(), mood: 83, company_id: state.company.id };
    if (client) supabaseError(await client.from('people').insert(person).select().single());
    state.people.push(person); event.target.reset(); render();
  }

  async function saveSettings() {
    state.company = { ...state.company, name: $('#company-name').value.trim(), plan: $('#company-plan').value };
    if (client) supabaseError(await client.from('companies').upsert(state.company).select().single());
    render();
  }

  async function createCompany(event) {
    event.preventDefault();
    const company = { name: $('#new-company').value.trim(), plan: 'Growth', seats: Number($('#new-seats').value), used: 0, mood: 82 };
    if (client) {
      const saved = supabaseError(await client.from('companies').insert(company).select().single());
      state.companies.push(saved);
    } else state.companies.push(company);
    event.target.reset(); render();
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('#login-form')?.addEventListener('submit', async (event) => { event.preventDefault(); setStatus('Connecting to Supabase…'); try { await login($('#email').value, $('#password').value); setStatus(''); } catch (error) { setStatus(error.message, true); } });
    $('#logout-button')?.addEventListener('click', async () => { if (client) await client.auth.signOut(); state.user = null; $('#workspace')?.classList.add('hidden'); $('#login-card')?.classList.remove('hidden'); });
    $('#sync-button')?.addEventListener('click', async () => { try { await loadRemoteData(); render(); } catch (error) { setStatus(error.message, true); } });
    $$('.tap-tabs button').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));
    $('#person-form')?.addEventListener('submit', addPerson);
    $('#save-settings')?.addEventListener('click', saveSettings);
    $('#company-form')?.addEventListener('submit', createCompany);
    render(); bootSession();
  });
})();
