# WhatsApp AI Agent — Delivery Architecture

## Stack
| Component | Tool | Cost |
|---|---|---|
| WhatsApp API | Evolution API v2 (self-hosted) | R$0 (VPS cost only) |
| AI Engine | OpenAI GPT-4o-mini | ~R$0.02/conversation |
| Orchestration | Node.js custom agent | R$0 |
| Hosting | Single VPS (multiple clients) | R$50-100/mo shared |
| Database | SQLite per client (simple) | R$0 |

## Why This Stack
- **Evolution API** is the de facto standard for WhatsApp automation in Brazil. Open source, self-hosted, handles QR code auth, webhooks, message sending/receiving. No per-message cost.
- **GPT-4o-mini** is cheap enough ($0.15/1M input, $0.60/1M output) that even a busy business costs <R$5/mo in AI calls.
- **Single VPS** hosts multiple clients = margins improve with scale.

## Per-Client Cost Structure
| Item | Monthly Cost |
|---|---|
| VPS share (1 of N clients) | R$15-30 |
| OpenAI API | R$5-20 |
| Monitoring/maintenance time | ~1h = R$0 (automated) |
| **Total delivery cost** | **R$20-50/client/mo** |

## Margin Analysis
| Tier | Monthly Price | Delivery Cost | Margin | Margin % |
|---|---|---|---|---|
| Básico (R$500/mo) | R$500 | ~R$25 | R$475 | 95% |
| Profissional (R$1.000/mo) | R$1.000 | ~R$35 | R$965 | 96.5% |
| Enterprise (R$1.500/mo) | R$1.500 | ~R$50 | R$1.450 | 96.7% |

Setup fees are nearly 100% margin (time cost only, no incremental infra).

## Architecture

```
[Client's WhatsApp Number]
        ↓ (QR code scan)
[Evolution API — self-hosted]
        ↓ webhook POST
[Agent Service (Node.js)]
        ├── Load client config (system prompt, business rules, FAQs)
        ├── Conversation history (SQLite)
        ├── OpenAI chat completion
        └── Response → Evolution API → WhatsApp
```

## Multi-Tenant Design
- One Evolution API instance, multiple WhatsApp numbers (one per client).
- One Node.js agent service with config-driven behavior.
- Each client = one JSON config file. No code changes per client.
- New client onboarding: create config → scan QR → done.

## Client Config Drives Everything
- Business name, hours, timezone
- System prompt (personality, tone, knowledge)
- FAQ entries (structured)
- Appointment booking rules (if applicable)
- Escalation rules (when to hand off to human)
- Blocked topics / compliance rules

## Delivery Timeline (per client)
| Step | Time |
|---|---|
| Discovery call + brief | 30 min |
| Config creation (prompt + FAQs) | 1-2 hours |
| QR code setup + testing | 30 min |
| Client review + adjustments | 1-2 hours |
| **Total setup time** | **3-5 hours** |

At R$2.000-5.000 setup fee, that's R$400-1.600/hour effective rate.
