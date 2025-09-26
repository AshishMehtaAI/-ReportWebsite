(function(){
  const manifestPath = 'reports/manifest.json';
  async function getManifest() {
    try {
      const res = await fetch(manifestPath, { cache: 'no-store' });
      if (!res.ok) throw new Error('manifest not found');
      return await res.json();
    } catch(e) {
      return null;
    }
  }

  function formatDate(iso) {
    try { return new Date(iso).toLocaleString(); } catch(e) { return iso; }
  }

  async function initLatest() {
    const manifest = await getManifest();
    const obj = document.getElementById('pdf-object');
    const titleEl = document.getElementById('latest-title');
    const dateEl = document.getElementById('latest-date');
    const dl = document.getElementById('download-latest');
    const fallback = document.getElementById('fallback-link');

    if (manifest && manifest.latest) {
      const latest = manifest.reports.find(r => r.id === manifest.latest) || manifest.reports[0];
      if (latest) {
        const pdfPath = latest.path;
        if (obj) obj.data = pdfPath + '#view=FitH';
        if (titleEl) titleEl.textContent = latest.title || 'Latest report';
        if (dateEl) dateEl.textContent = latest.generated_at ? 'Generated ' + formatDate(latest.generated_at) : '';
        if (dl) { dl.href = pdfPath; dl.download = ''; }
        if (fallback) fallback.href = pdfPath;
      }
    } else {
      // Defaults already point to reports/latest.pdf
      if (titleEl) titleEl.textContent = 'Latest report';
    }
  }

  async function renderArchive() {
    const manifest = await getManifest();
    const container = document.getElementById('archive');
    if (!container) return;
    if (!manifest || !Array.isArray(manifest.reports)) {
      container.innerHTML = '<p>No manifest found. Add <code>reports/manifest.json</code>.</p>';
      return;
    }
    container.innerHTML = manifest.reports.map(r => `
      <article class="card">
        <a class="report-link" href="../${r.path}" download>${r.title || r.id}</a>
        <div class="meta">${r.generated_at ? 'Generated ' + formatDate(r.generated_at) : ''}</div>
      </article>
    `).join('');
  }

  window.renderArchive = renderArchive;

  if (document.getElementById('pdf-object')) initLatest();
})();