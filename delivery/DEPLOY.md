# Deployment Guide — WhatsApp AI Agent

## Prerequisites
- VPS with Node.js 20+ (DigitalOcean/Hetzner/Contabo, R$30-60/mo)
- Docker (for Evolution API)
- OpenAI API key

## Step 1: Deploy Evolution API

```bash
# Docker Compose (simplest)
docker run -d \
  --name evolution-api \
  -p 8080:8080 \
  -e AUTHENTICATION_API_KEY=your-secure-key \
  atendai/evolution-api:latest
```

Full docker-compose.yml with postgres for production:
→ https://doc.evolution-api.com/v2/pt/get-started/docker

## Step 2: Deploy Agent Service

```bash
cd delivery/agent
cp .env.example .env
# Fill in EVOLUTION_API_URL, EVOLUTION_API_KEY, OPENAI_API_KEY
npm install
npm start
```

For production: use PM2 or systemd.

```bash
npm install -g pm2
pm2 start src/index.js --name whatsapp-agent
pm2 save
pm2 startup
```

## Step 3: Connect Client's WhatsApp

1. Create Evolution API instance:
```bash
curl -X POST http://localhost:8080/instance/create \
  -H "Content-Type: application/json" \
  -H "apikey: your-secure-key" \
  -d '{"instanceName": "client-id", "integration": "WHATSAPP-BAILEYS"}'
```

2. Get QR code:
```bash
curl http://localhost:8080/instance/connect/client-id \
  -H "apikey: your-secure-key"
```

3. Client scans QR code with their WhatsApp Business.

4. Set webhook:
```bash
curl -X POST http://localhost:8080/webhook/set/client-id \
  -H "Content-Type: application/json" \
  -H "apikey: your-secure-key" \
  -d '{"url": "http://localhost:3100/webhook/client-id", "events": ["MESSAGES_UPSERT"]}'
```

## Step 4: Add Client Config

1. Copy `configs/template.json` → `configs/client-id.json`
2. Fill in business details, services, FAQs
3. Restart agent (or it hot-reloads)

## New Client Checklist
- [ ] Discovery call done, brief collected
- [ ] Config JSON created with services, FAQs, prompt
- [ ] Evolution instance created
- [ ] QR code scanned by client
- [ ] Webhook configured
- [ ] Test conversation verified
- [ ] Client approved behavior
- [ ] Billing setup (invoice sent)

## Cost per Client (Monthly)
| Item | Cost |
|---|---|
| VPS share | R$15-30 |
| OpenAI API | R$5-20 |
| **Total** | **R$20-50** |

Versus monthly price R$500-1.500 = **90-97% margins**.
