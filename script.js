// All 16 dish combinations
const dishes = {
  "swe-scrappy": {
    name: "Rustic Backend Stew",
    emoji: "🍲",
    description: "The kind of engineer who will own the whole stack before lunch and have opinions about your indexing strategy by EOD. Shipped TailorCV's search backend on a free tier and made it work anyway.",
    pairsWith: "Early-stage teams who need someone to own infra and product simultaneously.",
    cookTime: "1 sprint to full speed"
  },
  "swe-security": {
    name: "Hardened Cast Iron Soup",
    emoji: "🛡️",
    description: "Obsessed with threat modeling, dependency audits, and defense-in-depth. Every line of code comes with a risk assessment. Won't merge until the AST-based vulnerability scanner clears it.",
    pairsWith: "Companies where security posture directly impacts customer trust.",
    cookTime: "2 sprints (includes threat modeling)"
  },
  "swe-research": {
    name: "Scholarly Systems Risotto",
    emoji: "📚",
    description: "Deep dives into distributed consensus, consensus algorithms, and production edge cases. Pulls from research papers and implements what others sketch on napkins. Slow burn, high yield.",
    pairsWith: "Teams solving hard infrastructure problems that reward deep understanding.",
    cookTime: "3 sprints (research + implementation)"
  },
  "swe-ships": {
    name: "Quick-Fire Curry",
    emoji: "🔥",
    description: "Ships the MVP in a weekend, refactors during sprint planning. Clean enough, fast enough, good enough to learn from. API deployed, users happy, tech debt visible but manageable.",
    pairsWith: "Fast-moving startups that need a working product yesterday.",
    cookTime: "3 days to beta"
  },

  "ml-scrappy": {
    name: "Embedding Ragout",
    emoji: "🥘",
    description: "Trains embedding models on scrappy datasets, ships vector search with whatever works. pgvector on Postgres, Cohere embeddings via API, and enough clever caching to make it sing on a free tier.",
    pairsWith: "Startups doing semantic search on a bootstrapped budget.",
    cookTime: "1 week (if data is clean)"
  },
  "ml-security": {
    name: "Adversarial Bisque",
    emoji: "🥣",
    description: "Paranoid about model poisoning, prompt injection, and data leakage. Validates input distributions, monitors inference for drift, and builds robust pipelines that don't break when someone feeds garbage.",
    pairsWith: "High-stakes ML systems where failure modes matter deeply.",
    cookTime: "2 months (threat modeling + hardening)"
  },
  "ml-research": {
    name: "Fine-Tuning Fricassée",
    emoji: "🍗",
    description: "Reads the latest papers, runs experiments in silence for 6 weeks, then ships a model that outperforms the industry baseline. Understands the math, not just the API calls.",
    pairsWith: "Research labs and companies betting on proprietary models.",
    cookTime: "2-3 months per iteration"
  },
  "ml-ships": {
    name: "Rapid-Iteration Gumbo",
    emoji: "🍯",
    description: "Ships a baseline model in days, gathers user feedback, retrains iteratively. Cheap, scrappy, good at learning what actually matters from real users versus what felt important in the lab.",
    pairsWith: "Teams learning what their ML product should actually do.",
    cookTime: "1 week to first shipped model"
  },

  "devtools-scrappy": {
    name: "Utility Skillet",
    emoji: "🍳",
    description: "Wrote pipguard-cli in a month and published to PyPI. Intercepts pip, runs AST analysis, tells you what's risky. No fancy UI, just a tool that works and solves a real pain.",
    pairsWith: "Dev teams tired of dependency surprises.",
    cookTime: "1 sprint to MVP, ongoing maintenance"
  },
  "devtools-security": {
    name: "Fortified CLI Bouillabaisse",
    emoji: "🧂",
    description: "Security-first tooling: verified signatures, sandboxed execution, audit trails. Every command is a security event. For teams where developers are trusted but tools are not.",
    pairsWith: "Organizations with strict security posture requirements.",
    cookTime: "3-4 months (hardening + compliance)"
  },
  "devtools-research": {
    name: "Esoteric Parser Chowder",
    emoji: "📖",
    description: "Researches programming language design, static analysis patterns, and compiler theory. Builds tools that understand code deeply: not just parsing, but semantic analysis and transformation.",
    pairsWith: "Companies building languages, frameworks, or code analysis platforms.",
    cookTime: "3-6 months per major feature"
  },
  "devtools-ships": {
    name: "Zero-to-MVP CLI",
    emoji: "⚡",
    description: "Ships CLI tools in days. Works well enough to be useful, has room to grow, and gets real feedback from real users immediately. No over-engineering, just results.",
    pairsWith: "Teams that need tools fast and want to shape them with user input.",
    cookTime: "3-5 days to first release"
  },

  "product-scrappy": {
    name: "Lean Minestrone",
    emoji: "🌱",
    description: "Ships MVPs, talks to users constantly, pivots based on signal. Focuses on the 20% of features that drive 80% of value. Scrappy enough to move fast, thoughtful enough to understand what matters.",
    pairsWith: "Early-stage companies finding product-market fit.",
    cookTime: "2 weeks per iteration cycle"
  },
  "product-security": {
    name: "Privacy-Centric Gazpacho",
    emoji: "🔐",
    description: "Obsessed with data minimization, privacy by design, and user control. Every feature is evaluated against 'does this leak data?' Product roadmap is shaped by trust and compliance, not just growth metrics.",
    pairsWith: "Sensitive domains: healthcare, finance, fintech, where privacy is a feature.",
    cookTime: "1 month per feature (including privacy audit)"
  },
  "product-research": {
    name: "Hypothesis-Driven Paella",
    emoji: "🔬",
    description: "Treats product decisions as experiments. Quantifies hypotheses, runs A/B tests, reads research on user behavior. Product strategy backed by data and theory, not just intuition.",
    pairsWith: "Data-driven teams that want to move fast AND learn deeply.",
    cookTime: "2-3 weeks per experiment cycle"
  },
  "product-ships": {
    name: "Launch-Ready Jambalaya",
    emoji: "🚀",
    description: "Ships new products, features, and refinements every sprint. Responsive to user feedback, not afraid to kill what doesn't work. Focused on momentum and shipping velocity.",
    pairsWith: "Growth-focused teams that need product velocity and agility.",
    cookTime: "1-2 weeks per feature"
  }
};

// Fridge interaction
const fridge = document.getElementById('fridge');
const frigdeInterior = document.getElementById('fridge-interior');
let fridgeOpen = false;

fridge.addEventListener('click', () => {
  fridgeOpen = !fridgeOpen;
  fridge.classList.toggle('open');
});

// Fridge item click handlers - open detail drawer
const fridgeItems = document.querySelectorAll('[data-item]');
const detailDrawer = document.getElementById('detail-drawer');
const drawerContent = document.getElementById('drawer-content');
const drawerClose = document.getElementById('drawer-close');

const itemDetails = {
  "experience-1": {
    title: "SWE Intern",
    content: "<p>Interned at an early-stage startup, built API layers and infrastructure. Learned the value of owning the stack end-to-end.</p>"
  },
  "experience-2": {
    title: "Open Source",
    content: "<p>Maintained pipguard-cli, a PyPI security scanner. Engaged with the open source community, learned about dependency risk and trust signals.</p>"
  },
  "experience-3": {
    title: "Side Projects Lab",
    content: "<p>Shipped multiple projects: TailorCV (semantic search), Voice Canvas (real-time AI UI), and security-focused tools. Home for ideas that start as sketches.</p>"
  },
  "project-1": {
    title: "TailorCV",
    content: "<p><strong>Semantic search platform for resume tailoring.</strong></p><p>Built a FastAPI backend with pgvector embeddings. Uses Cohere API for semantic search, hosted on Render with cold-start optimization via FastAPI lifespan context.</p><p>Deployed on Vercel frontend, processes resumes and job descriptions to find the best match.</p>"
  },
  "project-2": {
    title: "pipguard-cli",
    content: "<p><strong>Python package security CLI, published to PyPI.</strong></p><p>Intercepts `pip install` commands and runs trust signal checks plus AST-based static analysis. Assigns risk scores based on download volume, maintainer reputation, and code patterns.</p><p>Helps teams understand the security surface of their dependencies.</p>"
  },
  "project-3": {
    title: "Voice Canvas",
    content: "<p><strong>Real-time AI agent UI builder.</strong></p><p>Next.js frontend, Groq for fast inference, Socket.IO for live updates. Lets users build and interact with AI agents visually, seeing state changes and responses in real-time.</p>"
  },
  "about": {
    title: "About Me",
    content: "<p>Software engineer and maker. I love building tools that people actually use, diving deep into hard problems, and shipping fast.</p><p>Passionate about security, AI infrastructure, and developer experience. Always learning, always shipping.</p>"
  },
  "contact-1": {
    title: "Contact",
    content: "<p>Email: <a href='mailto:b2goel@uwaterloo.ca'>b2goel@uwaterloo.ca</a></p><p>GitHub: <a href='https://github.com/bhavya' target='_blank'>github.com/bhavya</a></p><p>LinkedIn: <a href='https://linkedin.com/in/bhavya' target='_blank'>linkedin.com/in/bhavya</a></p>"
  },
  "contact-2": {
    title: "Let's Work Together",
    content: "<p>Open to co-ops, contract work, and partnerships. Interested in security, AI infra, and developer tools.</p>"
  },
  "expired-1": {
    title: "Hackathon Project",
    content: "<p><strong>Expired 3 months ago</strong></p><p>Built during a 48-hour hackathon. Ran out of time before the final push, but learned a ton about rapid prototyping and scope management.</p><p><strong>What I learned:</strong> Time management in high-pressure situations and the importance of MVP scope.</p>"
  },
  "expired-2": {
    title: "ML Model That Never Converged",
    content: "<p><strong>Expired 6 months ago</strong></p><p>Spent weeks tuning an embedding model that never quite converged. Architecture was sound, but the dataset needed more preprocessing.</p><p><strong>What I learned:</strong> Data quality trumps clever models. Also, knowing when to kill an experiment is a skill.</p>"
  },
  "expired-3": {
    title: "App Idea With No Users",
    content: "<p><strong>Expired 1 year ago</strong></p><p>Built a full app based on what I thought users wanted, launched with zero validation, and found out the hard way that nobody actually needed it.</p><p><strong>What I learned:</strong> Talk to users before writing code. Validation is cheap, pivots after launch are expensive.</p>"
  }
};

fridgeItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const itemId = item.dataset.item;
    const details = itemDetails[itemId];
    if (details) {
      drawerContent.innerHTML = `<h2>${details.title}</h2>${details.content}`;
      detailDrawer.classList.add('visible');
    }
  });
});

drawerClose.addEventListener('click', () => {
  detailDrawer.classList.remove('visible');
});

document.addEventListener('click', (e) => {
  if (!detailDrawer.contains(e.target) && !e.target.closest('[data-item]')) {
    detailDrawer.classList.remove('visible');
  }
});

// Cabinet interactions
const cabinetDoors = document.querySelectorAll('.cabinet-door');

cabinetDoors.forEach(door => {
  door.addEventListener('click', () => {
    door.classList.toggle('open');
  });
});

document.addEventListener('click', (e) => {
  cabinetDoors.forEach(door => {
    if (!door.contains(e.target)) {
      door.classList.remove('open');
    }
  });
});

// Clock
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  secondHand.style.transform = `rotate(${secondDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
}

updateClock();
setInterval(updateClock, 1000);

// Cook flow
const cookKnob = document.getElementById('cook-knob');
const builderPanel = document.getElementById('builder-panel');
const cookButton = document.getElementById('cook-button');
const recipeCard = document.getElementById('recipe-card');
const baseGroup = document.getElementById('base-group');
const styleGroup = document.getElementById('style-group');
const toppingGroup = document.getElementById('topping-group');

let cookFlowActive = false;

cookKnob.addEventListener('click', () => {
  if (!cookFlowActive) {
    cookFlowActive = true;
    builderPanel.classList.add('visible');
    recipeCard.classList.remove('visible');
  }
});

// Enable cook button when base and style are selected
function checkCookButtonState() {
  const baseSelected = document.querySelector('input[name="base"]:checked');
  const styleSelected = document.querySelector('input[name="style"]:checked');
  cookButton.disabled = !baseSelected || !styleSelected;
}

baseGroup.addEventListener('change', checkCookButtonState);
styleGroup.addEventListener('change', checkCookButtonState);
toppingGroup.addEventListener('change', () => {
  const checkboxes = document.querySelectorAll('input[name="topping"]');
  checkboxes.forEach(cb => {
    if (cb !== event.target && cb.type === 'checkbox') {
      cb.checked = false;
    }
  });
});

// Cook button click - cooking animation and recipe lookup
cookButton.addEventListener('click', () => {
  const baseInput = document.querySelector('input[name="base"]:checked');
  const styleInput = document.querySelector('input[name="style"]:checked');
  const toppingInput = document.querySelector('input[name="topping"]:checked');

  if (!baseInput || !styleInput) return;

  // Activate burners
  document.querySelectorAll('.burner-ring').forEach(burner => {
    burner.classList.add('active');
  });

  // Cooking animation
  cookButton.classList.add('cooking');
  const buttonText = cookButton.querySelector('.button-text');
  buttonText.textContent = '🍳';
  buttonText.classList.add('spinning');

  // Fake cooking delay
  setTimeout(() => {
    const base = baseInput.value;
    const style = styleInput.value;
    const dishKey = `${base}-${style}`;
    const dish = dishes[dishKey];
    const topping = toppingInput ? toppingInput.value : null;

    if (dish) {
      let description = dish.description;
      if (topping) {
        const toppingNames = {
          tailorcv: "TailorCV",
          pipguard: "pipguard-cli",
          voicecanvas: "Voice Canvas"
        };
        description = description.replace(/\./,
          `. (Especially with ${toppingNames[topping]} in the mix).`
        );
      }

      // Display recipe card
      document.getElementById('recipe-emoji').textContent = dish.emoji;
      document.getElementById('recipe-name').textContent = dish.name;
      document.getElementById('recipe-description').textContent = description;
      document.getElementById('recipe-pairs').textContent = dish.pairsWith;
      document.getElementById('recipe-time').textContent = dish.cookTime;

      // Reset cooking state
      cookButton.classList.remove('cooking');
      buttonText.textContent = '🔥 Cook';
      buttonText.classList.remove('spinning');
      document.querySelectorAll('.burner-ring').forEach(burner => {
        burner.classList.remove('active');
      });

      // Show recipe
      builderPanel.classList.remove('visible');
      recipeCard.classList.add('visible');
    }
  }, 1200);
});

// Copy button
document.getElementById('copy-btn').addEventListener('click', () => {
  const name = document.getElementById('recipe-name').textContent;
  const description = document.getElementById('recipe-description').textContent;
  const pairs = document.getElementById('recipe-pairs').textContent;
  const time = document.getElementById('recipe-time').textContent;

  const plaintext = `${name}

${description}

Pairs with: ${pairs}
Cook time: ${time}`;

  navigator.clipboard.writeText(plaintext).then(() => {
    const btn = document.getElementById('copy-btn');
    const original = btn.textContent;
    btn.textContent = '✓ Copied';
    setTimeout(() => {
      btn.textContent = original;
    }, 2000);
  });
});

// Cook again button
document.getElementById('again-btn').addEventListener('click', () => {
  recipeCard.classList.remove('visible');
  builderPanel.classList.add('visible');

  // Reset form
  document.querySelectorAll('input[name="base"]').forEach(input => input.checked = false);
  document.querySelectorAll('input[name="style"]').forEach(input => input.checked = false);
  document.querySelectorAll('input[name="topping"]').forEach(input => input.checked = false);

  cookButton.disabled = true;
});

// Close builder panel on outside click (except content)
document.addEventListener('click', (e) => {
  if (builderPanel.classList.contains('visible') &&
      !builderPanel.contains(e.target) &&
      e.target !== cookKnob) {
    builderPanel.classList.remove('visible');
    cookFlowActive = false;
  }
});
