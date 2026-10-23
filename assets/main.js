// Фильтр каталога, галерея товара и заявка (пока через почтовый клиент — бэкенда у статического сайта нет).
document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    document.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    document.querySelectorAll('.cat-group').forEach((g) => { g.hidden = Boolean(f) && g.dataset.group !== f; });
  });
});

document.querySelectorAll('.thumb').forEach((t) => {
  t.addEventListener('click', () => {
    document.querySelector('.gallery-main img').src = t.dataset.src;
    document.querySelectorAll('.thumb').forEach((x) => x.setAttribute('aria-pressed', String(x === t)));
  });
});

document.querySelectorAll('[data-product]').forEach((a) => {
  a.addEventListener('click', () => {
    const sel = document.querySelector('.request-form select[name="product"]');
    if (sel) sel.value = a.dataset.product;
  });
});

document.querySelectorAll('.request-form').forEach((form) => {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const status = form.querySelector('.form-status');
    const d = new FormData(form);
    if (!d.get('name') || !d.get('phone')) { status.textContent = 'Укажите имя и телефон — по нему мы перезвоним.'; return; }
    if (!d.get('consent')) { status.textContent = 'Отметьте согласие на обработку данных, чтобы отправить заявку.'; return; }
    const body = `Имя: ${d.get('name')}\nТелефон: ${d.get('phone')}\nИнтересует: ${d.get('product') || 'консультация'}\n\n${d.get('comment') || ''}`;
    location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent('Заявка с сайта')}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Открываем почту с готовым письмом. Если не открылась — позвоните нам.';
  });
});
