'use strict';

// ===== 設定 =====
const MEMBER_PASSWORD = 'sports1234'; // ← パスワードをここで変更できます
const SESSION_KEY = 'st_logged_in';

// ===== コンテンツデータ（デフォルト） =====
const defaultNews = [
  { id: 'n1', date: '2025.05.20', tag: '重要', important: true, isNew: true, title: '2025年度 前期 勉強会スケジュールを公開しました', body: '6月〜9月の勉強会・実技練習の日程を公開しました。詳細は各回の案内をご確認ください。' },
  { id: 'n2', date: '2025.05.10', tag: '活動報告', important: false, isNew: true, title: '第6回 勉強会「テーピング実技 応用編」を実施しました', body: '5月10日に第6回勉強会を開催しました。参加者20名でテーピング応用技術を学びました。' },
  { id: 'n3', date: '2025.04.18', tag: 'コンテンツ', important: false, isNew: false, title: '暗記学習「RICE処置と応急対応」を追加しました', body: '新しい暗記学習セット（45問）を追加しました。部員の皆さんはぜひ活用してください。' },
  { id: 'n4', date: '2025.04.01', tag: '入会', important: false, isNew: false, title: '2025年度 新入部員の募集を開始しました', body: '新年度の部員募集を開始しました。スポーツトレーナーに興味のある方はお気軽にお問い合わせください。' },
];
const defaultVideos = [
  { id: 'v1', title: 'スポーツトレーナーの基本姿勢', category: 'basics', duration: '12:34', date: '2024.11.15', thumb: 'https://picsum.photos/seed/v1/400/225', isNew: false },
  { id: 'v2', title: '下肢ストレッチの基礎と実践', category: 'stretch', duration: '18:02', date: '2024.11.20', thumb: 'https://picsum.photos/seed/v2/400/225', isNew: false },
  { id: 'v3', title: '足首テーピングの巻き方・基礎編', category: 'taping', duration: '22:15', date: '2024.12.01', thumb: 'https://picsum.photos/seed/v3/400/225', isNew: false },
  { id: 'v4', title: '膝関節リハビリプロトコル', category: 'rehab', duration: '30:48', date: '2024.12.10', thumb: 'https://picsum.photos/seed/v4/400/225', isNew: false },
  { id: 'v5', title: '肩・首のコンディショニング', category: 'stretch', duration: '14:30', date: '2025.01.05', thumb: 'https://picsum.photos/seed/v5/400/225', isNew: false },
  { id: 'v6', title: 'スポーツ栄養学 入門', category: 'basics', duration: '09:55', date: '2025.01.18', thumb: 'https://picsum.photos/seed/v6/400/225', isNew: false },
  { id: 'v7', title: '肘MCL テーピング', category: 'taping', duration: '', date: '2025.05.27', thumb: 'https://img.youtube.com/vi/Bjn-l-MQaOg/mqdefault.jpg', isNew: true, url: 'https://youtu.be/Bjn-l-MQaOg' },
  { id: 'v8', title: '回外捻挫 テーピング', category: 'taping', duration: '', date: '2025.05.27', thumb: 'https://img.youtube.com/vi/wFq8E8XQMYo/mqdefault.jpg', isNew: true, url: 'https://youtu.be/wFq8E8XQMYo' },
  { id: 'v9', title: '膝MCL テーピング', category: 'taping', duration: '', date: '2025.05.27', thumb: 'https://img.youtube.com/vi/qOHkj2de5ls/mqdefault.jpg', isNew: true, url: 'https://youtu.be/qOHkj2de5ls' },
  { id: 'v10', title: '肩鎖関節捻挫 テーピング', category: 'taping', duration: '', date: '2025.05.27', thumb: 'https://img.youtube.com/vi/SAbc9h8JlSk/mqdefault.jpg', isNew: true, url: 'https://youtu.be/SAbc9h8JlSk' },
  { id: 'v11', title: '反復性前方脱臼 テーピング', category: 'taping', duration: '', date: '2025.05.27', thumb: 'https://img.youtube.com/vi/uJ0xLfDHsmU/mqdefault.jpg', isNew: true, url: 'https://youtu.be/uJ0xLfDHsmU' },
];
const defaultLectures = [
  { id: 'l1', title: '上肢の解剖学 基礎講義', category: 'anatomy', date: '2024.10.05', instructor: '山田 講師', desc: '肩・肘・手関節周囲の骨・筋・神経の構造と機能を学ぶ。', isNew: false, num: 1 },
  { id: 'l2', title: '下肢の解剖学 基礎講義', category: 'anatomy', date: '2024.10.19', instructor: '山田 講師', desc: '股・膝・足関節周囲の構造と、スポーツ動作への影響を解説。', isNew: false, num: 2 },
  { id: 'l3', title: 'スポーツ栄養学 入門', category: 'nutrition', date: '2024.11.02', instructor: '鈴木 講師', desc: '三大栄養素の役割・試合前後の食事戦略・水分補給のポイント。', isNew: false, num: 3 },
  { id: 'l4', title: 'テーピング理論と実践 基礎編', category: 'taping', date: '2024.11.16', instructor: '佐藤 講師', desc: 'テーピングの目的・種類・適応と禁忌、足首の基本的な巻き方。', isNew: false, num: 4 },
  { id: 'l5', title: 'スポーツ障害とリハビリテーション', category: 'rehab', date: '2024.12.07', instructor: '田中 講師', desc: '代表的なスポーツ外傷・障害の分類と、段階的な復帰プログラム。', isNew: false, num: 5 },
  { id: 'l6', title: 'テーピング実技 応用編', category: 'taping', date: '2025.01.11', instructor: '佐藤 講師', desc: '膝・肩・手首のテーピング技術。スポーツ種目別の応用も紹介。', isNew: false, num: 6 },
  { id: 'l7', title: 'プライオメトリクス（NSCA 18章）', category: 'sc', date: '2025.05.25', instructor: '', desc: 'SSC（伸張-短縮サイクル）を活用した爆発的パワー向上トレーニング。初級〜上級のプログラム設計、48種類のドリル、理解度クイズまで網羅。', isNew: true, num: 7, url: 'plyometrics/④プライオメトリクス資料一覧.html' },
];
const defaultMemory = [
  { id: 'm1', title: '上肢の筋肉・名称', category: 'anatomy', count: '40問', progress: 65, desc: '三角筋・上腕二頭筋・上腕三頭筋など主要筋の起始停止と機能。', isNew: false },
  { id: 'm2', title: '下肢の筋肉・名称', category: 'anatomy', count: '52問', progress: 40, desc: '大腿四頭筋・ハムストリングスなど。起始停止と機能を網羅。', isNew: false },
  { id: 'm3', title: '三大栄養素と役割', category: 'nutrition', count: '35問', progress: 82, desc: '糖質・脂質・タンパク質の代謝経路とスポーツへの影響。', isNew: false },
  { id: 'm4', title: 'ビタミン・ミネラル', category: 'nutrition', count: '28問', progress: 20, desc: '各ビタミン・ミネラルの機能・欠乏症・スポーツでの必要量。', isNew: false },
  { id: 'm5', title: 'スポーツ外傷の分類', category: 'injury', count: '60問', progress: 55, desc: '捻挫・骨折・肉離れの分類・症状・応急処置のポイント。', isNew: false },
  { id: 'm6', title: 'RICE処置と応急対応', category: 'injury', count: '45問', progress: 90, desc: 'Rest・Ice・Compression・Elevationの具体的手順と注意点。', isNew: false },
  { id: 'm7', title: '肩・上腕 筋肉カード', category: 'anatomy', count: '20問', progress: 0, desc: '肩・上腕帯の筋肉（起始・停止・作用・支配神経）を暗記カードまたはテストで学習できます。', isNew: true, urlMemory: 'muscle-quiz/index.html', urlQuiz: 'muscle-quiz/quiz.html' },
  { id: 'm8', title: '3D解剖学ビューワー', category: 'anatomy', count: '', progress: 0, desc: '3Dモデルで骨格・筋肉の位置と動きをインタラクティブに学習できます。', isNew: true, url: 'anatomy-app/' },
];

const defaultBoard = [
  {
    id: 'b1',
    title: 'テーピング練習の感想シェアしよう！',
    body: '先日の勉強会でテーピング実技をやりました！みんなどうでしたか？難しかったところや気づいたことをシェアしてください！',
    author: '代表',
    date: '2025.05.15',
    comments: [
      { id: 'bc1', author: 'メンバーA', body: '足首は巻けるようになってきたけど、膝は難しかったです…', date: '2025.05.16' },
      { id: 'bc2', author: '代表', body: 'わかる！膝は複雑だよね。次回もっと時間かけてやろう！', date: '2025.05.16' },
    ]
  },
  {
    id: 'b2',
    title: '解剖学の勉強どうしてる？',
    body: '資格試験に向けて解剖学の暗記を頑張っています。みんなはどんな方法で覚えていますか？おすすめの勉強法があったら教えてください！',
    author: 'メンバーB',
    date: '2025.05.10',
    comments: []
  },
];

const categoryLabels = { basics: '基礎', stretch: 'ストレッチ', taping: 'テーピング', rehab: 'リハビリ', anatomy: '解剖学', nutrition: '栄養学', injury: 'スポーツ障害', sc: 'S&C' };

function getData(key, defaults) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : defaults;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}
let _toastTimer = null;
function showToast(msg) {
  let el = document.getElementById('st-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'st-toast';
    el.className = 'st-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

// ===== コンテンツレンダリング =====
function renderNewsSection() {
  const el = document.getElementById('news-list');
  if (!el) return;
  const news = getData('st_news', defaultNews);
  if (!news.length) {
    el.innerHTML = '<p style="color:#707070;font-size:0.875rem;">お知らせはありません。</p>';
    return;
  }
  el.innerHTML = news.map(n => `
    <div class="news-card${n.important ? ' news-card--important' : ''} reveal">
      <div class="news-card__meta">
        <time class="news-card__date">${n.date}</time>
        <span class="news-card__tag">${n.tag}</span>
        ${n.isNew ? '<span class="badge-new">NEW</span>' : ''}
      </div>
      <p class="news-card__title">${n.title}</p>
      <p class="news-card__body">${n.body}</p>
    </div>`).join('');
  el.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function driveToEmbed(url) {
  if (!url) return '';
  // YouTube: youtu.be/ID
  const ytShort = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  // YouTube: youtube.com/watch?v=ID
  const ytLong = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (ytLong) return `https://www.youtube.com/embed/${ytLong[1]}`;
  // Google Drive
  const drive = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
  return '';
}

function renderVideosSection() {
  const el = document.getElementById('videos-grid');
  if (!el) return;
  const videos = getData('st_videos', defaultVideos);
  el.innerHTML = videos.map(v => {
    const embedUrl = driveToEmbed(v.url);
    const playable = !!embedUrl;
    return `
    <div class="card reveal${playable ? ' card--playable' : ''}" data-title="${v.title}" data-category="${v.category}"${playable ? ` data-embed="${embedUrl}" data-video-title="${v.title}"` : ''}>
      <div class="card__thumb">
        ${v.thumb ? `<img src="${v.thumb}" alt="${v.title}" loading="lazy" />` : '<div class="card__thumb-placeholder"></div>'}
        ${playable ? '<div class="card__overlay"><span class="play-icon">▶</span></div>' : ''}
        ${v.duration ? `<span class="card__duration">${v.duration}</span>` : ''}
        ${v.isNew ? '<span class="badge-new badge-new--card">NEW</span>' : ''}
      </div>
      <div class="card__body">
        <span class="card__cat">${categoryLabels[v.category] || v.category}</span>
        <p class="card__title">${v.title}</p>
        <p class="card__date">${v.date}</p>
      </div>
    </div>`;
  }).join('');
  el.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  el.querySelectorAll('.card--playable').forEach(card => {
    card.addEventListener('click', () => openVideoModal(card.dataset.embed, card.dataset.videoTitle));
  });
}

function renderLecturesSection() {
  const el = document.getElementById('lectures-grid');
  if (!el) return;
  const lectures = getData('st_lectures', defaultLectures);
  el.innerHTML = lectures.map(l => `
    <div class="card card--lecture reveal${l.url ? ' card--has-url' : ''}" data-title="${l.title}" data-category="${l.category}"${l.url ? ` data-url="${l.url}"` : ''}>
      <div class="card__body">
        <div class="card__lecture-num">No.${l.num || ''}</div>
        <span class="card__cat">${categoryLabels[l.category] || l.category}</span>
        ${l.isNew ? '<span class="badge-new badge-new--card">NEW</span>' : ''}
        <p class="card__title">${l.title}</p>
        ${l.instructor ? `<p class="card__instructor">${l.instructor}</p>` : ''}
        ${l.desc ? `<p class="card__desc">${l.desc}</p>` : ''}
        <div class="card__footer">
          <p class="card__date">${l.date}</p>
          ${l.url ? `<a href="${l.url}" target="_blank" class="card__open-btn" onclick="event.stopPropagation()">資料を開く →</a>` : ''}
        </div>
      </div>
    </div>`).join('');
  el.querySelectorAll('.card--has-url').forEach(card => {
    card.addEventListener('click', () => window.open(card.dataset.url, '_blank'));
  });
  el.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function renderMemorySection() {
  const el = document.getElementById('memory-grid');
  if (!el) return;
  const memory = getData('st_memory', defaultMemory);
  el.innerHTML = memory.map(m => `
    <div class="memory-card reveal${m.urlMemory ? ' card--mode-select' : (m.url ? ' card--has-url' : '')}" data-title="${m.title}" data-category="${m.category}"${m.urlMemory ? ` data-url-memory="${m.urlMemory}" data-url-quiz="${m.urlQuiz}"` : (m.url ? ` data-url="${m.url}"` : '')}>
      <div class="memory-card__header">
        <span class="card__cat">${categoryLabels[m.category] || m.category}</span>
        ${m.isNew ? '<span class="badge-new badge-new--card">NEW</span>' : ''}
        <span class="memory-card__count">${m.count}</span>
      </div>
      <p class="memory-card__title">${m.title}</p>
      <p class="memory-card__desc">${m.desc}</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${m.progress}%"></div>
      </div>
      <div class="memory-card__footer">
        <p class="memory-card__progress">${m.progress}% 習得</p>
        ${m.urlMemory ? '<span class="card__open-btn">学習する →</span>' : (m.url ? `<a href="${m.url}" target="_blank" class="card__open-btn" onclick="event.stopPropagation()">開く →</a>` : '')}
      </div>
    </div>`).join('');
  el.querySelectorAll('.card--mode-select').forEach(card => {
    card.addEventListener('click', () => openModeModal(card.dataset.title, card.dataset.urlMemory, card.dataset.urlQuiz));
  });
  el.querySelectorAll('.card--has-url').forEach(card => {
    card.addEventListener('click', () => window.open(card.dataset.url, '_blank'));
  });
  el.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  el.querySelectorAll('.memory-card').forEach(card => progressObserver.observe(card));
}

// ===== 掲示板 =====
function renderBoardSection() {
  const listEl = document.getElementById('board-list');
  if (!listEl) return;
  const posts = getData('st_board', defaultBoard);
  if (!posts.length) {
    listEl.innerHTML = '<p class="board-empty">まだ投稿がありません。最初の投稿をしてみましょう！</p>';
    return;
  }
  listEl.innerHTML = posts.map(post => `
    <div class="board-post reveal" id="post-${escapeHtml(post.id)}">
      <div class="board-post__header" data-post-id="${escapeHtml(post.id)}">
        <div class="board-post__header-top">
          <div class="board-post__meta">
            <span class="board-post__author">${escapeHtml(post.author || '匿名')}</span>
            <time class="board-post__date">${escapeHtml(post.date)}</time>
          </div>
          <div class="board-post__right">
            <span class="board-post__comment-count">💬 ${post.comments.length}</span>
            <span class="board-post__chevron">▼</span>
          </div>
        </div>
        <h3 class="board-post__title">${escapeHtml(post.title)}</h3>
      </div>
      <div class="board-post__expand" id="expand-${escapeHtml(post.id)}" hidden>
        <p class="board-post__body">${escapeHtml(post.body).replace(/\n/g, '<br>')}</p>
        <div class="board-comments">
          <p class="board-comments__title">COMMENTS (${post.comments.length})</p>
          <div class="board-comments__list">
            ${post.comments.length
              ? post.comments.map(c => `
                <div class="board-comment">
                  <div class="board-comment__meta">
                    <span class="board-comment__author">${escapeHtml(c.author || '匿名')}</span>
                    <time class="board-comment__date">${escapeHtml(c.date)}</time>
                  </div>
                  <p class="board-comment__body">${escapeHtml(c.body).replace(/\n/g, '<br>')}</p>
                </div>`).join('')
              : '<p class="board-comments__empty">コメントはまだありません。</p>'}
          </div>
          <form class="board-comment-form" data-post-id="${escapeHtml(post.id)}">
            <div class="board-comment-form__fields">
              <input type="text" class="bc-author" placeholder="名前（任意）" maxlength="30" />
              <textarea class="bc-body" rows="2" placeholder="コメントを入力" required maxlength="300"></textarea>
            </div>
            <div class="board-comment-form__submit">
              <button type="submit" class="btn btn--primary btn--sm">コメントする</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `).join('');

  listEl.querySelectorAll('.board-post__header').forEach(header => {
    header.addEventListener('click', () => {
      const postId = header.dataset.postId;
      const expand = document.getElementById(`expand-${postId}`);
      const postEl = document.getElementById(`post-${postId}`);
      const isOpen = !expand.hidden;
      expand.hidden = isOpen;
      postEl.classList.toggle('board-post--open', !isOpen);
    });
  });

  listEl.querySelectorAll('.board-comment-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const postId = form.dataset.postId;
      const body = form.querySelector('.bc-body').value.trim();
      if (!body) return;
      submitBoardComment(postId, form.querySelector('.bc-author').value.trim(), body);
    });
  });

  listEl.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function submitBoardPost(title, body, author) {
  const posts = getData('st_board', defaultBoard);
  posts.unshift({
    id: 'b' + Date.now(),
    title: title.trim(),
    body: body.trim(),
    author: author.trim() || '匿名',
    date: todayStr(),
    comments: []
  });
  localStorage.setItem('st_board', JSON.stringify(posts));
  renderBoardSection();
  showToast('投稿しました');
}

function submitBoardComment(postId, author, body) {
  const posts = getData('st_board', defaultBoard);
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  post.comments.push({ id: 'bc' + Date.now(), author: author || '匿名', body, date: todayStr() });
  localStorage.setItem('st_board', JSON.stringify(posts));
  renderBoardSection();
  setTimeout(() => {
    const expand = document.getElementById(`expand-${postId}`);
    const postEl = document.getElementById(`post-${postId}`);
    if (expand) expand.hidden = false;
    if (postEl) postEl.classList.add('board-post--open');
    expand?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
  showToast('コメントしました');
}

// ===== ログイン状態管理 =====
function isLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}
function login() {
  sessionStorage.setItem(SESSION_KEY, 'true');
  document.body.classList.add('logged-in');
  updateAuthUI();
}
function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  document.body.classList.remove('logged-in');
  updateAuthUI();
}

function updateAuthUI() {
  const authBtn = document.getElementById('auth-btn');
  if (isLoggedIn()) {
    authBtn.textContent = 'ログアウト';
    authBtn.classList.remove('btn--ghost');
    authBtn.classList.add('btn--outline-muted');
  } else {
    authBtn.textContent = 'ログイン';
    authBtn.classList.add('btn--ghost');
    authBtn.classList.remove('btn--outline-muted');
  }
}

// ページ読み込み時にログイン状態を復元
if (isLoggedIn()) {
  document.body.classList.add('logged-in');
}
updateAuthUI();

// ===== ログインモーダル =====
const modal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('login-password').focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  loginError.classList.remove('visible');
  loginForm.reset();
}

document.getElementById('auth-btn').addEventListener('click', () => {
  if (isLoggedIn()) {
    logout();
  } else {
    openModal();
  }
});
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('locked-login-btn').addEventListener('click', openModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const pw = document.getElementById('login-password').value;
  if (pw === MEMBER_PASSWORD) {
    login();
    closeModal();
    // コンテンツセクションにフォーカス
    document.getElementById('tab-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    loginError.classList.add('visible');
    document.getElementById('login-password').value = '';
    document.getElementById('login-password').focus();
  }
});

// ===== Header scroll state =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===== Tab Switching =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

function switchTab(tabName) {
  tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
  tabPanels.forEach(panel => {
    const isActive = panel.id === `tab-${tabName}`;
    panel.classList.toggle('active', isActive);
    if (isActive) {
      panel.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
    }
  });
  // 検索をリセット
  const searchInput = document.getElementById('search-input');
  if (searchInput.value) {
    searchInput.value = '';
    applySearch('');
  }
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!isLoggedIn()) {
      openModal();
      return;
    }
    switchTab(btn.dataset.tab);
  });
});

// nav リンクからのタブ切り替え（ログイン必須）
document.querySelectorAll('.nav-link[data-tab]').forEach(el => {
  el.addEventListener('click', e => {
    if (!isLoggedIn()) {
      e.preventDefault();
      openModal();
      return;
    }
    switchTab(el.dataset.tab);
  });
});

// data-scroll-tab ボタン
document.querySelectorAll('[data-scroll-tab]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    if (!isLoggedIn()) {
      openModal();
      return;
    }
    switchTab(el.dataset.scrollTab);
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== 検索 =====
function applySearch(query) {
  const q = query.trim().toLowerCase();
  const activePanel = document.querySelector('.tab-panel.active');
  if (!activePanel) return;

  const cards = activePanel.querySelectorAll('[data-title]');
  let visibleCount = 0;

  cards.forEach(card => {
    const title = (card.dataset.title || '').toLowerCase();
    const match = !q || title.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });

  // 「見つかりません」メッセージ
  let emptyMsg = activePanel.querySelector('.search-empty');
  if (!emptyMsg) {
    emptyMsg = document.createElement('p');
    emptyMsg.className = 'search-empty';
    emptyMsg.textContent = '該当するコンテンツが見つかりませんでした。';
    activePanel.querySelector('.cards-grid').after(emptyMsg);
  }
  emptyMsg.classList.toggle('visible', visibleCount === 0 && q.length > 0);
}

document.getElementById('search-input').addEventListener('input', e => {
  applySearch(e.target.value);
});

// ===== フィルターボタン =====
function initFilter(gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const panel = grid.closest('.tab-panel');
  const btns = panel.querySelectorAll('.filter-btn');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      grid.querySelectorAll('[data-category]').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });
}

// ===== IntersectionObserver: Reveal (CSS fallback + dynamic elements) =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.children).filter(
      el => el.classList.contains('reveal')
    );
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${(idx % 6) * 100}ms`;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== プログレスバーアニメーション =====
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const fill = entry.target.querySelector('.progress-fill');
    if (fill) {
      const target = fill.style.width;
      fill.style.width = '0';
      setTimeout(() => { fill.style.width = target; }, 100);
    }
    progressObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

// ===== 初期レンダリング =====
renderNewsSection();
renderVideosSection();
renderLecturesSection();
renderMemorySection();
renderBoardSection();

// フィルター再初期化（動的レンダリング後）
initFilter('videos-grid');
initFilter('lectures-grid');
initFilter('memory-grid');

// ===== サーバーから最新コンテンツを取得して再描画 =====
// まずlocalStorage/既定値で即表示 → サーバーの最新で上書き（全端末で共有）
(async function syncContentFromServer() {
  const keys = ['st_news', 'st_videos', 'st_lectures', 'st_memory'];
  let changed = false;
  await Promise.all(keys.map(async (key) => {
    try {
      const res = await fetch(`/.netlify/functions/content?key=${key}`);
      const json = await res.json();
      if (json && Array.isArray(json.data)) {
        localStorage.setItem(key, JSON.stringify(json.data));
        changed = true;
      }
    } catch (_) { /* オフライン時は既存表示のまま */ }
  }));
  if (changed) {
    renderNewsSection();
    renderVideosSection();
    renderLecturesSection();
    renderMemorySection();
    initFilter('videos-grid');
    initFilter('lectures-grid');
    initFilter('memory-grid');
  }
})();

// ===== 動画モーダル =====
const videoModal = document.getElementById('video-modal');
const videoIframe = document.getElementById('video-iframe');
const videoModalTitle = document.getElementById('video-modal-title');

function openVideoModal(embedUrl, title) {
  videoIframe.src = embedUrl;
  videoModalTitle.textContent = title || '';
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeVideoModal() {
  videoIframe.src = '';
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('video-modal-close').addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', e => { if (e.target === videoModal) closeVideoModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideoModal(); });

// ===== 掲示板イベント =====
document.getElementById('board-new-btn').addEventListener('click', () => {
  if (!isLoggedIn()) { openModal(); return; }
  const wrap = document.getElementById('board-new-wrap');
  const isHidden = wrap.style.display === 'none' || wrap.style.display === '';
  wrap.style.display = isHidden ? 'block' : 'none';
  if (!isHidden) document.getElementById('board-post-form').reset();
});
document.getElementById('board-post-cancel').addEventListener('click', () => {
  document.getElementById('board-new-wrap').style.display = 'none';
  document.getElementById('board-post-form').reset();
});
document.getElementById('board-locked-login-btn').addEventListener('click', openModal);
document.getElementById('board-post-form').addEventListener('submit', e => {
  e.preventDefault();
  submitBoardPost(
    document.getElementById('bp-title').value,
    document.getElementById('bp-body').value,
    document.getElementById('bp-author').value
  );
  document.getElementById('board-post-form').reset();
  document.getElementById('board-new-wrap').style.display = 'none';
});

// ===== 学習モード選択モーダル =====
const modeModal = document.getElementById('mode-modal');
function openModeModal(title, urlMemory, urlQuiz) {
  document.getElementById('mode-modal-title').textContent = title;
  document.getElementById('mode-btn-memory').href = urlMemory;
  document.getElementById('mode-btn-quiz').href = urlQuiz;
  modeModal.classList.add('open');
  modeModal.setAttribute('aria-hidden', 'false');
}
function closeModeModal() {
  modeModal.classList.remove('open');
  modeModal.setAttribute('aria-hidden', 'true');
}
document.getElementById('mode-modal-close').addEventListener('click', closeModeModal);
modeModal.addEventListener('click', e => { if (e.target === modeModal) closeModeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModeModal(); });

// ===== Back to top =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Contact Form (Web3Forms) =====
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const formStatus  = document.getElementById('form-status');

contactForm.addEventListener('submit', async e => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = '送信中…';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
    });
    const data = await res.json();

    if (data.success) {
      formStatus.textContent = '✓ 送信が完了しました。お返事をお待ちください。';
      formStatus.classList.add('form-status--success');
      contactForm.reset();
    } else {
      throw new Error(data.message || '送信に失敗しました。');
    }
  } catch (err) {
    formStatus.textContent = `⚠ ${err.message || '送信に失敗しました。時間をおいて再度お試しください。'}`;
    formStatus.classList.add('form-status--error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '送信する →';
  }
});

// ===== GSAP + Lenis アニメーション =====
(function() {
  const hasGsap = typeof gsap !== 'undefined';
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  // --- Lenis 慣性スクロール ---
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1.0 });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }

  // アンカーリンクをLenis経由で滑らかに
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.6 });
      else el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- ローダー → ヒーロー演出 ---
  function heroIntro() {
    if (!hasGsap) {
      const loader = document.getElementById('loader');
      if (loader) loader.style.display = 'none';
      document.querySelectorAll('.rv').forEach(el => {
        el.style.opacity = 1; el.style.transform = 'none';
      });
      return;
    }

    const tl = gsap.timeline();
    tl.to('#lbar', { width: '100%', duration: 0.9, ease: 'power2.inOut' })
      .to('#loader', { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' }, '+=0.15')
      // ヒーローのeyebrow
      .fromTo('.hero__eyebrow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.3')
      // タイトル各行
      .fromTo('.title-jp',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', stagger: 0.12 }, '-=0.7')
      .fromTo('.title-catch, .title-divider',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=1.2')
      // サブテキスト
      .fromTo('.hero__sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.9')
      // ボタン
      .fromTo('.hero__actions',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.8')
      // ヒーロー画像
      .fromTo('.hero__visual',
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out' }, '-=1.2')
      // 背景テキスト
      .fromTo('.hero__bg-text',
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }, '-=1.0');
  }

  if (document.readyState === 'complete') heroIntro();
  else window.addEventListener('load', heroIntro);

  if (!hasGsap) return;

  // --- ヒーローの視差（パララックス） ---
  gsap.to('.hero__bg-text', {
    yPercent: 30, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // --- 汎用リビール（.rv 要素） ---
  gsap.utils.toArray('.rv').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 46 },
      {
        opacity: 1, y: 0, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true }
      });
  });

  // --- 数字カウントアップ ---
  gsap.utils.toArray('.stat__num').forEach(el => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target)) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate() {
        el.textContent = Math.round(obj.v).toLocaleString('ja-JP');
      }
    });
  });

  // --- ハイライトカードのスタガードリビール ---
  gsap.utils.toArray('.highlight-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        delay: i * 0.15,
        scrollTrigger: { trigger: card, start: 'top 88%', once: true }
      });
  });

  // フォント読み込み後にスクロール位置を再計算
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
