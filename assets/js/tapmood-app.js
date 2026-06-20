(function () {
  const cfg = {
    url: window.TAPMOOD_SUPABASE_URL || document.querySelector('meta[name="tapmood-supabase-url"]')?.content,
    key: window.TAPMOOD_SUPABASE_ANON_KEY || document.querySelector('meta[name="tapmood-supabase-anon-key"]')?.content,
  };

  const demo = {
    company: { id: 'northstar', name: 'Northstar Labs', plan: 'Enterprise', seats: 140 },
    people: [
      { name: 'Maya Chen', email: 'maya@northstar.test', team: 'Product', mood: 92 },
      { name: 'Owen Reed', email: 'owen@northstar.test', team: 'Engineering', mood: 81 },
      { name: 'Ari Morgan', email: 'ari@northstar.test', team: 'Sales', mood: 76 },
      { name: 'Leah Smith', email: 'leah@northstar.test', team: 'People', mood: 89 },
    ],
    companies: [
      { name: 'Northstar Labs', plan: 'Enterprise', seats: 140, used: 96, mood: 84 },
      { name: 'Horizon Health', plan: 'Scale', seats: 220, used: 204, mood: 79 },
      { name: 'Luma Studio', plan: 'Growth', seats: 55, used: 41, mood: 91 },
    ],
  };

  let state = { user: null, role: 'hr', company: demo.company, people: [...demo.people], companies: [...demo.companies] };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const client = cfg.url && cfg.key && window.supabase ? window.supabase.createClient(cfg.url, cfg.key) : null;

  function setStatus(message) { $('#auth-status').textContent = message || ''; }
  function isAdminEmail(email) { return /(^admin@|\+admin@)/i.test(email); }

  async function login(email, password) {
    if (client) {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      state.user = data.user;
    } else {
      state.user = { email, user_metadata: { full_name: isAdminEmail(email) ? 'Platform Admin' : 'HR Lead' } };
    }
    state.role = isAdminEmail(email) ? 'admin' : 'hr';
    $('#login-card').classList.add('hidden');
    $('#workspace').classList.remove('hidden');
    $('#session-subtitle').textContent = state.user.email;
    $('#role-label').textContent = state.role === 'admin' ? 'Tapmood admin console' : 'HR dashboard';
    document.querySelector('[data-view=admin]').hidden = state.role !== 'admin';
    $('#workspace-title').textContent = state.role === 'admin' ? 'Manage every Tapmood company.' : `Welcome back, ${state.company.name}.`;
    render();
  }

  async function loadRemoteData() {
    if (!client) return;
    const [companies, people] = await Promise.all([
      client.from('companies').select('*').order('name'),
      client.from('people').select('*').order('name'),
    ]);
    if (!companies.error && companies.data?.length) state.companies = companies.data;
    if (!people.error && people.data?.length) state.people = people.data;
  }

  function metric(label, value, detail, icon) { return `<article class="metric-card"><i data-lucide="${icon}"></i><small>${label}</small><strong>${value}</strong><span>${detail}</span></article>`; }
  function renderDashboard() {
    const avg = Math.round(state.people.reduce((sum, p) => sum + Number(p.mood || 80), 0) / state.people.length);
    $('#metric-grid').innerHTML = [
      metric('Mood score', avg, '+7 points in 30 days', 'smile-plus'),
      metric('Active seats', state.people.length, `${state.company.seats - state.people.length} available`, 'badge-check'),
      metric('Participation', '93%', 'Last pulse survey', 'radio-tower'),
      metric('Risk alerts', '3', 'Two trending down', 'bell-ring'),
    ].join('');
    const teams = ['Product', 'Engineering', 'Sales', 'People'].map((team) => ({ team, score: Math.round(state.people.filter(p => p.team === team).reduce((s, p) => s + (p.mood || 80), 0) / Math.max(1, state.people.filter(p => p.team === team).length)) || 82 }));
    $('#team-bars').innerHTML = teams.map(({ team, score }) => `<div class="bar-row"><span>${team}</span><div><b style="width:${score}%"></b></div><strong>${score}</strong></div>`).join('');
    $('#action-list').innerHTML = ['Schedule manager listening tour for Sales.', 'Celebrate Product launch recovery.', 'Invite Engineering to focus-time experiment.'].map(item => `<li><i data-lucide="sparkles"></i>${item}</li>`).join('');
  }
  function renderPeople() {
    const used = state.people.length;
    $('#seat-meter-fill').style.width = `${Math.min(100, used / state.company.seats * 100)}%`;
    $('#seat-copy').textContent = `${used} of ${state.company.seats} seats assigned on the ${state.company.plan} plan.`;
    $('#people-table').innerHTML = `<div class="table-head"><span>Name</span><span>Team</span><span>Mood</span></div>` + state.people.map(p => `<div class="table-row"><span><strong>${p.name}</strong><small>${p.email}</small></span><span>${p.team}</span><span>${p.mood || 82}</span></div>`).join('');
  }
  function renderSettings() {
    $('#company-name').value = state.company.name;
    $('#company-plan').value = state.company.plan;
    $('#connection-copy').textContent = client ? 'Connected to Supabase. Auth and table reads are live.' : 'Demo mode: add Supabase URL and anon key globals/meta tags to connect live auth and tables.';
  }
  function renderAdmin() {
    $('#admin-metrics').innerHTML = `<strong>${state.companies.length}</strong><span>companies</span><strong>${state.companies.reduce((s, c) => s + Number(c.seats || 0), 0)}</strong><span>licensed seats</span>`;
    $('#company-table').innerHTML = `<div class="table-head"><span>Company</span><span>Seats</span><span>Mood</span></div>` + state.companies.map((c, index) => `<div class="table-row"><span><strong>${c.name}</strong><small>${c.plan}</small></span><span>${c.used || 0}/${c.seats}</span><span><input data-company-index="${index}" value="${c.mood || 80}" type="number" min="0" max="100"></span></div>`).join('');
  }
  function render() { renderDashboard(); renderPeople(); renderSettings(); renderAdmin(); if (window.lucide) window.lucide.createIcons(); }

  document.addEventListener('DOMContentLoaded', () => {
    $('#login-form')?.addEventListener('submit', async (event) => { event.preventDefault(); setStatus('Connecting…'); try { await login($('#email').value, $('#password').value); await loadRemoteData(); setStatus(''); render(); } catch (error) { setStatus(error.message); } });
    $('#logout-button')?.addEventListener('click', async () => { if (client) await client.auth.signOut(); state.user = null; $('#workspace').classList.add('hidden'); $('#login-card').classList.remove('hidden'); });
    $('#sync-button')?.addEventListener('click', async () => { await loadRemoteData(); render(); });
    $$('.tap-tabs button').forEach(btn => btn.addEventListener('click', () => { $$('.tap-tabs button').forEach(b => b.classList.remove('active')); btn.classList.add('active'); $$('[data-view-panel]').forEach(panel => panel.classList.toggle('hidden', panel.dataset.viewPanel !== btn.dataset.view)); }));
    $('#person-form')?.addEventListener('submit', async (event) => { event.preventDefault(); const person = { name: $('#person-name').value, email: $('#person-email').value, team: $('#person-team').value, mood: 83, company_id: state.company.id }; if (client) await client.from('people').insert(person); state.people.push(person); event.target.reset(); render(); });
    $('#save-settings')?.addEventListener('click', async () => { state.company.name = $('#company-name').value; state.company.plan = $('#company-plan').value; if (client) await client.from('companies').upsert(state.company); render(); });
    $('#company-form')?.addEventListener('submit', async (event) => { event.preventDefault(); const company = { name: $('#new-company').value, plan: 'Growth', seats: Number($('#new-seats').value), used: 0, mood: 82 }; if (client) await client.from('companies').insert(company); state.companies.push(company); event.target.reset(); render(); });
    render();
  });
})();
