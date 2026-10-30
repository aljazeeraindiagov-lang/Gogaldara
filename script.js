/**
 * The Gogaldara - Vanilla JavaScript
 * Designed by Shahid Mir
 * Handles theme toggling, search, notifications, slider, lightbox,
 * forms, FAQ accordions, and localStorage data persistence.
 */

// --- Site Search Index ---
const SITE_DIRECTORY = [
  {
    title: 'Chill Point 35-ft Icicles',
    category: 'Attractions',
    url: 'explore.html#chill-point',
    snippet: 'The iconic winter landmark in Gogaldara featuring colossal 35-foot frozen icicles and pine scenery.',
    keywords: ['chill point', 'icicle', 'ice', 'winter', 'snow', 'tangmarg', 'baramulla', 'frozen']
  },
  {
    title: 'Pine Forests & Alpine Meadows',
    category: 'Nature',
    url: 'about.html#geography',
    snippet: 'Towering deodar pines, silver firs, and lush green meadows bursting with summer wildflowers.',
    keywords: ['pine', 'meadow', 'forest', 'nature', 'flora', 'wildflowers', 'trees', 'fir']
  },
  {
    title: 'History & Gujjar Heritage',
    category: 'Culture',
    url: 'about.html#history',
    snippet: 'Discover Gogaldara’s traditional pastoral roots, shepherd migration routes, and rise as an offbeat gem.',
    keywords: ['history', 'culture', 'gujjar', 'bakrawal', 'tradition', 'shahid mir', 'heritage']
  },
  {
    title: 'Traditional Kashmiri Cuisine & Kahwa',
    category: 'Cuisine',
    url: 'explore.html#food',
    snippet: 'Savor steaming Kashmiri Kahwa with saffron & almonds, Makki ki Roti with butter, and authentic Wazwan.',
    keywords: ['food', 'kahwa', 'tea', 'wazwan', 'rogan josh', 'dining', 'cuisine', 'dum aloo', 'makki']
  },
  {
    title: 'Winter Sledging & Summer Treks',
    category: 'Activities',
    url: 'explore.html#activities',
    snippet: 'Snow sledging down pristine slopes, photography walks, meadow camping, and forest trekking.',
    keywords: ['activities', 'trekking', 'hiking', 'sledging', 'adventure', 'camping', 'walks']
  },
  {
    title: 'Photo Gallery & Lightbox',
    category: 'Gallery',
    url: 'gallery.html',
    snippet: 'High-resolution photo collection of Gogaldara across winter snow, spring blossoms, and autumn gold.',
    keywords: ['gallery', 'photos', 'pictures', 'images', 'lightbox', 'wallpaper', 'scenery']
  },
  {
    title: 'How to Reach Gogaldara',
    category: 'Travel Guide',
    url: 'explore.html#how-to-reach',
    snippet: 'Complete directions: 13 km from Tangmarg town, 60 km from Srinagar Airport, cab and bus options.',
    keywords: ['route', 'distance', 'airport', 'taxi', 'travel', 'reach', 'cab', 'transport', 'srinagar']
  },
  {
    title: 'Settings & Dark Mode',
    category: 'Preferences',
    url: 'settings.html',
    snippet: 'Customize dark/light theme, font size (small, base, large), and notification preferences.',
    keywords: ['settings', 'dark mode', 'theme', 'language', 'font', 'preferences']
  },
  {
    title: 'Help Desk & Traveler FAQs',
    category: 'Support',
    url: 'help.html',
    snippet: 'Common queries on winter tire chains, local guides, homestays, weather, and mobile network connectivity.',
    keywords: ['faq', 'help', 'contact', 'permit', 'stay', 'hotels', 'homestays', 'network', 'jio']
  },
  {
    title: 'Share Feedback & Reviews',
    category: 'Community',
    url: 'feedback.html',
    snippet: 'Leave your rating and review for The Gogaldara, designed and curated by Shahid Mir.',
    keywords: ['feedback', 'review', 'rating', 'stars', 'comments', 'testimonials', 'form']
  },
  {
    title: 'Site Menu & Directory',
    category: 'Navigation',
    url: 'menu.html',
    snippet: 'Structured overview and links to every section of The Gogaldara website.',
    keywords: ['menu', 'pages', 'sitemap', 'navigation', 'directory']
  }
];

// --- Default Notifications ---
const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Chill Point Winter Active',
    message: 'The natural 35-ft icicles are fully formed at Chill Point! Pack heavy woolens and snow boots.',
    time: '2 hours ago',
    read: false,
    type: 'weather'
  },
  {
    id: 'notif-2',
    title: 'Road Advisory: Tangmarg to Gogaldara',
    message: 'Road clear for light vehicles and cabs. Anti-skid chains recommended during morning frost.',
    time: '5 hours ago',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-3',
    title: 'Welcome from Shahid Mir',
    message: 'Welcome to the official portal for The Gogaldara! Discover North Kashmir’s tranquil sanctuary.',
    time: '1 day ago',
    read: true,
    type: 'update'
  }
];

// --- Storage Keys ---
const STORAGE_KEYS = {
  THEME: 'gogaldara_theme',
  FONT_SIZE: 'gogaldara_fontsize',
  LANGUAGE: 'gogaldara_lang',
  NOTIFICATIONS: 'gogaldara_notifications',
  CURRENT_USER: 'gogaldara_current_user',
  USERS: 'gogaldara_users',
  FEEDBACK: 'gogaldara_feedback'
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFontSize();
  initNavbar();
  initSearch();
  initNotifications();
  initUserSession();
  initScrollReveal();
  initHeroSlider();
  initLightbox();
  initFAQ();
  initForms();
  initSettingsPage();
});


// --- Theme Management ---
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  applyTheme(savedTheme);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  });
}

function applyTheme(theme) {
  const root = document.documentElement;
  const toggleIcons = document.querySelectorAll('.theme-toggle-icon');
  
  if (theme === 'dark') {
    root.classList.add('dark');
    localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    toggleIcons.forEach(icon => {
      icon.className = 'fas fa-sun theme-toggle-icon text-amber-400';
    });
  } else {
    root.classList.remove('dark');
    localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    toggleIcons.forEach(icon => {
      icon.className = 'fas fa-moon theme-toggle-icon text-slate-700';
    });
  }
}

// --- Font Size Management ---
function initFontSize() {
  const savedSize = localStorage.getItem(STORAGE_KEYS.FONT_SIZE) || 'base';
  applyFontSize(savedSize);
}

function applyFontSize(size) {
  const root = document.documentElement;
  root.classList.remove('font-size-sm', 'font-size-base', 'font-size-lg');
  root.classList.add(`font-size-${size}`);
  localStorage.setItem(STORAGE_KEYS.FONT_SIZE, size);
}

// --- Navbar & Mobile Drawer ---
function initNavbar() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('open');
      drawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  
  const bottomMenuBtn = document.getElementById('mobile-bottom-menu-btn');
  if (bottomMenuBtn) bottomMenuBtn.addEventListener('click', openDrawer);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeDrawer();
    }
  });
}

// --- Search Functionality ---
function initSearch() {
  const searchInputs = [
    document.getElementById('nav-search-input'),
    document.getElementById('drawer-search-input'),
    document.getElementById('hero-search-input'),
    document.getElementById('gallery-search-input')
  ].filter(Boolean);

  searchInputs.forEach(input => {
    const parent = input.closest('.search-container') || input.parentElement;
    let dropdown = parent.querySelector('.search-results-dropdown') || document.getElementById('hero-search-dropdown');
    
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-results-dropdown';
      parent.style.position = 'relative';
      parent.appendChild(dropdown);
    }

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        dropdown.classList.remove('show');
        dropdown.classList.add('hidden');
        dropdown.innerHTML = '';
        return;
      }

      const matches = SITE_DIRECTORY.filter(item => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.snippet.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some(k => k.toLowerCase().includes(q))
        );
      });

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div class="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
            <i class="fas fa-mountain text-slate-400 mb-1 block text-lg"></i>
            No results found for "${escapeHtml(q)}". Try "Chill Point", "Food", or "Trekking".
          </div>
        `;
      } else {
        dropdown.innerHTML = `
          <div class="p-2 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-400 px-3">
            Search Results (${matches.length})
          </div>
          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            ${matches.map(m => `
              <a href="${m.url}" class="block p-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                <div class="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">
                  <span>${m.category}</span>
                  <i class="fas fa-chevron-right text-[10px] text-slate-400"></i>
                </div>
                <div class="text-sm font-semibold text-slate-900 dark:text-white">${highlightMatch(m.title, q)}</div>
                <div class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">${m.snippet}</div>
              </a>
            `).join('')}
          </div>
        `;
      }
      dropdown.classList.add('show');
      dropdown.classList.remove('hidden');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!parent.contains(e.target)) {
        dropdown.classList.remove('show');
        dropdown.classList.add('hidden');
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('show');
        dropdown.classList.add('hidden');
      }
    });
  });

  // Global Ctrl+K / Cmd+K search shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const target = document.getElementById('hero-search-input') || document.getElementById('nav-search-input');
      if (target) {
        target.focus();
        target.select();
      }
    }
  });

  // Global Quick Search trigger for pills & buttons
  window.quickSearch = function(query) {
    const input = document.getElementById('hero-search-input') || document.getElementById('nav-search-input');
    if (input) {
      input.value = query;
      input.focus();
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  window.handleHeroSearch = function() {
    const input = document.getElementById('hero-search-input');
    if (input && input.value.trim()) {
      window.quickSearch(input.value.trim());
    }
  };
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-amber-200 dark:bg-amber-800/60 text-slate-900 dark:text-white rounded px-0.5">$1</mark>');
}

// --- Notifications Center ---
function initNotifications() {
  const notifBtn = document.getElementById('notif-bell-btn');
  const notifMenu = document.getElementById('notif-dropdown');
  const notifBadge = document.getElementById('notif-badge');
  const notifList = document.getElementById('notif-list');
  const markAllBtn = document.getElementById('notif-mark-all');

  function getNotifications() {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  }

  function saveNotifications(data) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(data));
    renderNotifications();
  }

  function renderNotifications() {
    const list = getNotifications();
    const unreadCount = list.filter(n => !n.read).length;

    if (notifBadge) {
      if (unreadCount > 0) {
        notifBadge.textContent = unreadCount;
        notifBadge.classList.remove('hidden');
      } else {
        notifBadge.classList.add('hidden');
      }
    }

    if (notifList) {
      if (list.length === 0) {
        notifList.innerHTML = `<div class="p-6 text-center text-sm text-slate-400">No notifications</div>`;
        return;
      }

      notifList.innerHTML = list.map(item => `
        <div class="p-3.5 border-b border-slate-100 dark:border-slate-800 transition-colors flex items-start gap-3 ${item.read ? 'opacity-70 bg-transparent' : 'bg-emerald-50/50 dark:bg-emerald-950/20'}" data-id="${item.id}">
          <div class="mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${item.type === 'weather' ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'}">
            <i class="fas ${item.type === 'weather' ? 'fa-snowflake' : 'fa-bell'} text-xs"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-0.5">
              <h4 class="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">${escapeHtml(item.title)}</h4>
              <span class="text-[10px] text-slate-400 ml-2 whitespace-nowrap">${item.time}</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-snug">${escapeHtml(item.message)}</p>
            ${!item.read ? `<button class="mark-single-read-btn text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline mt-1 font-medium" data-id="${item.id}">Mark as read</button>` : ''}
          </div>
        </div>
      `).join('');

      // Add click handlers for mark single as read
      notifList.querySelectorAll('.mark-single-read-btn').forEach(b => {
        b.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = b.getAttribute('data-id');
          const current = getNotifications();
          const updated = current.map(n => n.id === id ? { ...n, read: true } : n);
          saveNotifications(updated);
        });
      });
    }
  }

  if (notifBtn && notifMenu) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!notifMenu.contains(e.target) && !notifBtn.contains(e.target)) {
        notifMenu.classList.remove('show');
      }
    });
  }

  if (markAllBtn) {
    markAllBtn.addEventListener('click', () => {
      const current = getNotifications();
      const updated = current.map(n => ({ ...n, read: true }));
      saveNotifications(updated);
      showToast('All notifications marked as read', 'success');
    });
  }

  renderNotifications();
}

// --- User Authentication / Session ---
function initUserSession() {
  const user = getCurrentUser();
  const authButtons = document.querySelectorAll('.nav-auth-container');

  authButtons.forEach(container => {
    if (user) {
      container.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shadow">
            ${user.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div class="hidden md:block text-left text-xs">
            <div class="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">${escapeHtml(user.name || 'Traveler')}</div>
            <div class="text-[10px] text-emerald-600 dark:text-emerald-400">Signed In</div>
          </div>
          <button id="logout-btn" class="ml-1 text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium px-2 py-1 rounded border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all">
            Logout
          </button>
        </div>
      `;
      const logoutBtn = container.querySelector('#logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
          showToast('Signed out successfully', 'info');
          setTimeout(() => window.location.reload(), 400);
        });
      }
    } else {
      container.innerHTML = `
        <div class="flex items-center gap-2">
          <a href="login.html" class="text-xs font-medium text-emerald-900 dark:text-emerald-300 hover:text-amber-600 px-3 py-1.5 rounded-lg border border-emerald-900/20 dark:border-emerald-400/20 transition-colors">
            Login
          </a>
          <a href="signup.html" class="text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg shadow-sm hover:shadow transition-all">
            Sign Up
          </a>
        </div>
      `;
    }
  });
}

function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// --- Scroll Reveal ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }
}

// --- Hero Image Slider ---
function initHeroSlider() {
  const slider = document.querySelector('.slider-container');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dotsContainer = slider.querySelector('.slider-dots');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let timer = null;

  // Generate dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all ${idx === 0 ? 'bg-amber-400 w-8' : 'bg-white/60 hover:bg-white'}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.className = 'w-8 h-3 rounded-full bg-amber-400 transition-all';
      } else {
        dot.className = 'w-3 h-3 rounded-full bg-white/60 hover:bg-white transition-all';
      }
    });
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateDots();
    resetTimer();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  function startTimer() {
    timer = setInterval(nextSlide, 5500);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) prevSlide();
  }, { passive: true });

  startTimer();
}

// --- Lightbox Modal ---
let lightboxItems = [];
let currentLightboxIdx = 0;

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  lightboxItems = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || img?.alt || 'Gogaldara Vista';
    const category = item.getAttribute('data-category') || 'Landscape';
    const src = img?.getAttribute('src') || '';
    return { title, category, src };
  });

  let modal = document.getElementById('lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="absolute top-4 right-4 flex items-center gap-3 z-50">
        <button id="lightbox-zoom-btn" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" title="Toggle Zoom">
          <i class="fas fa-search-plus"></i>
        </button>
        <button id="lightbox-close-btn" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" title="Close Lightbox">
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <button id="lightbox-prev-btn" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-50" title="Previous Image">
        <i class="fas fa-chevron-left text-lg"></i>
      </button>

      <button id="lightbox-next-btn" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-50" title="Next Image">
        <i class="fas fa-chevron-right text-lg"></i>
      </button>

      <div class="lightbox-image-wrap">
        <img id="lightbox-img" class="lightbox-image" src="" alt="Gogaldara Fullscreen View">
        <div class="text-center mt-3 text-white">
          <div id="lightbox-category" class="text-xs uppercase tracking-wider text-amber-400 font-medium"></div>
          <h3 id="lightbox-title" class="text-base font-semibold"></h3>
          <div id="lightbox-counter" class="text-xs text-slate-400 mt-1"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modalImg = modal.querySelector('#lightbox-img');
  const titleEl = modal.querySelector('#lightbox-title');
  const catEl = modal.querySelector('#lightbox-category');
  const counterEl = modal.querySelector('#lightbox-counter');
  const closeBtn = modal.querySelector('#lightbox-close-btn');
  const prevBtn = modal.querySelector('#lightbox-prev-btn');
  const nextBtn = modal.querySelector('#lightbox-next-btn');
  const zoomBtn = modal.querySelector('#lightbox-zoom-btn');

  function openLightbox(idx) {
    currentLightboxIdx = idx;
    const item = lightboxItems[currentLightboxIdx];
    if (!item) return;

    modalImg.src = item.src;
    modalImg.alt = item.title;
    titleEl.textContent = item.title;
    catEl.textContent = item.category;
    counterEl.textContent = `Image ${currentLightboxIdx + 1} of ${lightboxItems.length}`;
    modalImg.classList.remove('zoomed');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    openLightbox((currentLightboxIdx + 1) % lightboxItems.length);
  }

  function showPrev() {
    openLightbox((currentLightboxIdx - 1 + lightboxItems.length) % lightboxItems.length);
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  if (zoomBtn) {
    zoomBtn.addEventListener('click', () => {
      modalImg.classList.toggle('zoomed');
      const isZoomed = modalImg.classList.contains('zoomed');
      zoomBtn.innerHTML = isZoomed ? '<i class="fas fa-search-minus"></i>' : '<i class="fas fa-search-plus"></i>';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-image-wrap')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Filter Buttons in gallery.html
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('bg-emerald-800', 'text-white'));
        filterBtns.forEach(b => b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200'));
        btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
        btn.classList.add('bg-emerald-800', 'text-white');

        const filter = btn.getAttribute('data-filter') || 'all';
        galleryItems.forEach(card => {
          const category = card.getAttribute('data-category')?.toLowerCase() || '';
          const targetFilter = filter.toLowerCase();
          if (filter === 'all' || category === targetFilter || category.includes(targetFilter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

// --- FAQ Accordions ---
function initFAQ() {
  const faqItems = document.querySelectorAll('.accordion-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Collapse other accordions in the same group
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // Search filter for FAQs
  const faqSearch = document.getElementById('faq-search-input');
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

// --- Forms & Validation ---
function initForms() {
  // Password Show/Hide Toggle
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.innerHTML = isPassword ? '<i class="fas fa-eye-slash text-slate-400"></i>' : '<i class="fas fa-eye text-slate-400"></i>';
    });
  });

  // Password Strength Meter in signup.html
  const signupPassInput = document.getElementById('signup-password');
  const strengthMeter = document.getElementById('password-strength-meter');
  const strengthText = document.getElementById('password-strength-text');

  if (signupPassInput && strengthMeter && strengthText) {
    signupPassInput.addEventListener('input', (e) => {
      const val = e.target.value;
      const strength = evaluatePassword(val);
      strengthMeter.style.width = `${strength.score}%`;
      strengthMeter.style.backgroundColor = strength.color;
      strengthText.textContent = strength.label;
      strengthText.style.color = strength.color;

      // Update checkmark list
      updateRuleCheck('rule-length', val.length >= 8);
      updateRuleCheck('rule-upper', /[A-Z]/.test(val));
      updateRuleCheck('rule-number', /[0-9]/.test(val));
      updateRuleCheck('rule-special', /[^A-Za-z0-9]/.test(val));
    });
  }

  function updateRuleCheck(id, pass) {
    const el = document.getElementById(id);
    if (!el) return;
    const icon = el.querySelector('i');
    if (pass) {
      el.classList.add('text-emerald-600', 'dark:text-emerald-400');
      el.classList.remove('text-slate-400');
      if (icon) icon.className = 'fas fa-check-circle text-emerald-500';
    } else {
      el.classList.remove('text-emerald-600', 'dark:text-emerald-400');
      el.classList.add('text-slate-400');
      if (icon) icon.className = 'fas fa-circle text-[8px] text-slate-400';
    }
  }

  // Signup Form Submit
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name')?.value.trim();
      const email = document.getElementById('signup-email')?.value.trim();
      const pass = document.getElementById('signup-password')?.value;
      const confirmPass = document.getElementById('signup-confirm-password')?.value;
      const terms = document.getElementById('signup-terms')?.checked;

      if (!name || !email || !pass) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showToast('Please provide a valid email address.', 'error');
        return;
      }
      if (pass.length < 8) {
        showToast('Password must be at least 8 characters long.', 'error');
        return;
      }
      if (pass !== confirmPass) {
        showToast('Passwords do not match.', 'error');
        return;
      }
      if (!terms) {
        showToast('Please accept the travel terms and conditions.', 'error');
        return;
      }

      // Save user to localStorage
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      } catch { users = []; }

      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast('An account with this email already exists.', 'error');
        return;
      }

      const newUser = { name, email, createdAt: new Date().toISOString() };
      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

      showToast(`Welcome to The Gogaldara, ${name}! Redirecting...`, 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    });
  }

  // Login Form Submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value.trim();
      const pass = document.getElementById('login-password')?.value;

      if (!email || !pass) {
        showToast('Please enter your email and password.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      let users = [];
      try {
        users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      } catch { users = []; }

      // Also allow default demo traveler
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
        name: email.split('@')[0],
        email: email
      };

      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(found));
      showToast(`Welcome back, ${found.name}!`, 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }

  // Star Rating Interaction on feedback.html
  const starContainer = document.getElementById('star-rating-container');
  const ratingInput = document.getElementById('feedback-rating');
  if (starContainer && ratingInput) {
    const stars = starContainer.querySelectorAll('.fa-star');
    let selectedRating = 5;

    function setStars(val) {
      stars.forEach(s => {
        const r = parseInt(s.getAttribute('data-value'), 10);
        if (r <= val) {
          s.classList.remove('far', 'text-slate-300');
          s.classList.add('fas', 'text-amber-400');
        } else {
          s.classList.remove('fas', 'text-amber-400');
          s.classList.add('far', 'text-slate-300');
        }
      });
    }

    stars.forEach(s => {
      s.addEventListener('mouseenter', () => {
        const val = parseInt(s.getAttribute('data-value'), 10);
        setStars(val);
      });
      s.addEventListener('click', () => {
        selectedRating = parseInt(s.getAttribute('data-value'), 10);
        ratingInput.value = selectedRating;
        setStars(selectedRating);
      });
    });

    starContainer.addEventListener('mouseleave', () => {
      setStars(selectedRating);
    });

    setStars(selectedRating);
  }

  // Feedback Form Submit
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('feedback-name')?.value.trim();
      const email = document.getElementById('feedback-email')?.value.trim();
      const category = document.getElementById('feedback-category')?.value || 'Experience';
      const rating = parseInt(document.getElementById('feedback-rating')?.value || '5', 10);
      const message = document.getElementById('feedback-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in your name, email, and feedback message.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      let reviews = [];
      try {
        reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || '[]');
      } catch { reviews = []; }

      const newReview = {
        name,
        email,
        category,
        rating,
        message,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      reviews.unshift(newReview);
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(reviews));

      // Reset form
      feedbackForm.reset();
      const successBox = document.getElementById('feedback-success-msg');
      if (successBox) {
        successBox.classList.remove('hidden');
        successBox.scrollIntoView({ behavior: 'smooth' });
      }

      showToast('Thank you for your feedback on The Gogaldara!', 'success');
      renderRecentFeedback();
    });

    renderRecentFeedback();
  }
}

function renderRecentFeedback() {
  const container = document.getElementById('recent-feedback-list');
  if (!container) return;

  const sampleReviews = [
    {
      name: 'Dr. Tariq Farooq',
      rating: 5,
      category: 'Winter Chill Point',
      date: 'Oct 24, 2026',
      message: 'The 35-foot icicles at Chill Point are mesmerising! Shahid Mir’s travel tips were accurate and saved us from icy road mishaps.'
    },
    {
      name: 'Ananya Sharma',
      rating: 5,
      category: 'Summer Trekking',
      date: 'Aug 12, 2026',
      message: 'So much quieter and more soulful than Gulmarg. Pristine meadows, fragrant pine needle trails, and lovely warm Kahwa from locals.'
    },
    {
      name: 'Zubair Ahmad Dar',
      rating: 5,
      category: 'Local Hospitality',
      date: 'Jan 15, 2026',
      message: 'Authentic Kashmiri rural hospitality at its finest. Makki ki roti with fresh butter by the log fire is unforgettable.'
    }
  ];

  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || '[]');
  } catch { stored = []; }

  const allReviews = [...stored, ...sampleReviews];

  container.innerHTML = allReviews.map(r => `
    <div class="nature-card p-5">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
            ${escapeHtml(r.name[0])}
          </div>
          <div>
            <h4 class="text-sm font-semibold text-slate-900 dark:text-white">${escapeHtml(r.name)}</h4>
            <span class="text-[11px] text-amber-600 dark:text-amber-400 font-medium">${escapeHtml(r.category)}</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-amber-400 text-xs">
            ${Array.from({ length: 5 }).map((_, i) => `<i class="fa${i < r.rating ? 's' : 'r'} fa-star"></i>`).join('')}
          </div>
          <span class="text-[10px] text-slate-400">${r.date}</span>
        </div>
      </div>
      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">${escapeHtml(r.message)}</p>
    </div>
  `).join('');
}

// --- Settings Page Handler ---
function initSettingsPage() {
  const themeSelect = document.getElementById('setting-theme');
  const fontSelect = document.getElementById('setting-fontsize');
  const langSelect = document.getElementById('setting-language');
  const notifWeatherCheck = document.getElementById('setting-notif-weather');
  const notifToursCheck = document.getElementById('setting-notif-tours');
  const clearDataBtn = document.getElementById('clear-data-btn');
  const saveSettingsBtn = document.getElementById('save-settings-btn');

  if (themeSelect) {
    themeSelect.value = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    themeSelect.addEventListener('change', (e) => {
      applyTheme(e.target.value);
    });
  }

  if (fontSelect) {
    fontSelect.value = localStorage.getItem(STORAGE_KEYS.FONT_SIZE) || 'base';
    fontSelect.addEventListener('change', (e) => {
      applyFontSize(e.target.value);
    });
  }

  if (langSelect) {
    langSelect.value = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en';
  }

  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      if (themeSelect) applyTheme(themeSelect.value);
      if (fontSelect) applyFontSize(fontSelect.value);
      if (langSelect) localStorage.setItem(STORAGE_KEYS.LANGUAGE, langSelect.value);

      showToast('Settings saved successfully!', 'success');
    });
  }

  if (clearDataBtn) {
    clearDataBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all cached preferences, bookmarks and session data?')) {
        localStorage.clear();
        showToast('All local data cleared. Resetting default view...', 'info');
        setTimeout(() => window.location.reload(), 800);
      }
    });
  }
}

// --- Helper Functions ---
function evaluatePassword(pass) {
  let score = 0;
  if (!pass) return { score: 0, label: 'Too Short', color: '#94a3b8' };
  if (pass.length >= 6) score += 20;
  if (pass.length >= 8) score += 20;
  if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 20;
  if (/[0-9]/.test(pass)) score += 20;
  if (/[^A-Za-z0-9]/.test(pass)) score += 20;

  if (score <= 20) return { score, label: 'Weak', color: '#ef4444' };
  if (score <= 40) return { score, label: 'Fair', color: '#f97316' };
  if (score <= 60) return { score, label: 'Medium', color: '#eab308' };
  if (score <= 80) return { score, label: 'Strong', color: '#22c55e' };
  return { score: 100, label: 'Very Strong', color: '#10b981' };
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'fa-info-circle text-sky-500';
  if (type === 'success') icon = 'fa-check-circle text-emerald-500';
  if (type === 'error') icon = 'fa-exclamation-circle text-rose-500';

  toast.innerHTML = `
    <i class="fas ${icon} text-base flex-shrink-0"></i>
    <span class="text-xs font-medium">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
