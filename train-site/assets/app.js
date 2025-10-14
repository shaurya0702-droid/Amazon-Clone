/* Basic interactivity and faked data to make the demo feel real */
(function () {
  const pad = (n) => (n < 10 ? "0" + n : String(n));
  function tickClock() {
    const el = document.getElementById("clock");
    if (!el) return;
    const d = new Date();
    el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  setInterval(tickClock, 1000);
  tickClock();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Tabs on both pages
  document.querySelectorAll('.toggle-nav .tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.toggle-nav');
      group.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const name = btn.dataset.tab;
      const showId = name + 'Tab';
      document.querySelectorAll('[id$="Tab"]').forEach(sec => {
        if (sec.id === showId) sec.classList.remove('hidden');
        else if (sec.closest('main')) sec.classList.add('hidden');
      });
    });
  });

  // Search form demo
  const findForm = document.getElementById('findForm');
  const results = document.getElementById('results');
  const fromInput = document.getElementById('fromStation');
  const toInput = document.getElementById('toStation');
  const swapBtn = document.getElementById('swapBtn');

  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const a = fromInput.value; fromInput.value = toInput.value; toInput.value = a;
    });
  }

  if (findForm) {
    findForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const from = fromInput.value.trim();
      const to = toInput.value.trim();
      if (!from || !to) return;
      const mock = [
        { num: '12345', name: 'Rajdhani Express', dep: '14:30', arr: '20:15', dur: '5h 45m', delay: '3m' },
        { num: '45678', name: 'Duronto', dep: '15:00', arr: '19:40', dur: '4h 40m', delay: '0m' },
      ];
      results.innerHTML = mock.map(m => `
        <div class="rec-card">
          <div>
            <div class="rec-header">${m.name} <span class="badge tag">${m.num}</span></div>
            <div class="rec-body">${from} → ${to} · Dep ${m.dep} · Arr ${m.arr} · ${m.dur}</div>
          </div>
          <div class="rec-right">
            <div class="confidence">Delay: ${m.delay}</div>
            <div class="rec-actions">
              <button class="link">Details</button>
              <button class="primary">Book</button>
            </div>
          </div>
        </div>
      `).join('');
      results.hidden = false;
    });
  }

  // Track form demo
  const trackForm = document.getElementById('trackForm');
  const trackResult = document.getElementById('trackResult');
  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('trainNumber').value.trim();
      if (!id) return;
      const steps = [
        'Left Station Beacon A (on time)',
        'Approaching Junction (2m delay)',
        'Platform allocation updated',
      ];
      trackResult.innerHTML = '<ul class="logs">' + steps.map(s => `<li>${s}</li>`).join('') + '</ul>';
      trackResult.hidden = false;
    });
  }

  // DSS page: populate recommendations and logs
  const recList = document.getElementById('recommendations');
  if (recList) {
    const data = [
      {
        title: 'Send Express 123 Rail through Section A',
        labels: ['CRITICAL', 'Section A', 'Rajdhani Express'],
        rationale: 'Holding freight to balance congestion, reduce global standby by 12 min',
        service: 'Beacon A', delay: '3 min', schedule: '14:30 - 14:45', confidence: 97, impact: '12 min delay'
      },
      {
        title: 'Hold Freight 456 for 5 minutes',
        labels: ['PENDING', 'Section B', 'South Route'],
        rationale: 'Freight must be biased priority, listing a smooth bottleneck at Junction',
        service: 'Beacon B', delay: '0 min', schedule: '15:00 - 15:15', confidence: 92, impact: '1 min delay'
      }
    ];

    recList.innerHTML = data.map(d => `
      <article class="rec-card">
        <div>
          <div class="rec-header">${d.title}
            ${d.labels.map(l => `<span class="badge ${l === 'CRITICAL' ? 'critical' : l === 'PENDING' ? 'pending' : 'tag'}">${l}</span>`).join(' ')}
          </div>
          <div class="rec-body"><strong>Rationale:</strong> ${d.rationale}</div>
          <div class="rec-meta">
            <div>Current Service: <strong>${d.service}</strong></div>
            <div>Current Delay: <strong>${d.delay}</strong></div>
            <div>Schedule: <strong>${d.schedule}</strong></div>
          </div>
        </div>
        <div class="rec-right">
          <div class="confidence">Confidence: ${d.confidence}%<br/><span style="color:#ef4444">${d.impact}</span></div>
          <div class="rec-actions">
            <button class="link">Override</button>
            <button class="primary">Accept</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  const logs = document.getElementById('logs');
  if (logs) {
    const items = [
      '14:12 Accepted reroute for Express 123 through Section A',
      '13:58 Overrode platform allocation for Freight 456',
      '13:40 Cleared conflict between Express 21 and Local 78',
    ];
    logs.innerHTML = items.map(i => `<li>${i}</li>`).join('');
  }
})();
