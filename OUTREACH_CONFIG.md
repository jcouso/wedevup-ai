# OUTREACH_CONFIG

## Status
- outbound_enabled: true
- reason: dedicated wacli sender authenticated + background sync service running (`com.wacli.money-operator-sync`)

## Approved Sender (required before outbound)
- channel: whatsapp
- sender_id/number: +55 11 97316-8342 (`5511973168342@s.whatsapp.net`)
- control_method: wacli (store: `/Users/jcbot/.wacli-money-operator`)
- approved_by: Juan
- approved_at: 2026-02-12

## Safety Rules
- Never use personal number: +5511988670555
- Outreach window: Mon-Fri 09:00-18:30 (America/Sao_Paulo)
- Max new cold contacts: 10 per hour (hard limit), 30 per day
- Pace sends in small batches across the hour (no blast sends)
- Stop condition: negative signal >10% in a day (complaints, blocks, hard negative replies)

## Message Policy
- Human-like tone, localized context, no spam patterns
- Personalization required for each cold message
- Always provide opt-out language when relevant

## Current Operating Mode
- Outbound enabled with safety constraints in this file
- Keep personalization and anti-spam safeguards on every send
- Respect outreach hours and volume caps
- Pause outbound immediately if negative signal threshold is exceeded
