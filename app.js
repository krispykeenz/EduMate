// DEMO MODE ONLY: Static showcase with mocked tutor listings.
// Remove the /demo folder when publishing a real deployment.

const TUTORS = [
  { id: 't1', name: 'Ethan W.', subjects: ['Calculus', 'Physics'], rating: 4.7, rate: 12 },
  { id: 't2', name: 'Keenan B.', subjects: ['Java', 'Web Dev'], rating: 4.8, rate: 10 },
  { id: 't3', name: 'Leko M.', subjects: ['Accounting', 'Economics'], rating: 4.6, rate: 11 },
  { id: 't4', name: 'Thabile N.', subjects: ['Databases', 'SQL'], rating: 4.5, rate: 9 },
];

const state = {
  query: '',
  requests: [],
};

const els = {
  search: document.getElementById('search'),
  tutorGrid: document.getElementById('tutorGrid'),
  reqCount: document.getElementById('reqCount'),
  reqList: document.getElementById('reqList'),
};

function formatStars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(Math.max(0, 5 - full));
}

function filtered() {
  const q = state.query.trim().toLowerCase();
  if (!q) return TUTORS;
  return TUTORS.filter((t) =>
    [t.name, ...t.subjects].some((s) => s.toLowerCase().includes(q))
  );
}

function requestSession(tutor) {
  state.requests.unshift({
    id: `r_${Date.now()}`,
    tutorId: tutor.id,
    tutorName: tutor.name,
    subject: tutor.subjects[0],
    status: 'Pending',
  });
  renderRequests();
}

function renderTutors() {
  els.tutorGrid.innerHTML = '';

  const items = filtered();
  if (!items.length) {
    const empty = document.createElement('div');
    empty.className = 'muted';
    empty.textContent = 'No tutors match your search.';
    els.tutorGrid.appendChild(empty);
    return;
  }

  for (const t of items) {
    const card = document.createElement('div');
    card.className = 'product';

    const title = document.createElement('h3');
    title.textContent = t.name;

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `${formatStars(t.rating)} • ${t.rating.toFixed(1)} • $${t.rate}/hr`;

    const subj = document.createElement('div');
    subj.className = 'meta';
    subj.style.marginTop = '.35rem';
    subj.textContent = `Subjects: ${t.subjects.join(', ')}`;

    const actions = document.createElement('div');
    actions.className = 'row';
    actions.style.marginTop = '.75rem';

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.type = 'button';
    btn.textContent = 'Request session';
    btn.addEventListener('click', () => requestSession(t));

    actions.appendChild(document.createElement('span'));
    actions.appendChild(btn);

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(subj);
    card.appendChild(actions);

    els.tutorGrid.appendChild(card);
  }
}

function renderRequests() {
  els.reqCount.textContent = String(state.requests.length);
  els.reqList.innerHTML = '';

  if (!state.requests.length) {
    const empty = document.createElement('div');
    empty.className = 'muted';
    empty.textContent = 'No requests yet.';
    els.reqList.appendChild(empty);
    return;
  }

  for (const r of state.requests) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <div>
        <div class="name">${r.tutorName}</div>
        <div class="line">Subject: ${r.subject}</div>
      </div>
      <div class="pill">${r.status}</div>
    `;
    els.reqList.appendChild(item);
  }
}

els.search.addEventListener('input', (e) => {
  state.query = e.target.value;
  renderTutors();
});

renderTutors();
renderRequests();
