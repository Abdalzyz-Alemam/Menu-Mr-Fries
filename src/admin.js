import { 
  signInAnonymously, 
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { auth, db } from './firebase.js';
import * as menuService from './menuService.js';
import { menuData } from './menuData.js';

// --- State ---
let categories = [];
let items = [];
let currentView = 'items'; // 'items' or 'categories'

// --- Elements ---
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const adminPassword = document.getElementById('admin-password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const initBtn = document.getElementById('init-btn');

const tabItems = document.getElementById('tab-items');
const tabCategories = document.getElementById('tab-categories');
const itemsView = document.getElementById('items-view');
const categoriesView = document.getElementById('categories-view');

const itemsList = document.getElementById('items-list');
const categoriesList = document.getElementById('categories-list');

const addItemBtn = document.getElementById('add-item-btn');
const addCatBtn = document.getElementById('add-cat-btn');

const modal = document.getElementById('modal');
const catModal = document.getElementById('cat-modal');
const closeModal = document.getElementById('close-modal');
const closeCatModal = document.getElementById('close-cat-modal');

const menuForm = document.getElementById('menu-form');
const catForm = document.getElementById('cat-form');

const itemCategorySelect = document.getElementById('item-category');

// --- Auth Handling ---
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
    if (adminDoc.exists()) {
      showDashboard();
    } else {
      showLogin();
    }
  } else {
    showLogin();
  }
});

async function login() {
  const password = adminPassword.value.trim();
  if (!password) return;

  try {
    const cred = await signInAnonymously(auth);
    // Try to create the admin doc - rule checks for "عزوز 2026"
    await setDoc(doc(db, 'admins', cred.user.uid), {
      secret: password,
      timestamp: Date.now()
    });
    showDashboard();
  } catch (error) {
    console.error("Login failed:", error);
    loginError.classList.remove('hidden');
  }
}

function showDashboard() {
  loginScreen.classList.add('hidden');
  dashboard.classList.remove('hidden');
  initSubscriptions();
}

function showLogin() {
  loginScreen.classList.remove('hidden');
  dashboard.classList.add('hidden');
}

// --- Subscriptions ---
let unsubscribeItems;
let unsubscribeCats;

function initSubscriptions() {
  if (unsubscribeItems) unsubscribeItems();
  if (unsubscribeCats) unsubscribeCats();

  unsubscribeCats = menuService.subscribeToCategories((data) => {
    categories = data;
    renderCategories();
    updateCategorySelect();
  });

  unsubscribeItems = menuService.subscribeToItems((data) => {
    items = data;
    renderItems();
  });
}

// --- Rendering ---
function renderItems() {
  itemsList.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-2xl shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 flex gap-4';
    card.innerHTML = `
      <img src="${item.image}" class="h-20 w-20 rounded-xl object-cover">
      <div class="flex-1">
        <h4 class="font-bold">${item.ar.name}</h4>
        <p class="text-sm text-slate-500">${item.en.name}</p>
        <p class="text-orange-500 font-bold mt-1">${item.price}</p>
      </div>
      <div class="flex flex-col gap-2">
        <button class="edit-item text-blue-500 hover:bg-blue-50 p-2 rounded-lg" data-id="${item.id}">تعديل</button>
        <button class="delete-item text-red-500 hover:bg-red-50 p-2 rounded-lg" data-id="${item.id}">حذف</button>
      </div>
    `;
    itemsList.appendChild(card);
  });

  // Event listeners for Edit/Delete
  document.querySelectorAll('.edit-item').forEach(btn => {
    btn.onclick = () => openItemModal(items.find(i => i.id === btn.dataset.id));
  });
  document.querySelectorAll('.delete-item').forEach(btn => {
    btn.onclick = async () => {
      if (confirm('هل أنت متأكد من حذف هذا الصنف؟')) {
        await menuService.deleteItem(btn.dataset.id);
      }
    };
  });
}

function renderCategories() {
  categoriesList.innerHTML = '';
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-2xl shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 flex justify-between items-center';
    card.innerHTML = `
      <div>
        <h4 class="font-bold">${cat.ar}</h4>
        <p class="text-sm text-slate-500">${cat.en} (${cat.id})</p>
      </div>
      <div class="flex gap-2">
        <button class="edit-cat text-blue-500" data-id="${cat.id}">تعديل</button>
        <button class="delete-cat text-red-500" data-id="${cat.id}">حذف</button>
      </div>
    `;
    categoriesList.appendChild(card);
  });

  document.querySelectorAll('.edit-cat').forEach(btn => {
    btn.onclick = () => openCatModal(categories.find(c => c.id === btn.dataset.id));
  });
  document.querySelectorAll('.delete-cat').forEach(btn => {
    btn.onclick = async () => {
      if (confirm('سيؤدي هذا إلى حذف التصنيف فقط، ولن يتم حذف الأصناف المرتبطة به. هل تريد الاستمرار؟')) {
        const docId = categories.find(c => c.id === btn.dataset.id).id; // Actually we need the Firestore doc ID
        // Note: my fetchCategories returns Firestore doc IDs as 'id'
        await menuService.deleteCategory(btn.dataset.id); 
      }
    };
  });
}

function updateCategorySelect() {
  itemCategorySelect.innerHTML = categories.map(cat => `<option value="${cat.id}">${cat.ar}</option>`).join('');
}

// --- Modals ---
function openItemModal(item = null) {
  document.getElementById('modal-title').textContent = item ? 'تعديل صنف' : 'إضافة صنف جديد';
  document.getElementById('form-id').value = item ? item.id : '';
  document.getElementById('ar-name').value = item ? item.ar.name : '';
  document.getElementById('en-name').value = item ? item.en.name : '';
  document.getElementById('item-price').value = item ? item.price : '';
  document.getElementById('item-image').value = item ? item.image : '';
  document.getElementById('ar-desc').value = item ? item.ar.description : '';
  document.getElementById('en-desc').value = item ? item.en.description : '';
  document.getElementById('item-category').value = item ? item.category : (categories[0]?.id || '');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openCatModal(cat = null) {
  document.getElementById('cat-modal-title').textContent = cat ? 'تعديل تصنيف' : 'إضافة تصنيف جديد';
  document.getElementById('cat-form-id').value = cat ? cat.id : '';
  document.getElementById('cat-id').value = cat ? cat.id : '';
  document.getElementById('cat-ar').value = cat ? cat.ar : '';
  document.getElementById('cat-en').value = cat ? cat.en : '';
  catModal.classList.remove('hidden');
  catModal.classList.add('flex');
}

// --- Forms ---
menuForm.onsubmit = async (e) => {
  e.preventDefault();
  const id = document.getElementById('form-id').value;
  const item = {
    ar: { name: document.getElementById('ar-name').value, description: document.getElementById('ar-desc').value },
    en: { name: document.getElementById('en-name').value, description: document.getElementById('en-desc').value },
    price: parseFloat(document.getElementById('item-price').value),
    image: document.getElementById('item-image').value,
    category: document.getElementById('item-category').value,
  };

  if (id) {
    await menuService.updateItem(id, item);
  } else {
    item.id = Date.now().toString();
    await menuService.addItem(item);
  }
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

catForm.onsubmit = async (e) => {
   e.preventDefault();
   const docId = document.getElementById('cat-form-id').value;
   const cat = {
     id: document.getElementById('cat-id').value,
     ar: document.getElementById('cat-ar').value,
     en: document.getElementById('cat-en').value,
   };

   if (docId) {
     await menuService.updateCategory(docId, cat);
   } else {
     await menuService.addCategory(cat);
   }
   catModal.classList.add('hidden');
   catModal.classList.remove('flex');
};

// --- Initialization ---
async function migrateData() {
  if (!confirm('سيتم رفع جميع البيانات الحالية إلى قواعد البيانات. هل أنت متأكد؟')) return;
  
  // Clear existing (optional, but here we just append)
  for (const cat of menuData.categories.filter(c => c.id !== 'all')) {
    await menuService.addCategory(cat);
  }
  for (const item of menuData.items) {
    await menuService.addItem({ ...item, id: item.id.toString() });
  }
  alert('تم رفع البيانات بنجاح!');
}

// --- Event Listeners ---
loginBtn.onclick = login;
logoutBtn.onclick = () => signOut(auth);
initBtn.onclick = migrateData;

tabItems.onclick = () => {
  currentView = 'items';
  itemsView.classList.remove('hidden');
  categoriesView.classList.add('hidden');
  tabItems.classList.replace('text-slate-500', 'text-orange-500');
  tabItems.classList.replace('border-transparent', 'border-orange-500');
  tabCategories.classList.replace('text-orange-500', 'text-slate-500');
  tabCategories.classList.replace('border-orange-500', 'border-transparent');
};

tabCategories.onclick = () => {
  currentView = 'categories';
  categoriesView.classList.remove('hidden');
  itemsView.classList.add('hidden');
  tabCategories.classList.replace('text-slate-500', 'text-orange-500');
  tabCategories.classList.replace('border-transparent', 'border-orange-500');
  tabItems.classList.replace('text-orange-500', 'text-slate-500');
  tabItems.classList.replace('border-orange-500', 'border-transparent');
};

addItemBtn.onclick = () => openItemModal();
addCatBtn.onclick = () => openCatModal();
closeModal.onclick = () => { modal.classList.add('hidden'); modal.classList.remove('flex'); };
closeCatModal.onclick = () => { catModal.classList.add('hidden'); catModal.classList.remove('flex'); };
