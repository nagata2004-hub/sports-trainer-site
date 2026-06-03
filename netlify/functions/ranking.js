const { getStore } = require('@netlify/blobs');

function makeStore() {
  // 明示設定（GitHub Actions経由デプロイでも確実に動く）
  if (process.env.QUIZ_SITE_ID && process.env.NETLIFY_API_TOKEN) {
    return getStore({
      name: 'quiz-rankings',
      siteID: process.env.QUIZ_SITE_ID,
      token: process.env.NETLIFY_API_TOKEN,
    });
  }
  // フォールバック：Netlifyネイティブビルド時の自動コンテキスト
  return getStore('quiz-rankings');
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const params = event.queryStringParameters || {};
  const action = params.action;
  const quizId = params.quiz;
  const dataKey = quizId ? `data-${quizId}` : 'data';

  try {
    const store = makeStore();

    if (action === 'submit') {
      const name = (params.name || '名無し').slice(0, 30);
      const score = Math.min(100, Math.max(0, parseInt(params.score) || 0));
      const date = new Date().toLocaleString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });

      let rankings = [];
      try {
        const data = await store.get(dataKey, { type: 'json' });
        if (Array.isArray(data)) rankings = data;
      } catch (_) {}

      rankings.push({ name, score, date });
      await store.setJSON(dataKey, rankings);

      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    if (action === 'seed') {
      // 旧データの一度きり復元（空のときだけ書き込む）
      let existing = [];
      try {
        const d = await store.get(dataKey, { type: 'json' });
        if (Array.isArray(d)) existing = d;
      } catch (_) {}
      if (existing.length > 0) {
        return { statusCode: 200, headers, body: JSON.stringify({ seeded: false, reason: 'not empty', count: existing.length }) };
      }
      let incoming = [];
      try { incoming = JSON.parse(event.body || '[]'); } catch (_) {}
      if (!Array.isArray(incoming)) {
        return { statusCode: 400, headers, body: JSON.stringify({ seeded: false, reason: 'bad body' }) };
      }
      await store.setJSON(dataKey, incoming);
      return { statusCode: 200, headers, body: JSON.stringify({ seeded: true, count: incoming.length }) };
    }

    if (action === 'history') {
      const name = (params.name || '').slice(0, 30);
      let all = [];
      try {
        const data = await store.get(dataKey, { type: 'json' });
        if (Array.isArray(data)) all = data;
      } catch (_) {}

      const history = all.filter(r => r.name === name).reverse();
      return { statusCode: 200, headers, body: JSON.stringify({ history }) };
    }

    // デフォルト: ランキング取得
    let rankings = [];
    try {
      const data = await store.get(dataKey, { type: 'json' });
      if (Array.isArray(data)) rankings = data;
    } catch (_) {}

    rankings.sort((a, b) => b.score - a.score);
    return { statusCode: 200, headers, body: JSON.stringify({ rankings: rankings.slice(0, 100) }) };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
