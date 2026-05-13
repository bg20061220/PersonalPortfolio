# Bhavya's Portfolio — The Kitchen
> Prompt for Claude Code. Execute top to bottom. Ask no clarifying questions — make decisions and build.

---

## Project Overview

Build a personal portfolio website themed as a **retro kitchen scene**. The visitor stands in a doorway looking straight at the kitchen wall. Everything is interactive. The metaphor: Bhavya is the chef, his skills and experience are ingredients, and recruiters can "cook" a version of him tailored to their role.

---

## Tech Stack

- Pure HTML + CSS + Vanilla JS — no frameworks, no build step
- Single `index.html` with linked `style.css` and `script.js`
- CSS custom properties for all colors and spacing
- CSS 3D transforms for all depth and animation (no Three.js)
- Google Fonts via CDN
- All visuals are CSS-drawn — no external image files needed

---

## Aesthetic Direction

**Vibe**: Warm retro student apartment kitchen. Lived-in, charming, slightly chaotic. Not sterile, not modern, not Michelin-star. The kind of kitchen where someone actually cooks.

**Colors:**
```css
--wall:        #F5F0E8;   /* warm cream */
--counter:     #8B6914;   /* worn wood */
--fridge:      #7B9E6B;   /* avocado green */
--stove:       #2A2A2A;   /* cast iron black */
--accent:      #C4572A;   /* burnt orange */
--tile-light:  #E8DDD0;   /* floor tile A */
--tile-dark:   #D4C9BC;   /* floor tile B */
--cork:        #C19A6B;   /* corkboard */
--chalk:       #F5F5DC;   /* chalk labels */
--card-bg:     #FDF6E3;   /* recipe card */
```

**Typography:**
- Display / labels: `Playfair Display` (serif)
- Body / UI: `Courier Prime` (monospace)
- Import both from Google Fonts

**Textures (CSS only):**
- Wall: subtle noise via `repeating-linear-gradient`
- Floor: checkerboard tile via CSS `background`
- Counter: wood grain via layered `linear-gradient`
- Corkboard: dot pattern via `radial-gradient`
- Recipe card: aged paper feel, torn edge via `clip-path`

---

## Scene Layout

Full viewport, straight-on view. No scrolling on the main scene.

```
┌─────────────────────────────────────────────────────────────┐
│              UPPER CABINETS  (3 doors across)               │
├──────────────────┬──────────────────┬───────────────────────┤
│                  │   RANGE HOOD     │                       │
│    FRIDGE        │                  │    CORKBOARD          │
│  (avocado green) │    COOKTOP       │    (pinned notes)     │
│                  │   (4 burners)    │                       │
├──────────────────┴──────────────────┴───────────────────────┤
│                     COUNTER SURFACE                         │
├─────────────────────────────────────────────────────────────┤
│                  FLOOR  (checkerboard tile)                  │
└─────────────────────────────────────────────────────────────┘
```

Proportions: fridge ~30%, stove ~40%, corkboard ~30%.

---

## Component Specifications

### 1. The Fridge

**Appearance:**
- Avocado green body (`--fridge`), rounded corners (`border-radius: 12px`)
- Subtle 3D depth via layered `box-shadow`
- Chrome handle on the right side (CSS rectangle + highlight)
- Small Bhavya nameplate on the door (chalk font)

**Interactions:**
- Hover: handle glints (brightness filter pulse, 0.3s)
- Click: door swings open — `rotateY(-120deg)`, `transform-origin: left center`, `perspective: 1200px` on parent, `transition: 0.6s ease-in-out`
- Interior has a cooler light tone (`#E8F4F8` background) to feel refrigerated

**Interior shelves (visible when open):**

| Shelf | Label | Contents |
|---|---|---|
| Top | Experience | Labeled tupperware containers, one per role |
| Middle | Projects | Leftover containers (slightly messy) |
| Crisper drawer | Skills | Small item icons with tech stack names |
| Door top | About Me | Sauce bottle |
| Door bottom | Contact | Condiment jars |
| Back wall | Things That Didn't Make It | Slightly expired items, muted colors, small expiry dates |

Each item is clickable and opens a **detail drawer** that slides in from the right with full content. Drawer closes on outside click or X button. Door swings back shut when drawer closes.

---

### 2. The Cooktop / Stove

**Appearance:**
- Cast iron black body (`--stove`)
- 4 burner rings on the surface — dark grey by default
- Range hood above (dark metal, slight sheen)
- A physical **dial/knob** on the stove face labeled "Cook Something" in chalk font
- Small pilot light dot next to the knob (dim orange when idle)

**Interactions:**
- Knob hover: slight `rotate(15deg)` turn
- Knob click: triggers Cook flow (see below), burners activate
- Active burners: orange glow (`--accent`) via `box-shadow` pulse animation
- Steam: 3 CSS pseudo-elements above the burners, `translateY` + `opacity` keyframe loop, staggered 0.3s apart

---

### 3. The Corkboard

**Appearance:**
- Cork texture background (CSS `radial-gradient` dot pattern in `--cork` tones)
- 4–5 pinned paper notes, each slightly rotated off-axis (`rotate(−2deg)` to `rotate(3deg)`)
- Notes have a paper texture, subtle drop shadow, pushpin at top (CSS circle)

**Note contents:**
- "Available for co-op — May 2026"
- GitHub: github.com/bhavya
- LinkedIn: linkedin.com/in/bhavya
- Email: b@email.com
- A small analog clock showing real time (JS `Date`, CSS clock hands)

Notes are clickable where relevant (links open in new tab).

---

### 4. Upper Cabinets

- 3 cabinet doors across the full width
- Wood grain finish, small knobs
- Click to open: `rotateX(-110deg)`, `transform-origin: top center`
- Contents (easter eggs / extras): reading list, fun facts, a "what I'm learning" note
- Close on outside click

---

### 5. Counter Surface

- Full-width wooden counter (`--counter`) with subtle grain
- When Cook flow is active, selected ingredient chips appear here
- Recipe card plates here after cooking (slides up from counter)

---

## The Cook Something Flow

### Step 1 — Builder Panel
On knob click, a **recipe builder panel** slides up from the counter (`translateY(100%)` → `translateY(0)`, 0.4s ease-out).

Panel has 3 columns:

**Base** (pick one — radio cards):
- `swe` — Software Engineer *(backend, APIs, search infra)*
- `ml` — ML / Data *(embeddings, models, vector search)*
- `devtools` — Dev Tools / Open Source *(CLIs, security, DX)*
- `product` — Product-minded Builder *(shipped products, user loops)*

**Toppings** (pick one — checkbox cards, max 1 for simplicity):
- `tailorcv` — TailorCV *(semantic search, FastAPI, pgvector, Cohere)*
- `pipguard` — pipguard-cli *(PyPI package, AST analysis, pip interceptor)*
- `voicecanvas` — Voice Canvas *(Next.js, Groq, Socket.IO, real-time)*

**Style** (pick one — radio cards):
- `scrappy` — Scrappy Builder
- `security` — Security-obsessed
- `research` — Research-focused
- `ships` — Ships First, Iterates Fast

A large "🔥 Cook" button at the bottom, disabled until Base and Style are selected.

---

### Step 2 — Cooking Animation
On Cook click:
1. Burners glow orange
2. Steam animation starts
3. Button becomes "Cooking..." with spinning pan emoji (CSS `rotate` keyframe)
4. 1.2s fake delay, then dish lookup

---

### Step 3 — Dish Lookup (hardcoded)

Lookup key: `${base}-${style}`

All 16 dishes hardcoded in `script.js` as a `const dishes` object. The selected topping gets folded into the description as a specific example callout.

**Data shape:**
```js
const dishes = {
  "swe-scrappy": {
    name: "Rustic Backend Stew",
    emoji: "🍲",
    description: "The kind of engineer who will own the whole stack before lunch and have opinions about your indexing strategy by EOD. Shipped TailorCV's search backend on a free tier and made it work anyway.",
    pairsWith: "Early-stage teams who need someone to own infra and product simultaneously",
    cookTime: "1 sprint to full speed"
  },
  "swe-security": {
    name: "Hardened Cast Iron Soup",
    emoji: "🛡️",
    description: "...",
    pairsWith: "...",
    cookTime: "..."
  },
  // ... all 16 combinations
}
```

Write all 16 dishes. Make the names creative food-metaphors. Descriptions should be punchy, technically specific, slightly funny, no corporate speak. First or third person both fine, stay consistent per dish.

The 16 keys are every combination of:
- Bases: `swe`, `ml`, `devtools`, `product`
- Styles: `scrappy`, `security`, `research`, `ships`

---

### Step 4 — Recipe Card

After lookup, a **recipe card** slides up from the counter and settles at a slight tilt (`rotate(1.5deg)`):

- Cream background (`--card-bg`)
- Torn top edge via `clip-path: polygon(...)`
- Large dish name in Playfair Display
- Emoji centered above the name
- Description paragraph in Courier Prime
- Two small label rows: "Pairs with:" and "Cook time:"
- Divider lines styled like a real recipe card
- "📋 Copy" button — copies a clean plaintext version to clipboard
- "🔄 Cook Again" button — resets the flow, panel slides back up

---

## Animations Checklist

| Element | Animation | Duration |
|---|---|---|
| Page load | Kitchen fades in zone by zone, staggered 0.15s | 0.4s each |
| Fridge door | `rotateY(-120deg)` swing | 0.6s ease-in-out |
| Cabinet doors | `rotateX(-110deg)` hinge up | 0.5s ease-in-out |
| Shelf items | Fade + slide down when fridge opens | 0.3s staggered |
| Handle glint | Brightness pulse on hover | 0.3s |
| Burner glow | Radial pulse `box-shadow` loop | 1s infinite |
| Steam wisps | `translateY` + `opacity` float upward | 2s infinite staggered |
| Knob hover | `rotate(15deg)` | 0.2s |
| Cook button loading | Pan emoji `rotate(360deg)` | 0.8s infinite |
| Builder panel | `translateY(100%)` → `0` | 0.4s ease-out |
| Recipe card | Slide up + `rotate(1.5deg)` settle | 0.5s ease-out |
| Detail drawer | Slide in from right | 0.4s ease-out |
| Clock hands | Live tick every second | JS interval |

---

## Bhavya's Content

### Experience (fridge top shelf — tupperware containers)
Fill with placeholder role names for now, labeled:
- "SWE Intern — [Company]"
- "Open Source — pipguard"
- "Side Projects Lab"

### Projects (fridge middle shelf)
- **TailorCV** — Semantic search platform for resume tailoring. FastAPI backend, pgvector for embeddings, Cohere API, hosted on Render + Vercel. Handles cold-start with scheduled restarts via FastAPI lifespan context manager.
- **pipguard-cli** — Python package security CLI published to PyPI. Intercepts `pip install`, runs trust signal checks and AST-based static analysis. Download-weighted risk scoring.
- **Voice Canvas** — Real-time AI agent UI builder. Next.js frontend, Groq for inference, Socket.IO for live updates.

### Skills (crisper drawer)
Python, FastAPI, PostgreSQL, pgvector, Next.js, TypeScript, C, Linux, Docker, Git, Cohere API, REST APIs

### Things That Didn't Make It (back of fridge)
- "Hackathon project — ran out of time" (expired 3 months ago)
- "ML model that never converged" (expired 6 months ago)
- "App idea with no users" (expired 1 year ago)

Style these as faded, slightly greyed-out containers with a small red expiry date stamp. Clicking one shows a short honest note about what happened and what was learned.

---

## File Structure

```
/portfolio
  index.html
  style.css
  script.js
```

No assets folder needed. No npm. No build step. Open `index.html` in a browser and it works.

---

## Build Order

Execute in this order to stay unblocked:

1. `index.html` — full scene structure and layout, all zones present
2. `style.css` — all variables, base styles, scene layout, textures, 3D setup
3. Fridge open/close interaction (JS + CSS)
4. Corkboard with working clock
5. Cook flow — builder panel, dish lookup, recipe card
6. Cabinet interactions
7. Detail drawer for fridge items
8. Polish — animations, steam, burner glow, page load sequence

---

## Notes

- Prioritize the fridge open interaction and the Cook flow above everything else. Those are the two memorable moments.
- Desktop only for now. Don't break mobile but don't optimize for it.
- All text content is placeholder-friendly — mark anything needing real content with `<!-- TODO: real content -->`.
- No comments in CSS. Minimal comments in JS, only where logic is non-obvious.