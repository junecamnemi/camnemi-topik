/* Camnemi TOPIK — AI Chat (bridge to the owner via Telegram).
   Phase A: the learner chats inside the app; messages are stored in Supabase
   (chat_messages). The owner replies in Telegram; those owner replies appear
   here as the character's bubbles (polled). Each app user is a distinct thread. */
(function () {
  let _chatTimer = null;   // owner-reply poller
  let _lastCount = 0;      // # owner messages seen (detect new replies)
  let _sending = false;

  function esc(s) { return window.esc ? window.esc(s) : String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function isAuthed() { return typeof window.isAuthed === 'function' ? window.isAuthed() : false; }
  function sb() { return (typeof window.getSupabase === 'function') ? window.getSupabase() : null; }
  function uid() { try { const s = (typeof window.getSession === 'function') ? window.getSession() : null; return s && s.user ? s.user.id : null; } catch(e){ return null; } }

  /* Which character "sends" the owner's replies → current character persona. */
  function chatPartner() {
    let c = null;
    try { if (typeof window.myChar === 'function') c = window.myChar(); } catch(e){}
    if (!c) try { c = (window.CHAR_LIST || [])[0]; } catch(e){}
    return c;
  }
  function partnerName() {
    let n = 'Glowsis';
    try { if (typeof window.myCharName === 'function') n = window.myCharName() || n; } catch(e){}
    return n;
  }
  function partnerFace() {
    const c = chatPartner(); const f = (c && c.face) ? c.face : (c && c.img ? c.img : '');
    if (f && !/^data:/.test(f)) return f;
    return '';
  }

  function viewChat() {
    if (!isAuthed()) {
      return `<div class="book-units vb-screen"><div class="bu-head"><h2>💬 Chat</h2>
        <p class="bu-sub">${window.LANG==='ko'?'로그인하면 나의 캐릭터와 대화할 수 있어요.':'Log in to chat with your character.'}</p></div>
        <div style="text-align:center;padding:20px 0;"><a class="btn btn-primary" href="login.html">${window.LANG==='ko'?'로그인 / 가입':'Log in / Sign up'}</a></div>
      </div>`;
    }
    const p = chatPartner();
    const charId = (p && p.id) ? p.id : (window.myCharId ? myCharId() : 'f-01');
    const face = partnerFace();
    const avatar = face ? `<img class="chat-head-avatar" src="${esc(face)}" alt="">` : `<div class="chat-head-avatar chat-head-emoji">${(p&&p.g)==='m'?'👦':'👧'}</div>`;
    return `
    <div class="book-units chat-screen" id="chat-screen" data-char="${esc(charId)}">
      <div class="chat-head">
        ${avatar}
        <div class="chat-head-t">
          <b>${esc(partnerName())}</b>
          <small>${window.LANG==='ko'?'지금 대화해요 💬':'Let\'s talk 💬'}</small>
        </div>
        <span class="chat-status" id="chat-status"></span>
      </div>
      <div class="chat-body" id="chat-body">
        <div class="chat-day-divider"><span>${window.LANG==='ko'?'오늘':'Today'}</span></div>
        <div class="chat-bubble chat-bot bubble-typing" id="chat-typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
      </div>
      <div class="chat-input-row">
        <input id="chat-input" class="chat-input" maxlength="500" placeholder="${window.LANG==='ko'?'메시지를 입력하세요…':'Type a message…'}"
          onkeydown="if(event.key==='Enter')sendChatMsg()">
        <button class="btn btn-primary chat-send" onclick="sendChatMsg()">➤</button>
      </div>
    </div>`;
  }

  async function loadMessages() {
    if (!isAuthed()) return;
    const client = sb(); const me = uid(); if (!client || !me) return;
    let msgs = [];
    try {
      const { data, error } = await client.from('chat_messages')
        .select('sender, body, created_at, id').eq('user_id', me)
        .order('created_at', { ascending: true }).limit(200);
      if (!error && data) msgs = data;
    } catch (e) { msgs = []; }
    renderMessages(msgs);
  }

  function renderMessages(msgs) {
    const body = $id('chat-body'); if (!body) return;
    const typing = $id('chat-typing');
    const html = msgs.map(m => {
      const mine = m.sender === 'user';
      const txt = esc(m.body).replace(/\n/g, '<br>');
      return `<div class="chat-row ${mine?'mine':'bot'}">
        <div class="chat-bubble ${mine?'bubble-mine':'bubble-bot'}">${txt}</div>
      </div>`;
    }).join('');
    // keep a greeting if thread is empty
    const greet = msgs.length === 0
      ? `<div class="chat-row bot"><div class="chat-bubble bubble-bot">${window.LANG==='ko'?'안녕! 나는 '+esc(partnerName())+'야. 뭐든 물어봐~ 💜':'Hi! I\'m '+esc(partnerName())+'. Ask me anything 💜'}</div></div>`
      : '';
    if (typing) body.innerHTML = `<div class="chat-day-divider"><span>${window.LANG==='ko'?'오늘':'Today'}</span></div>` + greet + html;
    else body.innerHTML = greet + html;
    scrollChat();
  }

  async function sendChatMsg() {
    if (_sending) return;
    const inp = $id('chat-input'); const bodyEl = $id('chat-body');
    const text = inp ? inp.value.trim() : ''; if (!text) return;
    if (!isAuthed()) { location.href = 'login.html'; return; }
    const client = sb(); const me = uid(); if (!client || !me) { alert('no session'); return; }
    const p = chatPartner();
    const charId = (p && p.id) ? p.id : 'f-01';
    _sending = true;
    // optimistic bubble
    const typing = $id('chat-typing');
    if (bodyEl && typing) typing.insertAdjacentHTML('beforebegin',
      `<div class="chat-row mine"><div class="chat-bubble bubble-mine">${esc(text).replace(/\n/g,'<br>')}</div></div>`);
    scrollChat();
    if (inp) inp.value = '';
    try {
      await client.from('chat_messages').insert({ user_id: me, sender: 'user', body: text, character_id: charId });
    } catch (e) { console.warn('chat insert', e); }
    _sending = false;
  }

  function scrollChat() { const b = $id('chat-body'); if (b) b.scrollTop = b.scrollHeight; }

  /* Poll for owner replies (relayed by the owner in Telegram → chat_messages sender='owner').
     Reload the whole thread periodically — simple and reliable at this scale. */
  async function pollReplies() {
    if (!isAuthed()) return;
    const before = _lastCount || 0;
    const client = sb(); const me = uid(); if (!client || !me) return;
    let n = 0;
    try {
      const r = await client.from('chat_messages').select('id')
        .eq('user_id', me).eq('sender', 'owner').order('created_at', { ascending: false }).limit(200);
      if (!r.error && r.data) n = r.data.length;
    } catch (e) {}
    if (n > before) {
      _lastCount = n;
      const st = $id('chat-status');
      if (st) { st.textContent = '💬'; setTimeout(()=>{ if(st) st.textContent=''; }, 2500); }
      loadMessages();
    } else if (before === 0) {
      _lastCount = n;
    }
  }

  function bindChat() {
    // load history + start polling; reset counter so we don't miss anything
    _lastCount = 0;
    loadMessages();
    if (_chatTimer) clearInterval(_chatTimer);
    _chatTimer = setInterval(pollReplies, 5000);
  }

  // stop polling when leaving chat (render() calls stopFxCycle on non-home; we stop here)
  function stopChat() { if (_chatTimer) { clearInterval(_chatTimer); _chatTimer = null; } }

  window.viewChat = viewChat;
  window.bindChat = bindChat;
  window.sendChatMsg = sendChatMsg;
  window.stopChat = stopChat;
  if (typeof window.onAuthChange === 'function') { /* no-op */ }
})();
