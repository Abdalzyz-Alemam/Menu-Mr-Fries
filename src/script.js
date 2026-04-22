import { menuData } from './menuData.js';

// --- State Management ---
let currentLang = 'ar'; // Default to Arabic
let currentCategory = 'all';
let searchQuery = '';
let isDarkMode = false;

// --- UI Strings ---
const translations = {
  en: {
    brand: "QUNAIF PIZZA",
    heroTitle: 'Qunaif... <span class="text-orange-500">Traditional</span> Taste.',
    heroSubtitle: "The finest Levant pies, gourmet pizzas, and fresh juices since 1998.",
    searchLabel: "Search Menu",
    searchPlaceholder: "What are you craving?",
    noResults: "No items found matching your search.",
    devBy: 'Developed by <a href="https://menutop.vercel.app" target="_blank" rel="noopener noreferrer" class="font-bold text-orange-500 hover:underline">MenuTop</a>',
    footerDesc: "Qunaif... Traditional Taste",
    currency: "SDG"
  },
  ar: {
    brand: "قنيف للبيتزا والفطائر",
    heroTitle: 'قنيف... الطعم <span class="text-orange-500">المميز</span> الأصيل.',
    heroSubtitle: "أجود أنواع الفطائر الشامية، البيتزا الفاخرة، والعصائر الطبيعية.",
    searchLabel: "البحث في القائمة",
    searchPlaceholder: "ماذا تشتهي اليوم؟",
    noResults: "لم يتم العثور على نتائج تطابق بحثك.",
    devBy: 'تم التطوير بواسطة <a href="https://menutop.vercel.app" target="_blank" rel="noopener noreferrer" class="font-bold text-orange-500 hover:underline">منيو توب</a>',
    footerDesc: "قنيف... طعم لا يقاوم",
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
const developerCredit = document.getElementById('developer-credit');
const footerTitle = document.getElementById('footer-title');
const footerDesc = document.getElementById('footer-desc');

// --- Initialization ---
function init() {
  // Set Arabic as default direction and language
  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'ar';
  
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
  developerCredit.innerHTML = t.devBy;
  footerTitle.textContent = t.brand;
  footerDesc.textContent = t.footerDesc;
}

function renderCategories() {
  categoryFilters.innerHTML = '';
  menuData.categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all shrink-0 ${
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
  div.className = 'menu-card group overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 animate-fade-in';
  div.style.animationDelay = `${index * 0.05}s`;
  
  const langData = item[currentLang];
  const t = translations[currentLang];
  
  div.innerHTML = `
    <div class="relative h-40 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 md:h-56">
      <!-- Loading Skeleton -->
      <div class="absolute inset-0 animate-pulse-slow bg-slate-200 dark:bg-slate-700"></div>
      
      <img src="${item.image}" 
           alt="${langData.name}" 
           class="relative z-10 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-110" 
           loading="lazy"
           onload="this.classList.remove('opacity-0'); this.previousElementSibling.style.display='none';">
           
      <div class="absolute right-2 top-2 z-20 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold shadow-sm backdrop-blur-sm dark:bg-slate-900/90 md:right-3 md:top-3 md:px-3 md:py-1 md:text-sm">
        ${currentLang === 'en' ? t.currency + ' ' + item.price.toFixed(3) : item.price.toFixed(3) + ' ' + t.currency}
      </div>
    </div>
    <div class="p-3">
      <h3 class="mb-1 text-sm font-bold tracking-tight md:text-lg">${langData.name}</h3>
      <p class="line-clamp-2 text-[10px] leading-tight text-slate-500 dark:text-slate-400 md:text-sm md:leading-relaxed">${langData.description}</p>
    </div>
  `;
  
  return div;
}

// Run init
init();
