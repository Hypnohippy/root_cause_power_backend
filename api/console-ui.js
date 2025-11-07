// api/console.js
export default function handler(req, res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Root Health – Console</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body {
      min-height: 100vh;
      background: radial-gradient(circle at top, #020617 0%, #020617 40%, #000 100%);
      font-family: 'Inter', sans-serif;
      color: #e2e8f0;
      margin: 0;
      padding: 80px 20px 20px;
    }
    .top-bar {
      position: fixed;
      top: 16px;
      left: 16px;
      right: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: linear-gradient(120deg, rgba(2,6,23,0.25), rgba(2,6,23,0.05));
      border: 1px solid rgba(148, 163, 184, 0.2);
      backdrop-filter: blur(16px);
      border-radius: 16px;
    }
    .brand { display: flex; gap: 10px; align-items: center; }
    .brand .dot { width: 10px; height: 10px; background: radial-gradient(circle, #38bdf8, #0f172a); border-radius: 9999px; box-shadow: 0 0 10px rgba(56,189,248,0.7); }
    .layout {
      display: grid;
      grid-template-columns: 1.1fr 1.1fr 0.9fr;
      gap: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .panel {
      background: linear-gradient(120deg, rgba(2,6,23,0.25), rgba(2,6,23,0.05));
      border: 1px solid rgba(148, 163, 184, 0.2);
      backdrop-filter: blur(16px);
      border-radius: 16px;
      min-height: 360px;
      padding: 18px 16px 16px;
    }
    .subtle { color: #94a3b8; font-size: 0.75rem; margin-bottom: 16px; }
    .coach-body { display: flex; flex-direction: column; gap: 10px; }
    .message {
      background: rgba(15, 23, 42, 0.25);
      border: 1px solid rgba(148,163,184,0.08);
      border-radius: 14px;
      padding: 10px 12px;
      font-size: 0.78rem;
    }
    .input {
      background: rgba(15, 23, 42, 0.18);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 14px;
      color: #e2e8f0;
      min-height: 70px;
      padding: 8px 10px;
    }
    button {
      background: linear-gradient(135deg, #38bdf8, #0f172a);
      border: none;
      color: #e2e8f0;
      border-radius: 12px;
      padding: 8px 16px;
      font-weight: 500;
      cursor: pointer;
    }
    .feed { display: flex; flex-direction: column; gap: 10px; }
    .feed-card {
      background: rgba(2,6,23,0.22);
      border: 1px solid rgba(148, 163, 184, 0.08);
      border-radius: 14px;
      padding: 10px 12px;
    }
    form { display: flex; flex-direction: column; gap: 10px; }
    form input, form select {
      background: rgba(15, 23, 42, 0.12);
      border: 1px solid rgba(148, 163, 184, 0.12);
      border-radius: 10px;
      padding: 6px 8px;
      color: #e2e8f0;
    }
    @media (max-width: 980px) {
      .layout { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header class="top-bar">
    <div class="brand">
      <span class="dot"></span>
      <span>Root Health Console</span>
    </div>
  </header>
  <main class="layout" style="margin-top: 70px;">
    <section class="panel">
      <h2>Coach David</h2>
      <p class="subtle">Conversational coach. 1 free tester per user.</p>
      <div class="coach-body">
        <div class="message">Hey David, ready when you are. What’s coming up today?</div>
        <textarea class="input" placeholder="Type a message…"></textarea>
        <button>Send to Coach</button>
      </div>
    </section>
    <section class="panel">
      <h2>Activity Feed</h2>
      <div class="feed">
        <div class="feed-card">
          <h3>Reddit – wellbeinguk</h3>
          <p>“Any app for tiny routines? Everything feels too big atm.”</p>
          <button>Approve draft & send</button>
        </div>
      </div>
    </section>
    <section class="panel">
      <h2>Introducer / Campaign Capture</h2>
      <p class="subtle">Store interest from micro-campaigns or free glass users.</p>
      <form action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
        <label>Name <input name="name" required /></label>
        <label>Email <input type="email" name="email" required /></label>
        <label>
          What are you interested in?
          <select name="interest">
            <option value="coach-david">Coach David</option>
            <option value="introducer">Introducer programme</option>
            <option value="root-pulse">Content automation</option>
            <option value="glass-product">Free glass product</option>
          </select>
        </label>
        <input type="hidden" name="source" value="root-health-console" />
        <button type="submit">Save to campaigns</button>
      </form>
    </section>
  </main>
</body>
</html>`;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
