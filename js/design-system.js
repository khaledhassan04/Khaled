/**
 * Interactive Design System Playground
 * Demonstrates UI/UX design tokens, dynamic theming, component state testing, and live token export.
 */

(function () {
  const COLOR_THEMES = {
    violet: {
      name: "Electric Violet",
      primary: "#6366f1",
      primaryHover: "#4f46e5",
      accent: "#ec4899",
      bgSubtle: "rgba(99, 102, 241, 0.12)",
      textOnPrimary: "#ffffff"
    },
    emerald: {
      name: "Cyber Emerald",
      primary: "#10b981",
      primaryHover: "#059669",
      accent: "#06b6d4",
      bgSubtle: "rgba(16, 185, 129, 0.12)",
      textOnPrimary: "#ffffff"
    },
    amber: {
      name: "Solar Amber",
      primary: "#f59e0b",
      primaryHover: "#d97706",
      accent: "#ef4444",
      bgSubtle: "rgba(245, 158, 11, 0.12)",
      textOnPrimary: "#0f172a"
    },
    cyan: {
      name: "Hyper Cyan",
      primary: "#06b6d4",
      primaryHover: "#0891b2",
      accent: "#8b5cf6",
      bgSubtle: "rgba(6, 182, 212, 0.12)",
      textOnPrimary: "#0f172a"
    }
  };

  let currentTheme = 'violet';
  let currentRadius = '12px';
  let currentScale = 1.0;

  function updatePlaygroundUI() {
    const previewContainer = document.getElementById('ds-preview-container');
    const tokenOutput = document.getElementById('ds-token-output');
    if (!previewContainer) return;

    const theme = COLOR_THEMES[currentTheme];

    // Apply CSS variables to preview container
    previewContainer.style.setProperty('--ds-primary', theme.primary);
    previewContainer.style.setProperty('--ds-primary-hover', theme.primaryHover);
    previewContainer.style.setProperty('--ds-accent', theme.accent);
    previewContainer.style.setProperty('--ds-bg-subtle', theme.bgSubtle);
    previewContainer.style.setProperty('--ds-text-on-primary', theme.textOnPrimary);
    previewContainer.style.setProperty('--ds-radius', currentRadius);
    previewContainer.style.setProperty('--ds-scale', currentScale);

    // Update Token Output JSON/CSS
    if (tokenOutput) {
      tokenOutput.textContent = `:root {
  --color-primary: ${theme.primary};
  --color-accent: ${theme.accent};
  --border-radius-base: ${currentRadius};
  --font-scale-ratio: ${currentScale.toFixed(2)};
  --elevation-surface: 0 10px 30px -10px ${theme.bgSubtle};
}`;
    }

    // Update active state in buttons
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      if (btn.dataset.themeBtn === currentTheme) {
        btn.classList.add('ring-2', 'ring-indigo-500', 'scale-105');
      } else {
        btn.classList.remove('ring-2', 'ring-indigo-500', 'scale-105');
      }
    });

    document.querySelectorAll('[data-radius-btn]').forEach(btn => {
      if (btn.dataset.radiusBtn === currentRadius) {
        btn.classList.add('bg-indigo-600', 'text-white');
        btn.classList.remove('bg-slate-800', 'text-slate-300');
      } else {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-300');
      }
    });
  }

  function initListeners() {
    // Theme color switchers
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTheme = btn.dataset.themeBtn;
        if (window.playHapticSound) window.playHapticSound(520);
        updatePlaygroundUI();
      });
    });

    // Radius switchers
    document.querySelectorAll('[data-radius-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentRadius = btn.dataset.radiusBtn;
        if (window.playHapticSound) window.playHapticSound(440);
        updatePlaygroundUI();
      });
    });

    // Type scale slider
    const scaleSlider = document.getElementById('ds-scale-slider');
    const scaleLabel = document.getElementById('ds-scale-label');
    if (scaleSlider) {
      scaleSlider.addEventListener('input', (e) => {
        currentScale = parseFloat(e.target.value);
        if (scaleLabel) scaleLabel.textContent = `${currentScale.toFixed(2)}x`;
        updatePlaygroundUI();
      });
    }

    // Copy Token Code Button
    const copyBtn = document.getElementById('ds-copy-tokens-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const tokenOutput = document.getElementById('ds-token-output');
        if (!tokenOutput) return;

        navigator.clipboard.writeText(tokenOutput.textContent).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = `
            <svg class="w-4 h-4 text-emerald-400 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg> Copied!
          `;
          if (window.playHapticSound) window.playHapticSound(880);
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
          }, 2000);
        });
      });
    }

    // Interactive switch in demo component
    const demoSwitch = document.getElementById('ds-demo-switch');
    if (demoSwitch) {
      demoSwitch.addEventListener('click', () => {
        demoSwitch.classList.toggle('active');
        const knob = demoSwitch.querySelector('.switch-knob');
        if (knob) {
          knob.classList.toggle('translate-x-5');
        }
        if (window.playHapticSound) window.playHapticSound(600);
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initListeners();
      updatePlaygroundUI();
    });
  } else {
    initListeners();
    updatePlaygroundUI();
  }
})();
