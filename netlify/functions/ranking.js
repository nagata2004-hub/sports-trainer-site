const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const action = (event.queryStringParameters || {}).action;
  const quizId = (event.queryStringParameters || {}).quiz;
  const dataKey = quizId ? `data-${quizId}` : 'data';

  try {
    // Netlify環境では自動的にコンテキストが設定される
    const store = getStore('quiz-rankings');

    if (action === 'submit') {
      const name = ((event.queryStringParameters || {}).name || '名無し').slice(0, 30);
      const score = Math.min(100, Math.max(0, parseInt((event.queryStringParameters || {}).score) || 0));
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

    if (action === 'history') {
      const name = ((event.queryStringParameters || {}).name || '').slice(0, 30);
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
