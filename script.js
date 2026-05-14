const kitchen = document.getElementById('kitchen');
  const W = window.innerWidth;
  const H = window.innerHeight;

  // ── Wood planks ──
  const woodBg = document.getElementById('woodBg');
  const plankColors = ['#5c3d1e','#4e3318','#634425','#573d20','#4a3015','#5a3b1c','#623f22','#503819'];
  let px = 0, pi = 0;
  while (px < W + 60) {
    const w = 38 + Math.floor(Math.random() * 22);
    const d = document.createElement('div');
    d.className = 'plank';
    d.style.cssText = `left:${px}px;width:${w}px;background:${plankColors[pi % plankColors.length]};`;
    woodBg.appendChild(d);
    px += w + 1; pi++;
  }

  // ── Fairy lights ──
  const svg = document.getElementById('fairySvg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('width', W);
  svg.setAttribute('height', H);
  const bulbContainer = document.getElementById('bulbContainer');

  const bulbColors = [
    {bg:'#ffdd88',glow:'rgba(255,210,80,0.85)'},
    {bg:'#ffaa55',glow:'rgba(255,140,50,0.85)'},
    {bg:'#ff8844',glow:'rgba(255,100,40,0.8)'},
    {bg:'#ffcc66',glow:'rgba(255,190,60,0.85)'},
    {bg:'#ff9966',glow:'rgba(255,130,60,0.8)'},
    {bg:'#ffe066',glow:'rgba(255,200,50,0.85)'},
  ];

  // safe zone — no lights behind appliances
  const appW = 180 + 80 + 220;
  const appLeft = (W - appW) / 2;
  const appRight = appLeft + appW;
  const appTop = H - 80 - 360;
  function isBehind(x, y) {
    return x > appLeft - 20 && x < appRight + 20 && y > appTop - 10;
  }

  // string 1: top edge with gentle sag
  const s1 = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const x = 20 + t * (W - 40);
    const lt = (t * 12) % 1;
    const sag = Math.sin(lt * Math.PI) * (14 + Math.random() * 10);
    s1.push({ x, y: 10 + Math.random() * 16 + sag });
  }

  // string 2: left side zigzag
  const s2 = [];
  let sy2 = 20;
  while (sy2 < H - 90) {
    s2.push({ x: 14 + Math.random() * 55, y: sy2 });
    sy2 += 42 + Math.random() * 32;
  }

  // string 3: right side zigzag
  const s3 = [];
  let sy3 = 25;
  while (sy3 < H - 90) {
    s3.push({ x: W - 14 - Math.random() * 55, y: sy3 });
    sy3 += 42 + Math.random() * 32;
  }

  // string 4: bottom edge
  const s4 = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    const x = 20 + t * (W - 40);
    const lt = (t * 8) % 1;
    const sag = Math.sin(lt * Math.PI) * 8;
    s4.push({ x, y: H - 14 - Math.random() * 10 - sag });
  }

  // string 5: top-left diagonal staying clear of appliances
  const s5 = [
    { x: 25, y: 40 + Math.random() * 20 },
    { x: 80 + Math.random() * 40, y: 80 + Math.random() * 30 },
    { x: 150 + Math.random() * 30, y: 45 + Math.random() * 25 },
    { x: appLeft - 30, y: 90 + Math.random() * 30 },
  ];

  // string 6: top-right diagonal staying clear of appliances
  const s6 = [
    { x: W - 25, y: 45 + Math.random() * 20 },
    { x: W - 80 - Math.random() * 40, y: 85 + Math.random() * 30 },
    { x: W - 150 - Math.random() * 30, y: 50 + Math.random() * 25 },
    { x: appRight + 30, y: 95 + Math.random() * 30 },
  ];

  [s1, s2, s3, s4, s5, s6].forEach((pts, si) => {
    const safe = pts.filter(p => !isBehind(p.x, p.y));
    if (safe.length < 2) return;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', safe.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '));
    path.setAttribute('stroke', 'rgba(90,65,40,0.5)');
    path.setAttribute('stroke-width', '1.2');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);

    safe.forEach((p, i) => {
      const c = bulbColors[(si * 4 + i) % bulbColors.length];
      const el = document.createElement('div');
      el.className = 'bulb';
      el.style.cssText = `
        left:${(p.x - 4).toFixed(1)}px;
        top:${(p.y - 6).toFixed(1)}px;
        background:${c.bg};
        --glow:${c.glow};
        --dur:${(1.8 + Math.random() * 3).toFixed(1)}s;
        --delay:${(Math.random() * 5).toFixed(2)}s;
      `;
      bulbContainer.appendChild(el);
    });
  });

  // ── Fridge door toggles ──
  document.querySelector('.f-door-wrap').addEventListener('click', function(e) {
    const door = document.getElementById('fridgeDoor');
    const shelf = e.target.closest('.f-shelf');

    if (shelf) {
      // shelf click — open modal, don't touch door
      onShelfClick(shelf.dataset.section);
      return;
    }

    if (!door.classList.contains('open')) {
      door.classList.add('open');
      this.style.zIndex = '0'; // drop below interior so shelves get clicks
    } else {
      door.classList.remove('open');
      this.style.zIndex = '2'; // restore so door is clickable again
    }
  });
  document.getElementById('freezerDoor').addEventListener('click', function () {
    this.classList.toggle('open');
  });

  // ── Modal System ──
  const modalOverlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  const experiences = [
    { name: 'University of Waterloo', desc: 'CS + Math degree, GPA 3.8/4.0' },
    { name: 'National Math Scholarship', desc: 'Awarded for exceptional mathematical aptitude' },
    { name: 'PyPI Package Creator', desc: 'Published package at age 19' }
  ];

  const projects = [
    { name: 'PyPI Package', desc: 'Data processing automation tool' },
    { name: 'Mathematical Algorithms', desc: 'Combinatorics & computational math' },
    { name: 'This Portfolio', desc: 'Interactive 3D kitchen experience' }
  ];

  const sectionContent = {
      experience: {
  title: '💼 Experience',
  type: 'carousel',
  items: [
    "Built an end-to-end Python data pipeline that auto-classifies Google Forms data into typed pandas DataFrames, integrates NLP-based topic modeling and sentiment analysis with statistical methods, and ships a Streamlit UI for interactive review, reducing manual survey analysis time by over 80%." , 
    "Worked in a small team to clean and analyze a 1,445-record used-car dataset, built and deployed a price prediction model using Streamlit with engineered features like mileage and ownership, and created dashboards and reports to communicate key market pricing insights.",
    "Contributed to end-to-end UX and product discovery for a real-time ER wait-time app in Figma, conducting stakeholder interviews with hospital staff to define requirements and prioritize features, and translating user research into iterative design decisions aligned with clinical workflows.",
    "Will be working as a Product lead on UW Cube working on their website from taking it from 0 to deployed and integrating a chatbot with in as well. "
  ]
},
    projects: {
  title: '🚀 Projects',
  type: 'carousel',
  items: [
    "📦 PyPI Package — data processing automation tool (1000+ downloads)",
    "🧮 Mathematical Algorithms — combinatorics + computational math work",
    "🍳 This Portfolio — interactive 3D kitchen experience built with vanilla JS"
  ]
},
    skills: {
      title: '⚙️ Skills',
      html: `
        <div class="modal-section">
          <h3>Languages</h3>
          <p>Python • JavaScript • Java • C++ • SQL • HTML/CSS</p>
        </div>
        <div class="modal-divider"></div>
        <div class="modal-section">
          <h3>Frameworks & Tools</h3>
          <p>React • Node.js • TensorFlow • Pandas • Git • Docker</p>
        </div>
        <div class="modal-divider"></div>
        <div class="modal-section">
          <h3>Specialties</h3>
          <ul>
            <li>Machine Learning & AI</li>
            <li>Web Development</li>
            <li>Data Analysis</li>
            <li>Algorithm Design</li>
          </ul>
        </div>
      `
    },
    about: {
      title: '👋 About Me',
      html: `
        <div class="modal-section">
          <p>Hi! I'm Bhavya, a Computer Science and Mathematics student at the University of Waterloo.</p>
        </div>
        <div class="modal-divider"></div>
        <div class="modal-section">
          <h3>Highlights</h3>
          <ul>
            <li>National Math Scholarship recipient</li>
            <li>Published open-source package at 19</li>
            <li>Passionate about AI & machine learning</li>
            <li>Love creative problem-solving</li>
          </ul>
        </div>
        <div class="modal-divider"></div>
        <div class="modal-section">
          <p>When I'm not coding, you'll find me exploring new technologies or working on personal projects.</p>
        </div>
      `
    }
  };

  let selectedExperience = null;
  let selectedProject = null;

  function openModal(section) {
    const content = sectionContent[section];
    if (!content) return;

    modalTitle.textContent = content.title;
    modalContent.innerHTML = "";

if (content.type === "carousel") {
  setupCarousel(content.items);
} else {
  modalContent.innerHTML = content.html;
}
    modalOverlay.classList.add('active');
  }

  function openCookModal() {
    selectedExperience = null;
    selectedProject = null;

    modalTitle.textContent = '👨‍🍳 Cook Something — inspired by cmh live counter';
    modalContent.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start;">
        <div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 14px; margin-bottom: 12px; color: #5c3d1e; text-decoration: underline;">Choose Your Base <span style="font-size: 12px; color: #886840;">(max 1)</span></h3>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${experiences.map((exp, i) => `
              <button style="
                padding: 8px;
                background: ${selectedExperience === i ? '#a08860' : '#d4c5a8'};
                border: 2px solid #886840;
                border-radius: 6px;
                cursor: pointer;
                font-family: 'Courier Prime', monospace;
                font-size: 12px;
                text-align: left;
                transition: all 0.2s;
                color: #2a1a08;
              " class="exp-btn" data-idx="${i}">
                <strong>${exp.name}</strong><br>
                <small style="opacity: 0.7;">${exp.desc}</small>
              </button>
            `).join('')}
          </div>
        </div>
        <div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 14px; margin-bottom: 12px; color: #5c3d1e; text-decoration: underline;">Choose Your Toppings <span style="font-size: 12px; color: #886840;">(max 3)</span></h3>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${projects.map((proj, i) => `
              <button style="
                padding: 8px;
                background: ${selectedProject === i ? '#a08860' : '#d4c5a8'};
                border: 2px solid #886840;
                border-radius: 6px;
                cursor: pointer;
                font-family: 'Courier Prime', monospace;
                font-size: 12px;
                text-align: left;
                transition: all 0.2s;
                color: #2a1a08;
              " class="proj-btn" data-idx="${i}">
                <strong>${proj.name}</strong><br>
                <small style="opacity: 0.7;">${proj.desc}</small>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      <div style="margin-top: 16px;">
        <button id="cookSummaryBtn" style="
          width: 100%;
          padding: 12px;
          background: ${selectedExperience !== null && selectedProject !== null ? '#a08860' : '#ccc'};
          border: 2px solid #886840;
          border-radius: 6px;
          cursor: ${selectedExperience !== null && selectedProject !== null ? 'pointer' : 'not-allowed'};
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: bold;
          transition: all 0.2s;
          color: #2a1a08;
        " ${selectedExperience === null || selectedProject === null ? 'disabled' : ''}>
          Let's Cook
        </button>
      </div>
    `;

    // Add event listeners for experience buttons
    document.querySelectorAll('.exp-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        selectedExperience = parseInt(this.dataset.idx);
        openCookModal();
      });
    });

    // Add event listeners for project buttons
    document.querySelectorAll('.proj-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        selectedProject = parseInt(this.dataset.idx);
        openCookModal();
      });
    });

    // Add listener for summary button
    const summaryBtn = document.getElementById('cookSummaryBtn');
    if (summaryBtn && selectedExperience !== null && selectedProject !== null) {
      summaryBtn.addEventListener('click', showCookSummary);
    }

    modalOverlay.classList.add('active');
  }

  function showCookSummary() {
    const exp = experiences[selectedExperience];
    const proj = projects[selectedProject];

    modalTitle.textContent = '✨ Your Recipe';
    modalContent.innerHTML = `
      <div class="modal-section">
        <h3>Combining:</h3>
        <p><strong>${exp.name}</strong></p>
        <p style="color: #666; font-size: 12px;">${exp.desc}</p>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-section">
        <p><strong>${proj.name}</strong></p>
        <p style="color: #666; font-size: 12px;">${proj.desc}</p>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-section">
        <h3>The Recipe:</h3>
        <p>I combined my ${exp.name.toLowerCase()} with my expertise in ${proj.name.toLowerCase()} to create something meaningful. This blend of theoretical knowledge and practical application drives my approach to problem-solving and innovation.</p>
      </div>
      <div class="modal-section">
        <button id="cookAgainBtn" style="
          width: 100%;
          padding: 10px;
          background: #d4c5a8;
          border: 2px solid #886840;
          border-radius: 6px;
          cursor: pointer;
          font-family: 'Courier Prime', monospace;
          font-size: 13px;
          transition: all 0.2s;
        ">Cook Again</button>
      </div>
    `;

    document.getElementById('cookAgainBtn').addEventListener('click', openCookModal);
    modalOverlay.classList.add('active');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  // Close on background click
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close button
  modalClose.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // ── Shelf clicks ──
  function onShelfClick(section) {
    openModal(section);
  }
  document.querySelectorAll('.f-shelf').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      onShelfClick(el.dataset.section);
    });
  });

  // ── Stove knob — Cook Something ──
  let burnerOn = false;
  document.getElementById('cookKnob').addEventListener('click', function () {
    burnerOn = !burnerOn;
    ['b1', 'b2', 'b3', 'b4'].forEach(id => {
      document.getElementById(id).classList.toggle('active', burnerOn);
    });
    if (burnerOn) {
      openCookModal();
    } else {
      closeModal();
    }
  });


// JS for carousel of the modals.

let currentIndex = 0;
let carouselItems = [];

function setupCarousel(items) {
  carouselItems = items;
  currentIndex = 0;

  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <div class="carousel">
      <button class="carousel-btn left" id="carouselLeft">‹</button>

      <div class="carousel-track" id="carouselTrack">
        ${items
          .map(
            (item, i) => `
              <div class="carousel-item ${i === 0 ? "active" : ""}">
                ${item}
              </div>
            `
          )
          .join("")}
      </div>

      <button class="carousel-btn right" id="carouselRight">›</button>
    </div>
  `;

  document.getElementById("carouselLeft").onclick = () => {
    changeSlide(-1);
  };

  document.getElementById("carouselRight").onclick = () => {
    changeSlide(1);
  };
}
function changeSlide(direction) {
  const items = document.querySelectorAll(".carousel-item");

  items[currentIndex].classList.remove("active");

  currentIndex =
    (currentIndex + direction + items.length) % items.length;

  items[currentIndex].classList.add("active");
}