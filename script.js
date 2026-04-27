import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://wkzynwhhebgrrutqfvsq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_x7wW5bd2VMRKxNpu-tbkvg_kQ55Ou4j';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const statusEl = document.getElementById('status');
const messagesEl = document.getElementById('messages');

async function loadMessages() {
  if (!statusEl || !messagesEl) return;

  const { data, error } = await supabase
    .from('messages')
    .select('content, author_name');

  if (error) {
    statusEl.textContent = `讀取失敗：${error.message}`;
    console.error(error);
    return;
  }

  renderMessages(data || []);
}

function renderMessages(messages) {
  if (!statusEl || !messagesEl) return;

  if (messages.length === 0) {
    statusEl.textContent = '目前沒有訊息。';
    messagesEl.hidden = true;
    return;
  }

  statusEl.hidden = true;
  messagesEl.hidden = false;
  messagesEl.innerHTML = messages
    .map(
      (message) =>
        `<li class="message-card"><strong>${escapeHtml(
          message.author_name || '匿名'
        )}</strong><p>${escapeHtml(message.content || '')}</p></li>`
    )
    .join('');
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

loadMessages();
