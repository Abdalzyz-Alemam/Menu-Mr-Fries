import { menuData } from './menuData.js';

// --- State Management ---
let currentLang = 'en'; // 'en' or 'ar'
let currentCategory = 'all';
let searchQuery = '';
let isDarkMode = false;

// --- UI Strings ---
const translations = {
  en: {
    brand: "MR. FRIES",
    heroTitle: 'MR. FRIES... <span class="text-orange-500">Irresistible</span> Taste.',
    heroSubtitle: "Discover the best loaded fries, unique Indomie mixes, and crispy chicken meals in town.",
    searchLabel: "Search Menu",
    searchPlaceholder: "What are you craving?",
    noResults: "No items found matching your search.",
    orderWhatsapp: "Order via WhatsApp",
    footerDesc: "Mr. Fries... Irresistible Taste",
    currency: "SDG"
  },
  ar: {
    brand: "مستر فرايز",
    heroTitle: 'مستر فرايز... طعم <span class="text-orange-500">لا يقاوم</span>.',
    heroSubtitle: "اكتشف أفضل أنواع الفرايز المحملة، خلطات الاندومي المميزة، ووجبات الكريسبي الشهية.",
    searchLabel: "البحث في القائمة",
    searchPlaceholder: "ماذا تشتهي اليوم؟",
    noResults: "لم يتم العثور على نتائج تطابق بحثك.",
    orderWhatsapp: "اطلب عبر واتساب",
    footerDesc: "مستر فرايز ... طعم لا يقاوم",
    currency: "ج.س"
  }
};

// --- DOM Elements ---
const menuGrid = document.getElementById('menu-grid');
const categoryFilters = document.getElementById('category-filters');
const searchInput = document.getElementById('search-input');
const langSwitch = document.getElementById('lang-switch');
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const emptyState = document.getElementById('empty-state');

// UI Element References for Translation
const brandName = document.getElementById('brand-name');
const heroTitle = document.getElementById('hero-title');
const heroSubtitle = document.getElementById('hero-subtitle');
const searchLabel = document.getElementById('search-label');
const noResultsMsg = document.getElementById('no-results-msg');
const whatsappBtnText = document.getElementById('whatsapp-btn-text');
const footerTitle = document.getElementById('footer-title');
const footerDesc = document.getElementById('footer-desc');

// --- Initialization ---
function init() {
  renderCategories();
  renderMenu();
  updateUILanguage();
  setupEventListeners();
  
  // Check system preference for dark mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleTheme(true);
  }
}

// --- Functions ---

function setupEventListeners() {
  // Search
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderMenu();
  });

  // Language Toggle
  langSwitch.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    updateUILanguage();
    renderCategories(); // Rerender to update button text
    renderMenu();
  });

  // Theme Toggle
  themeToggle.addEventListener('click', () => {
    toggleTheme(!isDarkMode);
  });
}

function toggleTheme(forceDark) {
  isDarkMode = forceDark;
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
}

function updateUILanguage() {
  const t = translations[currentLang];
  brandName.textContent = t.brand;
  heroTitle.innerHTML = t.heroTitle;
  heroSubtitle.textContent = t.heroSubtitle;
  searchLabel.textContent = t.searchLabel;
  searchInput.placeholder = t.searchPlaceholder;
  noResultsMsg.textContent = t.noResults;
  whatsappBtnText.textContent = t.orderWhatsapp;
  footerTitle.textContent = t.brand;
  footerDesc.textContent = t.footerDesc;
}

function renderCategories() {
  categoryFilters.innerHTML = '';
  menuData.categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `rounded-full px-5 py-2 text-sm font-semibold transition-all ${
      currentCategory === cat.id 
      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
      : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
    }`;
    btn.textContent = cat[currentLang];
    btn.onclick = () => {
      currentCategory = cat.id;
      renderCategories();
      renderMenu();
    };
    categoryFilters.appendChild(btn);
  });
}

function renderMenu() {
  menuGrid.innerHTML = '';
  
  const filteredItems = menuData.items.filter(item => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const name = item[currentLang].name.toLowerCase();
    const desc = item[currentLang].description.toLowerCase();
    const matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filteredItems.length === 0) {
    emptyState.classList.remove('hidden');
    menuGrid.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    menuGrid.classList.remove('hidden');
    
    filteredItems.forEach((item, index) => {
      const card = createMenuCard(item, index);
      menuGrid.appendChild(card);
    });
  }
}

function createMenuCard(item, index) {
  const div = document.createElement('div');
  div.className = 'menu-card group overflow-hidden rounded-3xl bg-white p-2 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 animate-fade-in';
  div.style.animationDelay = `${index * 0.05}s`;
  
  const langData = item[currentLang];
  const t = translations[currentLang];
  
  div.innerHTML = `
    <div class="relative h-56 w-full overflow-hidden rounded-2xl">
      <img src="${item.image}" alt="${langData.name}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
      <div class="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold shadow-sm backdrop-blur-sm dark:bg-slate-900/90">
        ${currentLang === 'en' ? t.currency + ' ' + item.price.toFixed(3) : item.price.toFixed(3) + ' ' + t.currency}
      </div>
    </div>
    <div class="p-4">
      <h3 class="mb-2 text-xl font-bold tracking-tight">${langData.name}</h3>
      <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-400">${langData.description}</p>
    </div>
  `;
  
  return div;
}

// Run init
init();
