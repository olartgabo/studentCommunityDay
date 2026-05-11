(function () {
  const config = window.SCD_CONFIG;
  if (!config) return;

  const getValue = (path) =>
    path.split('.').reduce((value, key) => (value == null ? value : value[key]), config);

  const applyText = (root = document) => {
    root.querySelectorAll('[data-config-text]').forEach((el) => {
      const value = getValue(el.dataset.configText);
      if (value != null) el.textContent = value;
    });

    root.querySelectorAll('[data-config-html]').forEach((el) => {
      const value = getValue(el.dataset.configHtml);
      if (value != null) el.innerHTML = value;
    });

    root.querySelectorAll('[data-config-template]').forEach((el) => {
      const template = el.dataset.configTemplate;
      el.textContent = template.replace(/\{([^}]+)\}/g, (_, path) => getValue(path.trim()) ?? '');
    });
  };

  const applyLinks = () => {
    document.querySelectorAll('[data-config-mailto]').forEach((el) => {
      const email = getValue(el.dataset.configMailto);
      if (!email) return;
      const subjectPath = el.dataset.configSubject;
      const subject = subjectPath ? getValue(subjectPath) : '';
      const value = 'mailto:' + email + (subject ? '?subject=' + encodeURIComponent(subject) : '');
      if (el.tagName === 'FORM') el.action = value;
      else el.href = value;
    });
  };

  const applySponsors = () => {
    const list = document.querySelector('[data-config-sponsors]');
    if (!list || !Array.isArray(config.sponsors)) return;

    list.innerHTML = '';
    config.sponsors.forEach((sponsor) => {
      const item = document.createElement('div');
      item.className = 'sponsor' + (sponsor.featured ? ' primary' : '');
      item.textContent = sponsor.name;
      list.appendChild(item);
    });
  };

  applyText();
  applyLinks();
  applySponsors();
})();
