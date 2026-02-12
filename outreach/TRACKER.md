# Outreach Tracker

## Pipeline Summary (as of 2026-02-12 17:52 BRT)

- **Touch 1 sent:** 25/25 + 5 batch 2 = 30 outbound
- **Inbound leads:** 1 (Fogaça — DECLINED, illegal segment)
- **Human replies:** 5 outbound (Kimiko ✅ DEMO SENT, Zimmermann ✅ DEMO SENT, TK Garage ✅ engaged, CrossFit ❌ rejected, Zay ❌ rejected)
- **Bot auto-replies:** 6 (Apeles, Osteofit, Fisioluque, Sampa Tattoo, RP Auto, Topázio)
- **No response yet:** 17 (12 batch 1 + 3 batch 2 + 2 B2-B3)
- **Reply rate (human, outbound only):** 17% (5/30)
- **Active conversations:** 3 (Kimiko presenting to owner, TK Garage probing pain, Zimmermann waiting on Bruno — all wait state)
- **Rejections/Declined:** 3 (CrossFit, Zay, Fogaça illegal)
- **Touch 2 due:** Monday Feb 16 (for non-responders)
- **Fri 10:00:** Kimiko follow-up if owner hasn't responded
- **Agent configs pre-built:** kimiko-auto-center.json, zimmermann-imoveis.json

## Active Conversations

### Zimmermann Imóveis (C7) — 🔥 HOT (NEW)
- **JID:** 256594449281064@lid (business account)
- **DM JID:** 5511999990938@s.whatsapp.net
- **Segment:** Imobiliária
- **Touch 1:** 2026-02-12 13:54 — hook about 12k imóveis + WhatsApp volume
- **Their reply 1:** 2026-02-12 15:51 — Vanessa (atendente) replied warmly, routed us to bruno@zimoveis.com.br
- **Our reply 1:** 2026-02-12 15:55 — thanked Vanessa, confirmed email to Bruno
- **Our reply 2:** 2026-02-12 15:58 — sent personalized demo link for Zimmermann
- **Email to Bruno:** drafted + sent via macOS mail (deliverability uncertain)
- **Demo URL:** https://jcouso.github.io/wedevup-ai/demo/zimmermann-imoveis.html
- **Vanessa reply 2:** 2026-02-12 16:07 — "Agradeço Sr. Juan." (polite ack, positive tone)
- **Status:** DEMO_SENT — awaiting Bruno's response (decision-maker). Vanessa is champion/gatekeeper.
- **Agent config pre-built:** `delivery/configs/zimmermann-imoveis.json` (ready to deploy on close)
- **Next:** Wait for Bruno's response. If silent >48h, light WhatsApp follow-up to Vanessa asking if Bruno saw the demo.

### ~~Fogaça (INBOUND) — DECLINED~~ (moved to Closed)
- **JID:** 237872737193985@lid
- **Segment:** Illegal (casa de prostituição)
- **Source:** Inbound
- **Status:** DECLINED — politely declined, illegal segment. Moved to Closed table.

### TK Garage (B1) — 🟡 WARM
- **JID:** 56156764504174@lid / 5511953949770@s.whatsapp.net
- **Segment:** Auto/Oficina
- **Touch 1:** 2026-02-12 17:10 — hook about 50 years, WhatsApp orçamentos, losing leads after hours
- **Their reply 1:** 2026-02-12 17:10 — "Consigo" (can handle it)
- **Their reply 2:** 2026-02-12 17:11 — "10 -2" (likely CB shorthand "roger" or hours)
- **Our follow-up 1:** 2026-02-12 17:26 — pivoted to after-hours angle ("noite e fim de semana")
- **Status:** IN CONVERSATION — they say they handle it; probing after-hours pain now.
- **Next:** If they confirm after-hours pain → offer example. If not → respect and move on.

### Kimiko Auto Center (C23) — 🔥 HOT
- **JID:** 225623406567568@lid (business account)
- **DM JID:** 5511955866874@s.whatsapp.net
- **Segment:** Auto Center
- **Touch 1:** 2026-02-12 14:42 — hook about WhatsApp volume
- **Their reply 1:** 2026-02-12 14:47 — "boa tarde sim" + "rerecebemos" (human, engaged)
- **Our follow-up 1:** 2026-02-12 ~15:00 — explained AI assistant concept, asked to show example
- **Their reply 2:** 2026-02-12 15:00 — "pode" (= go ahead, show me)
- **Our follow-up 2:** 2026-02-12 15:08 — detailed auto-center-specific scenario (troca de óleo, agendamento 24h), offered personalized demo
- **Their reply 3:** 2026-02-12 15:10 — "manda que eu apresento para o dono aqui, tem algum problema? nao vou atrapalhar?" — WANTS TO PRESENT TO OWNER (decision-maker)
- **Our follow-up 3:** 2026-02-12 15:22 — sent personalized demo page: https://jcouso.github.io/wedevup-ai/demo/kimiko-auto-center.html + reassured them
- **Demo URL:** https://jcouso.github.io/wedevup-ai/demo/kimiko-auto-center.html
- **Status:** DEMO_SENT — lead presenting to decision-maker (owner). Strong buying signal.
- **Agent config pre-built:** `delivery/configs/kimiko-auto-center.json` (ready to deploy on close)
- **Next:** Wait for owner feedback. If positive → schedule quick call or close directly. If silent >24h, light follow-up Fri.

## Closed / Rejected

| # | Business | Reason | Date |
|---|---|---|---|
| C20 | CrossFit Juntos | "não temos interesse no momento" (explicit rejection) | 2026-02-12 14:46 |
| C3 | Zay Estética | "No momento não temos interesse. Mas vamos armazenar o seu contato" (polite rejection via @lid bot→human) | 2026-02-12 15:10 |

## All Prospects — Touch 1 Status

| # | Business | Segment | JID | Sent | Human Reply | Bot Reply | Status |
|---|---|---|---|---|---|---|---|
| C1 | Palladium Estética | Estética | 5511933365050 | 13:52 + 14:53 (dup) | - | - | awaiting |
| C2 | Clinic Biomedicina | Estética | 5511973469977 | 13:52 + 14:54 (dup) | - | - | awaiting |
| C3 | Zay Estética | Estética | 5511962296053 | 13:52 + 14:55 (dup) | ❌ rejected | ✅ menu bot → human rejection | **CLOSED** |
| C4 | Lia Capez | Estética | 5511958315602 | 13:53 + 14:56 (dup) | - | - | awaiting |
| C5 | Odontologia Apeles | Odonto | 5511946240000 | 13:53 + 14:57 (dup) | - | ✅ "Renata" bot | awaiting |
| C6 | Nova São Paulo | Imobiliária | 5511974892840 | 13:54 | - | - | awaiting |
| C7 | Zimmermann | Imobiliária | 5511999990938 / 256594449281064@lid | 13:54 | ✅ Vanessa (routed to Bruno) | - | **IN CONVERSATION** |
| C8 | Clivet | Pet/Vet | 5511947074477 | 14:08 | - | - | awaiting |
| C9 | Pet Paulista | Pet Shop | 5511989835009 | 13:54 | - | - | awaiting |
| C10 | Studio Sol | Pilates/Fisio | 5511976242729 | 13:54 | - | - | awaiting |
| C11 | Osteofit | Fisioterapia | 5511975780333 | 14:08 | - | ✅ welcome bot | awaiting |
| C12 | La Posture | Pilates/Fisio | 5511983881103 | 14:09 | - | - | awaiting |
| C13 | Fisioluque | Fisioterapia | 551121933583 | 14:09 | - | ✅ welcome bot | awaiting |
| C14 | 90 Graus | Restaurante | 551129247000 | 14:09 | - | - | awaiting |
| C15 | Sister's Depilação | Salão | 5511976401127 | 14:26 | - | - | awaiting |
| C16 | Na Garagem | Restaurante | 5511972377047 | 14:26 | - | - | awaiting |
| C17 | Dra. Natalia Cymrot | Dermato | 5511993860675 | 14:26 | - | - | awaiting |
| C18 | Dra. Paula Sanchez | Dermato | 5511950704134 | 14:27 | - | - | awaiting |
| C19 | Top Style Idiomas | Educação | 5511966030590 | 14:27 | - | - | awaiting |
| C20 | CrossFit Juntos | CrossFit | 5511999475785 | 14:41 | ❌ rejected | - | **CLOSED** |
| C21 | SP Barbearia | Barbearia | 5511937594342 | 14:41 | - | - | awaiting |
| C22 | Estima Nutrição | Nutrição | 5511918939915 | 14:42 | - | - | awaiting |
| C23 | Kimiko Auto Center | Auto | 5511955866874 | 14:42 | ✅ engaged | - | **IN CONVERSATION** |
| C24 | Tattoo Art Studio | Tatuagem | 5511995009262 | 14:42 | - | - | awaiting |
| C25 | Sampa Tattoo | Tatuagem | 5511995832163 | 14:43 | - | ✅ bot | awaiting |

## A/B Test Notes
- C1-C14 (batch 1-2): longer format with context + demo link
- C15-C25 (batch 3-4): hook-first, 2-3 lines, question only
- CrossFit rejection was hook-first format. Kimiko engagement was also hook-first.
- Too early to draw conclusions; need more data from Touch 2.

## Follow-up Schedule
- **Mon Feb 16:** Touch 2 for all non-responders (18 prospects)
- Touch 2 copy: personalized based on bot/no-reply status
- For 4 bot-reply prospects: "upgrade from basic bot" angle
- For 14 no-reply: "quick follow-up" with demo link

## Batch 2 — Auto Centers (sent 2026-02-12 ~17:10 BRT)

| # | Business | Segment | JID | Sent | Human Reply | Bot Reply | Status |
|---|---|---|---|---|---|---|---|
| B1 | TK Garage | Auto/Oficina | 5511953949770 | 17:10 | ✅ "Consigo" + "10 -2" | - | **IN CONVERSATION** |
| B2 | Auto Mecânica do Vale | Auto/Oficina | 5511996092267 | 17:10 | - | - | awaiting |
| B3 | Cartec Mecânica | Auto/Oficina | 5511947734897 | 17:11 | - | - | awaiting |
| B4 | RP Auto | Auto/Oficina | 5511934990116 | 17:39 | - | ✅ welcome bot ("agradece seu contato") | awaiting |
| B5 | Topázio Car Service | Auto/Oficina | 5511996062304 | 17:40 | - | ✅ welcome bot ("Cristiano agradece seu contato") | awaiting |

**Message style:** Hook-first, personalized, question-only. No links, no pitch, no pricing.
**Touch 2 due:** Monday Feb 16 (if no reply by then)
**Remaining batch 2 prospects (B6-B8 imobiliárias):** scheduled for Monday Feb 16 alongside Touch 2

## Inbound Leads

| # | Name | JID | Source | First Contact | Segment | Status |
|---|---|---|---|---|---|---|
| IN1 | Fogaça | 237872737193985@lid | Inbound (demo link) | 2026-02-12 17:15 | Illegal (casa de prostituição) | **DECLINED** — politely declined, illegal segment |

## Pipeline Summary Update (as of 2026-02-12 17:25 BRT)
- **Total touched:** 28 outbound + 1 inbound = 29
- **Hot leads:** 2 (Kimiko, Zimmermann)
- **Warm leads:** 1 (TK Garage)
- **Awaiting reply:** 17 (14 batch 1 + 2 batch 2)
- **Bot auto-replies:** 4
- **Rejections:** 2
- **Active conversations:** 4

## Duplicate Send Note
- C1-C5 received a second slightly different message ~1hr after first (operator error)
- Messages were different enough (shorter hook-first vs longer pitch) to look like a follow-up
- No negative signals received from these 5 — monitoring
