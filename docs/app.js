(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const toastBox = document.querySelector('[data-toast-box]');
  const dialog = document.querySelector('[data-diagnosis-dialog]');
  const diagnosisResult = document.querySelector('[data-diagnosis-result]');
  const quoteText = document.querySelector('[data-quote-text]');
  const quoteSource = document.querySelector('[data-quote-source]');
  const storyGrid = document.querySelector('[data-story-grid]');
  let toastTimer;

  const chickenQuotes = [
    {
      text: '「逃げるがチキンの役に立つ」',
      source: '— チキン仙人'
    },
    {
      text: '「一歩進めない日は、半歩うしろを整える日。」',
      source: '— 撤退戦略研究所'
    },
    {
      text: '「送信前の深呼吸は、通信品質を少し上げる。」',
      source: '— ためらい通信'
    },
    {
      text: '「勇気は大盛りでなくていい。小皿で出してもらおう。」',
      source: '— 入口前食堂'
    },
    {
      text: '「迷ったログインは、まだログアウトしていないだけえらい。」',
      source: '— 認証にやさしい会'
    },
    {
      text: '「今日は様子を見る。その判断にも、ちゃんと椅子を用意する。」',
      source: '— チキンポータル編集部'
    }
  ];

  const chickenStories = [
    {
      tag: '#飲み会',
      title: '「今行きます」と言ってから靴下を選ぶのに17分かかった',
      body: '参加はした。だから勝ち。集合時間という概念には、少しだけ負けた。'
    },
    {
      tag: '#資料提出',
      title: '完璧に直そうとして、結局「一旦これで」で提出した',
      body: '一旦、は魔法の言葉。世界を前に進める小さな呪文です。'
    },
    {
      tag: '#美容院',
      title: '「こんな感じで」と言えず、画像を無言で差し出した',
      body: '非言語コミュニケーションの高度活用。つまりDXです。'
    },
    {
      tag: '#問い合わせ',
      title: '電話番号を見つけたので、まず営業時間だけ確認して閉じた',
      body: '情報収集は立派な第一歩。発信ボタンとは、また別日に会えばいい。'
    },
    {
      tag: '#レジ前',
      title: 'ポイントカードを聞かれる未来に備えて財布を先に開けていた',
      body: '準備が早すぎるだけです。社会インフラとして頼もしい姿勢です。'
    },
    {
      tag: '#チャット',
      title: '「少し相談してもいいですか」を下書きして、少し相談した気になった',
      body: '文面が生まれた時点で、心の会議室は予約済みです。'
    },
    {
      tag: '#注文',
      title: '新メニューに挑戦するつもりで、いつものやつを頼んだ',
      body: '冒険には帰る場所が必要です。今日は帰る場所の品質確認でした。'
    },
    {
      tag: '#予定調整',
      title: '候補日を3つ出すだけなのに、天気と心の余白まで確認した',
      body: '丁寧すぎる調整。カレンダーもたぶん少し照れています。'
    },
    {
      tag: '#発表',
      title: 'マイクテストで声が出たので、本番の50%は終わったと思った',
      body: '音が出た。場も壊れていない。ここから先はボーナスステージです。'
    }
  ];

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

  const pickRandomItems = (items, count) => {
    return [...items]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

  const renderQuote = () => {
    if (!quoteText || !quoteSource) return;
    const quote = pickRandomItems(chickenQuotes, 1)[0];
    quoteText.textContent = quote.text;
    quoteSource.textContent = quote.source;
  };

  const renderStories = () => {
    if (!storyGrid) return;
    const stories = pickRandomItems(chickenStories, 3);
    storyGrid.replaceChildren(...stories.map((story) => {
      const card = document.createElement('article');
      const tag = document.createElement('p');
      const title = document.createElement('h3');
      const body = document.createElement('span');

      card.className = 'story-card';
      tag.textContent = story.tag;
      title.textContent = story.title;
      body.textContent = story.body;

      card.append(tag, title, body);
      return card;
    }));
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

    const storiesButton = event.target.closest('[data-refresh-stories]');
    if (storiesButton) renderStories();

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
  renderQuote();
  renderStories();
})();
