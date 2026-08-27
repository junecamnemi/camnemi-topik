# Camnemi TOPIK Preparation

Free Korean & TOPIK preparation for Cambodian students — built on the Seoul National University curriculum (서울대 한국어 1A–6B), explained in Khmer, feeding consulting leads to the Camnemi business.

## Run locally
```bash
cd camnemi-topik
python -m http.server 8731          # then open http://127.0.0.1:8731
```

## Pages
| Page | What it does |
|---|---|
| `index.html` | Homepage, level picker, funnel |
| `curriculum.html` | 12-book × TOPIK map, live 1A/1B lessons |
| `lesson.html` | Lesson renderer (`?book=1a&lesson=1a-01`), grammar + vocab + audio |
| `level-test.html` | 12-question placement quiz → recommends book + captures lead |
| `practice.html` | TOPIK materials library (links out to official sources) |
| `topik-practice.html` | **TOPIK I practice app** — original questions w/ instant explanations (why correct, why wrong), section + difficulty filters |
| `topik-info.html` | Test structure, 2026 schedule, fees, Cambodia (CKCC + embassy) |
| `book.html` | Camnemi's book landing + pre-order form |
| `contact.html` | Consultation lead form → `topik_leads` |

## Data
- `data/lessons.js` — curriculum content (1A + 1B live, 16 lessons, 53 grammar points, 70 vocab, 60 examples). Levels 2–6 slots defined in `curriculum.js`, content "coming soon".
- `data/level-test.js` — 12 placement questions, 2 per difficulty band.
- `data/topik1-bank.js` — TOPIK I original practice bank (22 questions, listening + reading, 5 difficulty levels, each with explain + traps + tip). Built from official test pattern analysis; all original content.

## Backend (leads)
- `js/common.js` → `saveLead()` posts to Supabase `topik_leads` (REST), falls back to localStorage if unconfigured.
- `js/config.example.js` → copy to `js/config.js` and paste the Supabase anon key (public by design). LocalStorage overrides: `camnemi_topik_url`, `camnemi_topik_key`.
- Create the table:
```sql
create table public.topik_leads (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text, contact text, goal text, level text,
  message text, source text
);
alter table public.topik_leads enable row level security;
create policy "anon insert" on public.topik_leads for insert to anon with check (true);
```

## Content ownership
All lesson content, examples, and quiz questions are **original Camnemi material**. The 서울대 한국어 series is used only as a grammar-order blueprint. Past papers are linked, never republished.

## Verification
- `node verify_data.js` — data + scoring engine checks
- `node verify_links.js` — local link/asset integrity (run with the server up)
