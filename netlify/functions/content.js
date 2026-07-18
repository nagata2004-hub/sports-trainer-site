const { getStore } = require('@netlify/blobs');

const DEBUG_MARKER = 'v2-' + Date.now();
function debugInfo() {
  return {
    _marker: DEBUG_MARKER,
    hasSiteId: !!process.env.QUIZ_SITE_ID,
    siteIdLen: (process.env.QUIZ_SITE_ID || '').length,
    hasToken: !!process.env.NETLIFY_API_TOKEN,
    tokenLen: (process.env.NETLIFY_API_TOKEN || '').length,
    hasContentKey: !!process.env.CONTENT_KEY,
    contentKeyLen: (process.env.CONTENT_KEY || '').length,
  };
}

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

// 上書きを許可するキー（管理ページで扱う4種類のみ）
const ALLOWED = ['st_news', 'st_videos', 'st_lectures', 'st_memory'];

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
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'invalid key', ...debugInfo() }) };
  }

  try {
    const store = makeStore();

    if (event.httpMethod === 'POST') {
      // 書き込みはパスワード一致が必要（管理者のみ）
      if ((params.pw || '') !== (process.env.CONTENT_KEY || '')) {
        return { statusCode: 403, headers, body: JSON.stringify({ error: 'forbidden', ...debugInfo() }) };
      }
      let data;
      try { data = JSON.parse(event.body || 'null'); } catch (_) { data = null; }
      if (!Array.isArray(data)) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'body must be an array', ...debugInfo() }) };
      }
      await store.setJSON(key, data);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, ...debugInfo() }) };
    }

    // GET: 保存済みデータを返す（無ければ data:null）
    let data = null;
    let getErr = null;
    try {
      const d = await store.get(key, { type: 'json' });
      if (Array.isArray(d)) data = d;
    } catch (e) { getErr = String(e && e.message || e); }
    return { statusCode: 200, headers, body: JSON.stringify({ data, getErr, ...debugInfo() }) };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message, ...debugInfo() }) };
  }
};
