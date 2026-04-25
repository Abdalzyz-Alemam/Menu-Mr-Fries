import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase.js';

export const CATEGORIES_COLLECTION = 'categories';
export const ITEMS_COLLECTION = 'items';

export async function fetchCategories() {
  const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function fetchItems() {
  const q = query(collection(db, ITEMS_COLLECTION), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export function subscribeToCategories(callback) {
  const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('order', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
}

export function subscribeToItems(callback) {
  const q = query(collection(db, ITEMS_COLLECTION), orderBy('order', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
}

// Admin functions
export async function addCategory(category) {
  return await addDoc(collection(db, CATEGORIES_COLLECTION), {
    ...category,
    order: category.order || Date.now()
  });
}

export async function updateCategory(id, category) {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  return await updateDoc(docRef, category);
}

export async function deleteCategory(id) {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  return await deleteDoc(docRef);
}

export async function addItem(item) {
  return await addDoc(collection(db, ITEMS_COLLECTION), {
    ...item,
    order: item.order || Date.now()
  });
}

export async function updateItem(id, item) {
  const docRef = doc(db, ITEMS_COLLECTION, id);
  return await updateDoc(docRef, item);
}

export async function deleteItem(id) {
  const docRef = doc(db, ITEMS_COLLECTION, id);
  return await deleteDoc(docRef);
}
