(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const toastBox = document.querySelector('[data-toast-box]');
  const dialog = document.querySelector('[data-diagnosis-dialog]');
  const diagnosisResult = document.querySelector('[data-diagnosis-result]');
  let toastTimer;

  const showToast = (message) => {
    if (!toastBox || !message) return;
    window.clearTimeout(toastTimer);
    toastBox.textContent = `🐔 ${message}`;
    toastBox.hidden = false;
    requestAnimationFrame(() => toastBox.classList.add('is-visible'));
    toastTimer = window.setTimeout(() => {
      toastBox.classList.remove('is-visible');
      window.setTimeout(() => { toastBox.hidden = true; }, 240);
    }, 3800);
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = header?.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      header?.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    const toastButton = event.target.closest('[data-toast]');
    if (toastButton) showToast(toastButton.dataset.toast);

    const diagnosisButton = event.target.closest('[data-open-diagnosis]');
    if (diagnosisButton) {
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        showToast('お使いのブラウザでは診断モーダルを開けません。Lv.2.8です。');
      }
    }
  });

  document.querySelector('[data-login-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('ログインは静的デモです。代わりに、勇気を3ポイント付与しました。');
  });

  document.querySelector('[data-run-diagnosis]')?.addEventListener('click', () => {
    const selected = document.querySelector('input[name="fear"]:checked');
    const level = Number(selected?.value || 2);
    const labels = {
      2: 'Lv.2：ビビり中級。ミュート確認を2回するタイプです。',
      3: 'Lv.3：慎重派チキン。相談文を下書きして満足する素質があります。',
      4: 'Lv.4：プロ予備軍。要望を言えた日は祝日にしていいです。',
      5: 'Lv.5：伝説級。投稿前に全社の未来を背負っています。'
    };
    if (diagnosisResult) {
      diagnosisResult.value = `${labels[level]}\n今日の処方箋：深呼吸を1回、戻るボタンを0.5回、チキンお守りを眺めること。`;
    }
  });

  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedBackdrop =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (clickedBackdrop) dialog.close();
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.global-nav a')];
  const updateCurrentNav = () => {
    const position = window.scrollY + 140;
    let currentId = 'top';
    sections.forEach((section) => {
      if (section.offsetTop <= position) currentId = section.id;
    });
    navLinks.forEach((link) => {
      const target = link.getAttribute('href')?.replace('#', '');
      if (target === currentId) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', updateCurrentNav, { passive: true });
  updateCurrentNav();
})();
