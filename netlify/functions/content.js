const { getStore } = require('@netlify/blobs');

function makeStore() {
  if (process.env.QUIZ_SITE_ID && process.env.NETLIFY_API_TOKEN) {
    return getStore({
      name: 'site-content',
      siteID: process.env.QUIZ_SITE_ID,
      token: process.env.NETLIFY_API_TOKEN,
    });
  }
  return getStore('site-content');
}

// 上書きを許可するキー（管理ページで扱うもののみ）
// st_settings のみオブジェクト（{ members: 14 } など）、他は配列
const ALLOWED = ['st_news', 'st_videos', 'st_lectures', 'st_memory', 'st_settings'];

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
  const key = params.key;

  if (!ALLOWED.includes(key)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'invalid key' }) };
  }

  try {
    const store = makeStore();

    if (event.httpMethod === 'POST') {
      // 書き込みはパスワード一致が必要（管理者のみ）
      if ((params.pw || '') !== (process.env.CONTENT_KEY || '')) {
        return { statusCode: 403, headers, body: JSON.stringify({ error: 'forbidden' }) };
      }
      let data;
      try { data = JSON.parse(event.body || 'null'); } catch (_) { data = null; }
      const valid = key === 'st_settings'
        ? (data && typeof data === 'object' && !Array.isArray(data))
        : Array.isArray(data);
      if (!valid) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'invalid body' }) };
      }
      await store.setJSON(key, data);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    // GET: 保存済みデータを返す（無ければ data:null）
    let data = null;
    try {
      const d = await store.get(key, { type: 'json' });
      if (key === 'st_settings' ? (d && typeof d === 'object') : Array.isArray(d)) data = d;
    } catch (_) {}
    return { statusCode: 200, headers, body: JSON.stringify({ data }) };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
