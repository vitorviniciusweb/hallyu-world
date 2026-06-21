const http = require('http');
const fs   = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 3000;

// ── HTTP: serve index.html ──────────────────────────────
const server = http.createServer((req, res) => {
  if (req.method !== 'GET') { res.writeHead(405); res.end(); return; }
  fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

// ── WebSocket ───────────────────────────────────────────
const wss = new WebSocketServer({ server });

// players: id → { id, ws, isAlive, avatar, x, y, dir, moving, frame }
const players = new Map();
const MAX_PLAYERS = 50;

function broadcast(payload, excludeId) {
  const msg = JSON.stringify(payload);
  for (const [id, p] of players) {
    if (id !== excludeId && p.ws.readyState === 1) p.ws.send(msg);
  }
}

function sanitizeText(v) {
  return String(v ?? '').replace(/[<>]/g, '').slice(0, 120);
}

function sanitizeAvatar(av) {
  if (!av || typeof av !== 'object') return null;
  return {
    name:      sanitizeText(av.name) || 'Idol',
    skin:      Number(av.skin)      % 6,
    hairShape: Number(av.hairShape) % 4,
    hairColor: Number(av.hairColor) % 6,
    eyes:      Number(av.eyes)      % 4,
    outfit:    Number(av.outfit)    % 2,
  };
}

wss.on('connection', (ws) => {
  if (players.size >= MAX_PLAYERS) {
    ws.close(1008, 'Server full');
    return;
  }

  const id = randomUUID();
  ws.isAlive = true;
  players.set(id, { id, ws, isAlive: true, avatar: null, x: 304, y: 144, dir: 0, moving: false, frame: 0 });

  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (data, isBinary) => {
    if (isBinary || data.length > 1024) return;

    let msg;
    try { msg = JSON.parse(data); } catch { return; }

    const p = players.get(id);
    if (!p) return;

    switch (msg.type) {

      case 'join': {
        const avatar = sanitizeAvatar(msg.avatar);
        if (!avatar) return;
        p.avatar  = avatar;
        p.x       = Number(msg.x) || 304;
        p.y       = Number(msg.y) || 144;
        p.dir     = Number(msg.dir) || 0;

        // snapshot of everyone already online
        const snapshot = {};
        for (const [pid, other] of players) {
          if (pid !== id && other.avatar) {
            snapshot[pid] = { id: pid, avatar: other.avatar, x: other.x, y: other.y, dir: other.dir, moving: other.moving, frame: other.frame };
          }
        }
        ws.send(JSON.stringify({ type: 'init', id, players: snapshot }));

        // announce to everyone else
        broadcast({ type: 'join', id, avatar: p.avatar, x: p.x, y: p.y, dir: p.dir }, id);
        console.log(`[+] ${avatar.name} (${id.slice(0,8)}) — ${players.size} online`);
        break;
      }

      case 'move': {
        p.x      = Number(msg.x)      || p.x;
        p.y      = Number(msg.y)      || p.y;
        p.dir    = Number(msg.dir)    || 0;
        p.moving = Boolean(msg.moving);
        p.frame  = Number(msg.frame)  || 0;
        broadcast({ type: 'state', id, x: p.x, y: p.y, dir: p.dir, moving: p.moving, frame: p.frame }, id);
        break;
      }

      case 'chat': {
        if (!p.avatar) return;
        const text = sanitizeText(msg.text);
        if (!text) return;
        broadcast({ type: 'chat', id, name: p.avatar.name, text }, id);
        break;
      }
    }
  });

  ws.on('close', () => {
    const name = players.get(id)?.avatar?.name ?? '?';
    players.delete(id);
    broadcast({ type: 'leave', id });
    console.log(`[-] ${name} (${id.slice(0,8)}) — ${players.size} online`);
  });

  ws.on('error', () => {});
});

// ── Heartbeat: remove conexões mortas ──────────────────
setInterval(() => {
  for (const [id, p] of players) {
    if (!p.isAlive) { p.ws.terminate(); players.delete(id); continue; }
    p.isAlive = false;
    p.ws.ping();
  }
}, 30_000);

server.listen(PORT, () => {
  console.log(`Hallyu World rodando em http://localhost:${PORT}`);
});
