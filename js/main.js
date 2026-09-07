/**
 * Main Application Logic - Khaled Hassan Salam Portfolio
 * UI/UX Designer & Developer
 */

(function () {
  const state = {
    currentCategory: 'all',
    soundEnabled: true,
    theme: localStorage.getItem('portfolio-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  };

  // --- Web Audio API Subtle Sound Synthesizer ---
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  window.playHapticSound = function (freq = 480, duration = 0.05, type = 'sine') {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context may require initial interaction
    }
  };

  // --- Theme Management ---
  function applyTheme(themeName) {
    state.theme = themeName;
    localStorage.setItem('portfolio-theme', themeName);

    if (themeName === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const themeIcons = document.querySelectorAll('.theme-icon-slot');
    themeIcons.forEach(slot => {
      if (themeName === 'dark') {
        slot.innerHTML = `<i data-lucide="sun" class="w-5 h-5 text-amber-400"></i>`;
      } else {
        slot.innerHTML = `<i data-lucide="moon" class="w-5 h-5 text-indigo-600"></i>`;
      }
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function initTheme() {
    applyTheme(state.theme);

    const themeToggles = document.querySelectorAll('[data-action="toggle-theme"]');
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        window.playHapticSound(580);
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
      });
    });
  }

  // --- Sound Toggle ---
  function initSoundToggle() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundBtn.setAttribute('aria-pressed', state.soundEnabled);
      soundBtn.innerHTML = state.soundEnabled
        ? `<i data-lucide="volume-2" class="w-4 h-4 text-emerald-400"></i> <span class="text-xs text-slate-300">SFX On</span>`
        : `<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i> <span class="text-xs text-slate-500">SFX Muted</span>`;
      
      if (state.soundEnabled) {
        window.playHapticSound(620);
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // --- Services / What I Do Rendering ---
  function renderServices() {
    const container = document.getElementById('services-grid');
    if (!container || !window.PORTFOLIO_DATA) return;

    container.innerHTML = window.PORTFOLIO_DATA.services.map(s => `
      <div class="glass-card p-6 md:p-7 rounded-2xl flex flex-col justify-between group">
        <div>
          <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
            <i data-lucide="${s.icon}" class="w-6 h-6"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors mb-2">
            ${s.title}
          </h3>
          <p class="text-sm text-slate-400 leading-relaxed">
            ${s.description}
          </p>
        </div>
      </div>
    `).join('');
  }

  // --- Featured Projects Rendering ---
  function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container || !window.PORTFOLIO_DATA) return;

    const filtered = state.currentCategory === 'all'
      ? window.PORTFOLIO_DATA.projects
      : window.PORTFOLIO_DATA.projects.filter(p => p.category === state.currentCategory);

    container.innerHTML = filtered.map(project => `
      <article class="glass-card rounded-2xl overflow-hidden flex flex-col group" data-project-id="${project.id}">
        <!-- Image Mockup Window -->
        <div class="project-card-image-wrap aspect-[16/10] bg-slate-950 border-b border-slate-800/80 relative">
          <img src="${project.image}" alt="${project.title} Preview" class="w-full h-full object-cover object-center" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
          
          <div class="absolute top-3 left-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-indigo-300 backdrop-blur-md border border-indigo-500/30">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              ${project.categoryLabel}
            </span>
          </div>
        </div>

        <!-- Content Body -->
        <div class="p-6 md:p-7 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors mb-1.5">
              ${project.title}
            </h3>
            <p class="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
              ${project.subtitle}
            </p>
            <p class="text-sm text-slate-400 leading-relaxed mb-5">
              ${project.summary}
            </p>

            <!-- Metrics / Highlights -->
            <div class="grid grid-cols-3 gap-2 py-3 px-3 mb-5 rounded-xl bg-slate-900/60 border border-slate-800/60">
              ${project.metrics.map(m => `
                <div class="text-center">
                  <span class="block text-xs md:text-sm font-bold text-slate-100">${m.value}</span>
                  <span class="block text-[10px] text-slate-400 uppercase tracking-tight">${m.label}</span>
                </div>
              `).join('')}
            </div>

            <!-- Tech / Role Tags -->
            <div class="flex flex-wrap gap-1.5 mb-6">
              ${project.tags.map(t => `
                <span class="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-800/60 text-slate-300 border border-slate-700/50">
                  ${t}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
            <button class="btn-open-case-study inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors" data-id="${project.id}">
              <span>View Case Study</span>
              <i data-lucide="arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1"></i>
            </button>
            <span class="text-xs font-mono text-slate-500">${project.contribution}</span>
          </div>
        </div>
      </article>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    // Attach click listeners to Case Study buttons
    container.querySelectorAll('.btn-open-case-study').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        openCaseStudyModal(id);
      });
    });
  }

  function initFilterTabs() {
    const tabs = document.querySelectorAll('[data-category-filter]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/25');
          t.classList.add('bg-slate-900/60', 'text-slate-400', 'hover:text-slate-200');
        });

        tab.classList.remove('bg-slate-900/60', 'text-slate-400', 'hover:text-slate-200');
        tab.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/25');

        state.currentCategory = tab.dataset.categoryFilter;
        window.playHapticSound(480);
        renderProjects();
      });
    });
  }

  // --- Case Study Modal ---
  function openCaseStudyModal(projectId) {
    const project = window.PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!project) return;

    window.playHapticSound(540);

    const modal = document.getElementById('case-study-modal');
    const content = document.getElementById('modal-case-study-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <!-- Modal Header -->
      <div class="relative pb-6 border-b border-slate-800">
        <div class="flex items-center gap-2 mb-2">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            ${project.categoryLabel}
          </span>
          <span class="text-xs text-slate-400 font-mono">&bull; Case Study</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-100 mb-2">
          ${project.title}
        </h2>
        <p class="text-base text-indigo-400 font-medium">
          ${project.subtitle}
        </p>

        <!-- Contribution Tag -->
        <div class="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span class="block text-[11px] font-mono text-slate-500 uppercase">My Contribution</span>
            <span class="text-sm font-semibold text-slate-200">${project.contribution}</span>
          </div>
          <div class="text-right">
            <span class="block text-[11px] font-mono text-slate-500 uppercase">Focus</span>
            <span class="text-sm font-semibold text-emerald-400">Production UI/UX</span>
          </div>
        </div>
      </div>

      <!-- Mockup Hero -->
      <div class="my-6 rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <img src="${project.image}" alt="${project.title}" class="w-full h-auto object-cover" />
      </div>

      <!-- Deep Dive Sections -->
      <div class="space-y-6 text-slate-300 leading-relaxed">
        <div>
          <h4 class="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-rose-500"></span> The Design Challenge
          </h4>
          <p class="text-sm text-slate-300 bg-slate-900/40 p-4 rounded-xl border border-slate-800">${project.challenge}</p>
        </div>

        <div>
          <h4 class="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span> Outcome &amp; Architecture
          </h4>
          <p class="text-sm text-slate-300 bg-slate-900/40 p-4 rounded-xl border border-slate-800">${project.outcome}</p>
        </div>

        <div>
          <h4 class="text-lg font-bold text-slate-100 flex items-center gap-2 mb-3">
            <span class="w-2 h-2 rounded-full bg-cyan-500"></span> Key Features &amp; User Workflows
          </h4>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            ${project.features.map(item => `
              <li class="flex items-start gap-2 text-xs bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <span class="text-slate-300 font-medium">${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Tech / Role Tags -->
        <div class="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap gap-1.5">
            ${project.tags.map(t => `
              <span class="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300">
                ${t}
              </span>
            `).join('')}
          </div>
          <a href="#contact" onclick="document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active')); document.body.style.overflow = '';" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all">
            <i data-lucide="message-square" class="w-4 h-4"></i> Discuss Similar Project
          </a>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModals() {
    window.playHapticSound(380);
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  function initModals() {
    document.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
      btn.addEventListener('click', closeModals);
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModals();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModals();
    });

    document.querySelectorAll('[data-action="open-resume"]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.playHapticSound(540);
        const resumeModal = document.getElementById('resume-modal');
        if (resumeModal) {
          resumeModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  // --- Skills & Tools Rendering ---
  function renderSkills() {
    const designContainer = document.getElementById('design-skills-list');
    const devContainer = document.getElementById('dev-skills-list');
    const toolsContainer = document.getElementById('tools-badges-list');
    const exploringContainer = document.getElementById('exploring-badges-list');
    if (!window.PORTFOLIO_DATA) return;

    if (designContainer) {
      designContainer.innerHTML = window.PORTFOLIO_DATA.skills.design.map(s => `
        <div class="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 transition-colors">
          <i data-lucide="sparkles" class="w-4 h-4 text-pink-400 shrink-0"></i>
          <span class="text-sm font-semibold text-slate-200">${s}</span>
        </div>
      `).join('');
    }

    if (devContainer) {
      devContainer.innerHTML = window.PORTFOLIO_DATA.skills.development.map(s => `
        <div class="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
          <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0"></i>
          <span class="text-sm font-semibold text-slate-200">${s}</span>
        </div>
      `).join('');
    }

    if (toolsContainer) {
      toolsContainer.innerHTML = window.PORTFOLIO_DATA.skills.tools.map(tool => `
        <span class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-all cursor-default shadow-sm flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> ${tool}
        </span>
      `).join('');
    }

    if (exploringContainer) {
      exploringContainer.innerHTML = window.PORTFOLIO_DATA.skills.currentlyExploring.map(item => `
        <span class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/30 text-indigo-300 border border-indigo-500/30 hover:border-indigo-400 transition-all cursor-default flex items-center gap-1.5">
          <i data-lucide="compass" class="w-3.5 h-3.5 text-indigo-400"></i> ${item}
        </span>
      `).join('');
    }
  }

  // --- 6-Stage Process Rendering ---
  function renderProcess() {
    const container = document.getElementById('process-grid');
    if (!container || !window.PORTFOLIO_DATA) return;

    container.innerHTML = window.PORTFOLIO_DATA.process.map(item => `
      <div class="glass-card p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="font-mono text-2xl font-black text-slate-700 group-hover:text-indigo-400 transition-colors">
              ${item.step}
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Phase
            </span>
          </div>
          <h3 class="text-lg font-bold text-slate-100 mb-1.5">
            ${item.title}
          </h3>
          <p class="text-[11px] font-mono text-indigo-400 mb-3 font-semibold">
            ${item.formula}
          </p>
          <p class="text-xs text-slate-400 leading-relaxed">
            ${item.description}
          </p>
        </div>
      </div>
    `).join('');
  }

  // --- Experience Rendering (BizznTek Ltd.) ---
  function renderExperience() {
    const container = document.getElementById('experience-timeline');
    if (!container || !window.PORTFOLIO_DATA) return;

    container.innerHTML = window.PORTFOLIO_DATA.experience.map(exp => `
      <div class="glass-card p-7 md:p-8 rounded-2xl">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h4 class="text-xl font-bold text-slate-100">${exp.role}</h4>
            <span class="text-base font-semibold text-indigo-400">${exp.company}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
              ${exp.period}
            </span>
            <span class="px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ${exp.badge}
            </span>
          </div>
        </div>
        <p class="text-sm text-slate-300 mb-6 leading-relaxed">${exp.description}</p>
        
        <h5 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Key Areas of Work:</h5>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          ${exp.areas.map(area => `
            <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2">
              <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-400 shrink-0"></i>
              <span>${area}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- Education & Learning Journey Rendering ---
  function renderEducation() {
    const eduContainer = document.getElementById('education-list');
    const journeyContainer = document.getElementById('learning-journey-steps');
    if (!window.PORTFOLIO_DATA) return;

    if (eduContainer) {
      eduContainer.innerHTML = window.PORTFOLIO_DATA.education.map(edu => `
        <div class="glass-card p-6 rounded-2xl relative">
          <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h4 class="text-base sm:text-lg font-bold text-slate-100">${edu.degree}</h4>
            <span class="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold ${edu.status === 'Currently Pursuing' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-slate-800 text-slate-300'}">
              ${edu.status}
            </span>
          </div>
          <span class="text-sm font-semibold text-indigo-400 block mb-2">${edu.institution}</span>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">${edu.description}</p>
        </div>
      `).join('');
    }

    if (journeyContainer) {
      journeyContainer.innerHTML = window.PORTFOLIO_DATA.learningJourney.map((j, idx) => `
        <div class="flex-1 p-4 rounded-xl bg-slate-900/80 border border-slate-800 relative group">
          <span class="text-[10px] font-mono text-slate-500 block mb-1">0${idx + 1} Step</span>
          <h5 class="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors mb-1">${j.step}</h5>
          <p class="text-xs text-slate-400">${j.role}</p>
        </div>
      `).join('');
    }
  }

  // --- Why Work With Me & Principles Rendering ---
  function renderWhyAndPrinciples() {
    const whyContainer = document.getElementById('why-work-with-me-grid');
    const principlesContainer = document.getElementById('principles-grid');
    if (!window.PORTFOLIO_DATA) return;

    if (whyContainer) {
      whyContainer.innerHTML = window.PORTFOLIO_DATA.whyWorkWithMe.map(w => `
        <div class="glass-card p-6 rounded-2xl group">
          <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <i data-lucide="${w.icon}" class="w-5 h-5"></i>
          </div>
          <h4 class="text-base font-bold text-slate-100 mb-2">${w.title}</h4>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">${w.description}</p>
        </div>
      `).join('');
    }

    if (principlesContainer) {
      principlesContainer.innerHTML = window.PORTFOLIO_DATA.principles.map(p => `
        <div class="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80">
          <h5 class="text-base font-bold text-indigo-300 mb-1.5">${p.title}</h5>
          <p class="text-xs text-slate-400 leading-relaxed">${p.desc}</p>
        </div>
      `).join('');
    }
  }

  // --- Live Dhaka Timezone Clock ---
  function initTimezoneClock() {
    const clockEl = document.getElementById('designer-local-time');
    const statusEl = document.getElementById('designer-work-status');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      // Bangladesh Standard Time (Asia/Dhaka, UTC+6)
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeString = new Intl.DateTimeFormat([], options).format(now);
      clockEl.textContent = `${timeString} (BST &bull; Dhaka)`;

      const hourOptions = { timeZone: 'Asia/Dhaka', hour: 'numeric', hour12: false };
      const currentHour = parseInt(new Intl.DateTimeFormat([], hourOptions).format(now), 10);
      const isWorkingHours = currentHour >= 9 && currentHour < 21; // 9 AM to 9 PM

      if (statusEl) {
        statusEl.innerHTML = isWorkingHours
          ? `<span class="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span> Active &bull; Available for collaborations`
          : `<span class="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span> Rest Hours &bull; Replies within 8 hours`;
      }
    }

    update();
    setInterval(update, 1000);
  }

  // --- Contact Form & Pill Selection ---
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const successBox = document.getElementById('contact-success-state');
    const messageInput = document.getElementById('contact-message');
    const charCounter = document.getElementById('message-char-count');
    const submitBtn = document.getElementById('contact-submit-btn');

    const pillButtons = document.querySelectorAll('[data-pill-choice]');
    const hiddenTypeInput = document.getElementById('selected-project-type');

    pillButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        pillButtons.forEach(b => {
          b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-500');
          b.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-800');
        });
        btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-500');
        btn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-800');
        if (hiddenTypeInput) hiddenTypeInput.value = btn.dataset.pillChoice;
        window.playHapticSound(500);
      });
    });

    if (messageInput && charCounter) {
      messageInput.addEventListener('input', () => {
        charCounter.textContent = `${messageInput.value.length} / 500`;
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
          alert('Please fill out all required fields.');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg> Sending message...
          `;
        }

        setTimeout(() => {
          window.playHapticSound(880);
          if (form) form.classList.add('hidden');
          if (successBox) successBox.classList.remove('hidden');
        }, 700);
      });
    }

    const resetBtn = document.getElementById('contact-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (form) {
          form.reset();
          form.classList.remove('hidden');
        }
        if (successBox) successBox.classList.add('hidden');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send" class="w-4 h-4 ml-2"></i>`;
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

    // Direct Copy Email Button
    const copyEmailBtns = document.querySelectorAll('[data-action="copy-email"]');
    copyEmailBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const email = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.profile.email : 'khaledhassansalam@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Copied!`;
          window.playHapticSound(700);
          if (window.lucide) window.lucide.createIcons();
          setTimeout(() => {
            btn.innerHTML = original;
            if (window.lucide) window.lucide.createIcons();
          }, 2000);
        });
      });
    });
  }

  // --- Mobile Drawer Menu ---
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    const links = menu ? menu.querySelectorAll('a') : [];

    if (!toggleBtn || !menu) return;

    function open() {
      menu.classList.add('open');
      menu.classList.remove('translate-x-full');
      window.playHapticSound(500);
      document.body.style.overflow = 'hidden';
    }

    function close() {
      menu.classList.remove('open');
      menu.classList.add('translate-x-full');
      window.playHapticSound(400);
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    links.forEach(l => l.addEventListener('click', close));
  }

  // --- Back to Top ---
  function initBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.remove('opacity-0', 'pointer-events-none');
        btn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        btn.classList.add('opacity-0', 'pointer-events-none');
        btn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    btn.addEventListener('click', () => {
      window.playHapticSound(600);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Initial Boot ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSoundToggle();
    renderServices();
    renderProjects();
    initFilterTabs();
    initModals();
    renderSkills();
    renderProcess();
    renderExperience();
    renderEducation();
    renderWhyAndPrinciples();
    initTimezoneClock();
    initContactForm();
    initMobileMenu();
    initBackToTop();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
})();
