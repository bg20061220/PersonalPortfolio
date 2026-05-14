# Bhavya's Portfolio — The Kitchen
> Current status: Fridge component complete. Building the full kitchen scene around it.

---

## The Concept

A full kitchen scene viewed straight-on, like you're standing in the doorway. The visitor is the guest. Bhavya is the chef. His experience and projects are ingredients. Recruiters can cook a version of him tailored to their role.

Three zones across the wall: fridge on the left, cooktop in the center, corkboard on the right. Counter runs full width. Checkerboard tile floor at the bottom.

---

## Aesthetic

**Vibe**: Warm retro student apartment kitchen. Ghibli-adjacent — slightly desaturated, painterly, cozy. Not sterile, not modern, not Michelin-star.

**Colors:**
```css
--wall:         #F0EAE0;   /* warm cream */
--counter:      #8B6914;   /* worn wood */
--fridge:       #529090;   /* forest teal */
--stove:        #2A2A2A;   /* cast iron black */
--accent:       #C4572A;   /* burnt orange */
--tile-light:   #E8DDD0;   /* floor tile A */
--tile-dark:    #D4C9BC;   /* floor tile B */
--cork:         #C19A6B;   /* corkboard */
--chalk:        #F5F5DC;   /* chalk labels */
--card-bg:      #FDF6E3;   /* recipe card */
```

**Typography:**
- Display / labels: `Playfair Display`
- Body / UI: `Courier Prime`

---

## Scene Layout

Full viewport, straight-on, no scrolling.

```
┌─────────────────────────────────────────────────────────────┐
│              UPPER CABINETS  (3 doors across)               │
├──────────────────┬──────────────────┬───────────────────────┤
│                  │   RANGE HOOD     │                       │
│    FRIDGE        │                  │    CORKBOARD          │
│  (forest teal)   │    COOKTOP       │    (pinned notes)     │
│                  │   (4 burners)    │                       │
├──────────────────┴──────────────────┴───────────────────────┤
│                     COUNTER SURFACE                         │
├─────────────────────────────────────────────────────────────┤
│                  FLOOR  (checkerboard tile)                  │
└─────────────────────────────────────────────────────────────┘
```

Proportions: fridge ~30%, stove ~40%, corkboard ~30%.

---

## Status

| Component | Status | Notes |
|---|---|---|
| Fridge exterior | ✅ Done | Forest teal, 3D depth, handles, nameplate |
| Fridge main door | ✅ Done | Hinges right, swings left, rotateY(-125deg) |
| Freezer door | ✅ Done | Hinges right, swings left, rotateY(-115deg) |
| Freezer interior | ✅ Done | 3 sticky notes with fun facts |
| Fridge shelves | ✅ Done | Glass bars + labeled containers per section |
| Shelf click handlers | ✅ Done | data-section + onShelfClick() stub ready |
| Cooktop / Stove | ⬜ Not started | |
| Corkboard | ⬜ Not started | |
| Upper cabinets | ⬜ Not started | |
| Counter surface | ⬜ Not started | |
| Floor tiles | ⬜ Not started | |
| Cook Something flow | ⬜ Not started | |
| Shelf detail interaction | ⬜ Not started | Decided later |
| Page load animation | ⬜ Not started | |

---

## Component Specs

### 1. Fridge — COMPLETE
See `fridge.html` for the full implementation. Drop it into the kitchen scene as-is.

The shelf containers have `data-section` attributes and an `onShelfClick(section)` stub. Replace the stub body with the chosen interaction when decided.

**Sticky note content (freezer):**
- "National Math Scholarship 🏅"
- "Waterloo CS + Math"
- "PyPI package at 19"

**Shelf sections:**
- Experience (teal containers)
- Projects (terracotta containers)
- Skills (blue containers)
- About (mustard containers)

---

### 2. Cooktop / Stove

**Appearance:**
- Cast iron black body (`--stove`), centered zone
- Range hood above (dark metal, slight sheen via gradient)
- 4 burner rings on the surface — dark grey default, glow orange when active
- A physical dial/knob on the stove face labeled "Cook Something" in chalk font
- Small pilot light dot next to the knob (dim orange when idle, bright when active)

**Interactions:**
- Knob hover: `rotate(15deg)` turn, 0.2s
- Knob click: triggers Cook flow
- Active burners: orange `box-shadow` radial pulse, 1s loop
- Steam: 3 pseudo-elements above burners, `translateY` + `opacity` keyframe, staggered 0.3s

---

### 3. Corkboard

**Appearance:**
- Cork texture via CSS `radial-gradient` dot pattern in `--cork` tones
- 4 pinned paper notes, each slightly rotated off-axis
- Red pushpin dot at top of each note
- Small analog clock showing real time (JS `Date`, CSS hands)

**Note contents:**
- "Available for co-op — May 2026"
- GitHub: github.com/b2goel
- LinkedIn: linkedin.com/in/bhavyagoel
- Email: b2goel@uwaterloo.ca

---

### 4. Upper Cabinets

- 3 cabinet doors full width across the top
- Wood grain finish, small knobs
- Click: `rotateX(-110deg)` hinge upward, 0.5s
- Contents: easter eggs, reading list, "what I'm learning" note
- Close on outside click

---

### 5. Counter Surface

- Full-width wooden counter (`--counter`) with subtle grain gradient
- When Cook flow is active: ingredient chips appear here as draggable items
- Recipe card slides up from the counter after cooking

---

### 6. Floor

- Checkerboard tile pattern, CSS only
- Two tile colors: `--tile-light` and `--tile-dark`
- Visible at the bottom of the viewport, adds depth to the scene

---

## The Cook Something Flow

### Trigger
Click the stove dial/knob.

### Step 1 — Recipe Builder Panel
Slides up from the counter (`translateY(100%)` → `translateY(0)`, 0.4s ease-out).

Three columns:

**Base** (pick one):
| Key | Label | Description |
|---|---|---|
| `swe` | Software Engineer | Backend, APIs, search infra |
| `ml` | ML / Data | Embeddings, models, vector search |
| `devtools` | Dev Tools / Open Source | CLIs, security, DX |
| `product` | Product-minded Builder | Shipped products, user feedback loops |

**Toppings** (pick one):
| Key | Label | Description |
|---|---|---|
| `tailorcv` | TailorCV | Semantic search, FastAPI, pgvector, Cohere |
| `pipguard` | pipguard-cli | PyPI package, AST analysis, pip interceptor |
| `voicecanvas` | Voice Canvas | Next.js, Groq, Socket.IO, real-time |

**Style** (pick one):
| Key | Label |
|---|---|
| `scrappy` | Scrappy Builder |
| `security` | Security-obsessed |
| `research` | Research-focused |
| `ships` | Ships First, Iterates Fast |

---

### Step 2 — Cooking Animation
- Burners glow orange
- Steam animation starts
- Button shows "Cooking..." with spinning pan emoji

---

### Step 3 — Dish Lookup (fully hardcoded)

Lookup key: `${base}-${style}`

16 dishes total. The selected topping gets woven into the description as a specific callout.

```js
const dishes = {
  "swe-scrappy": {
    name: "Rustic Backend Stew",
    emoji: "🍲",
    description: "...",
    pairsWith: "...",
    cookTime: "..."
  },
  // ... 15 more
}
```

All 16 keys = every combination of `[swe, ml, devtools, product]` × `[scrappy, security, research, ships]`.

Write dish names, descriptions, pairsWith, and cookTime for all 16. Make names creative food metaphors that map to the role. Descriptions: punchy, technically specific, slightly funny, no corporate speak.

---

### Step 4 — Recipe Card

Slides up from counter, settles at `rotate(1.5deg)`:
- Cream background (`--card-bg`)
- Torn top edge via `clip-path`
- Large dish name in Playfair Display
- Emoji centered above name
- Description in Courier Prime
- "Pairs with:" and "Cook time:" label rows
- "📋 Copy" button — copies plaintext to clipboard
- "🔄 Cook Again" — resets flow

---

## Bhavya's Content

### Experience
- SWE track — backend systems, APIs, search infrastructure
- ML / Data track — embeddings, models, vector search
- Open Source / Dev Tools — CLIs, security, developer experience
- Product-minded builder — shipped products, user feedback loops

### Projects
- **TailorCV** — Semantic search resume tailor. FastAPI + pgvector + Cohere API. Hosted on Render + Vercel. Cold-start handled via FastAPI lifespan context manager scheduled restart.
- **pipguard-cli** — Python package security CLI on PyPI. Intercepts `pip install`, runs trust signal checks and AST-based static analysis. Download-weighted risk scoring.
- **Voice Canvas** — Real-time AI agent UI builder. Next.js frontend, Groq for inference, Socket.IO for live state.

### Skills
Python, FastAPI, PostgreSQL, pgvector, Next.js, TypeScript, C, Linux, Docker, Git, Cohere API, REST APIs

### Freezer (fun facts)
- National Math Scholarship
- Waterloo CS + Math double degree
- Published a PyPI package at 19

### Things That Didn't Make It (back of fridge — future)
- Hackathon project — ran out of time
- ML model that never converged
- App idea with no users

Style as faded, greyed-out containers with a small red expiry date stamp.

---

## File Structure

```
/portfolio
  index.html       ← full kitchen scene
  style.css        ← all styles, CSS variables at top
  script.js        ← interactions, Cook flow, clock
  /components
    fridge.html    ← ✅ complete, paste into index.html
```

No npm, no build step. Open `index.html` in browser and it works.

---

## Build Order for Claude Code

1. `index.html` — full kitchen scene structure, all three zones, counter, floor
2. `style.css` — CSS variables, scene layout, wall/floor/counter textures
3. Drop in fridge component from `fridge.html`
4. Build corkboard with working clock
5. Build cooktop / stove appearance
6. Wire up Cook flow — builder panel, dish lookup, recipe card
7. Build upper cabinets
8. Page load animation — staggered fade-in per zone
9. Polish — steam, burner glow, knob hover, handle glints

---

## Notes

- Fridge is the hero. Everything else supports it.
- Cook flow is the memorable moment. Nail the recipe card output.
- Desktop only for now. Don't break mobile but don't optimize for it.
- No external image files — all visuals are CSS.
- Mark placeholder content with `<!-- TODO: real content -->`.