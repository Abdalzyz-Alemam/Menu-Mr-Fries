import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  User, 
  Moon, 
  Sun,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  LogIn,
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { auth, loginWithGoogle, logout } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import * as dbService from '../lib/firestoreService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---

const INITIAL_CATEGORIES = [
  { id: '1', name_ar: 'البيتزا', name_en: 'Pizza', count: 12 },
  { id: '2', name_ar: 'الفطائر', name_en: 'Pies', count: 18 },
  { id: '3', name_ar: 'العصائر', name_en: 'Juices', count: 8 },
  { id: '4', name_ar: 'المقبلات', name_en: 'Appetizers', count: 6 },
];

const INITIAL_PRODUCTS = [
  { id: '1', name_ar: 'بيتزا مارجريتا', category: 'البيتزا', price: 35, stock: 45, status: 'نشط' },
  { id: '2', name_ar: 'فطيرة لبنة بالزعتر', category: 'الفطائر', price: 15, stock: 0, status: 'نفذ' },
  { id: '3', name_ar: 'عصير برتقال طازج', category: 'العصائر', price: 12, stock: 120, status: 'نشط' },
  { id: '4', name_ar: 'بيتزا خضار', category: 'البيتزا', price: 40, stock: 22, status: 'نشط' },
  { id: '5', name_ar: 'فطيرة جبن عكاوي', category: 'الفطائر', price: 18, stock: 8, status: 'منخفض' },
];

const CHART_DATA = [
  { name: 'السبت', sales: 4000 },
  { name: 'الأحد', sales: 3000 },
  { name: 'الاثنين', sales: 2000 },
  { name: 'الثلاثاء', sales: 2780 },
  { name: 'الأربعاء', sales: 1890 },
  { name: 'الخميس', sales: 2390 },
  { name: 'الجمعة', sales: 3490 },
];

const CATEGORY_CHART = [
  { name: 'البيتزا', value: 400 },
  { name: 'الفطائر', value: 300 },
  { name: 'العصائر', value: 300 },
  { name: 'أخرى', value: 200 },
];

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#6366f1'];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors",
      active 
        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" 
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
    )}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const Card = ({ children, className }: any) => (
  <div className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900", className)}>
    {children}
  </div>
);

const StatsCard = ({ title, value, icon: Icon, trend, colorClass }: any) => (
  <Card>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="mt-1 text-2xl font-bold dark:text-white">{value}</h3>
        {trend && (
          <p className={cn("mt-1 text-xs font-medium", trend > 0 ? "text-emerald-500" : "text-rose-500")}>
            {trend > 0 ? "+" : ""}{trend}% مقارنة بالشهر السابق
          </p>
        )}
      </div>
      <div className={cn("rounded-full p-3", colorClass)}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </Card>
);

const Modal = ({ isOpen, onClose, title, children }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 overflow-hidden"
        >
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h3 className="text-xl font-bold dark:text-white">{title}</h3>
            <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Toast = ({ message, type, isVisible }: any) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div 
        initial={{ opacity: 0, y: 50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: 20, x: '-50%' }}
        className={cn(
          "fixed bottom-8 left-1/2 z-[200] flex items-center gap-3 rounded-2xl px-6 py-4 shadow-2xl min-w-[300px]",
          type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
        )}
      >
        {type === 'success' ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
        <span className="text-lg font-bold">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Auth State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Firestore State
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  // UI States
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubCategories = dbService.subscribeToCategories((data) => {
      setCategories(data);
      setDataLoading(false);
    });

    const unsubProducts = dbService.subscribeToProducts((data) => {
      setProducts(data);
    });

    return () => {
      unsubCategories();
      unsubProducts();
    };
  }, [user]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error: any) {
      console.error('Login error detail:', error);
      const msg = error.code === 'auth/popup-blocked' 
        ? 'تم حظر النافذة المنبثقة. يرجى السماح بها.' 
        : 'فشل تسجيل الدخول: ' + (error.message || 'خطأ غير معروف');
      showToast(msg, 'error');
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast('تم تسجيل الخروج بنجاح');
  };

  // --- CRUD Handlers ---
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name_ar: formData.get('name_ar'),
      name_en: formData.get('name_en'),
      count: 0
    };

    try {
      if (editingCategory) {
        await dbService.updateCategory(editingCategory.id, data);
        showToast('تم تحديث الفئة بنجاح');
      } else {
        await dbService.createCategory(data);
        showToast('تم إضافة الفئة بنجاح');
      }
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
    } catch (err: any) {
      showToast('خطأ في الصلاحيات أو البيانات', 'error');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const stock = Number(formData.get('stock'));
    const data = {
      name_ar: formData.get('name_ar'),
      categoryId: formData.get('categoryId'),
      price: Number(formData.get('price')),
      stock,
      status: stock > 0 ? 'نشط' : 'نفذ',
    };

    try {
      if (editingProduct) {
        await dbService.updateProduct(editingProduct.id, data);
        showToast('تم تحديث المنتج بنجاح');
      } else {
        await dbService.createProduct(data);
        showToast('تم إضافة المنتج بنجاح');
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
    } catch (err: any) {
      showToast('خطأ في الصلاحيات أو البيانات', 'error');
    }
  };

  const deleteCategory = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
      try {
        await dbService.deleteCategory(id);
        showToast('تم حذف الفئة بنجاح');
      } catch (err: any) {
        showToast('خطأ في الصلاحيات', 'error');
      }
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await dbService.deleteProduct(id);
        showToast('تم حذف المنتج بنجاح');
      } catch (err: any) {
        showToast('خطأ في الصلاحيات', 'error');
      }
    }
  };

  // --- Renderers ---

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="إجمالي المنتجات" 
          value={products.length} 
          icon={Package} 
          trend={0} 
          colorClass="bg-blue-500"
        />
        <StatsCard 
          title="إجمالي الفئات" 
          value={categories.length} 
          icon={Tags} 
          trend={0} 
          colorClass="bg-orange-500"
        />
        <StatsCard 
          title="منتجات نشطة" 
          value={products.filter(p => p.status === 'نشط').length} 
          icon={CheckCircle2} 
          colorClass="bg-emerald-500"
        />
        <StatsCard 
          title="منتجات غير متوفرة" 
          value={products.filter(p => p.status === 'نفذ').length} 
          icon={AlertTriangle} 
          colorClass="bg-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-6 text-lg font-bold dark:text-white">إحصائيات المبيعات الأسبوعية</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-6 text-lg font-bold dark:text-white">توزيع الفئات</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories.map(c => ({ name: c.name_ar, value: products.filter(p => p.categoryId === c.id).length }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {categories.slice(0, 4).map((entry, index) => (
              <div key={entry.id} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">{entry.name_ar}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="mb-6 text-lg font-bold dark:text-white">أحدث المنتجات المضافة</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="pb-3 pr-4 font-medium text-slate-500 dark:text-slate-400">المنتج</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-slate-400">الفئة</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-slate-400">السعر</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-slate-400">المخزون</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-slate-400 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {products.slice(0, 5).map((product) => (
                <tr key={product.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-4 pr-4 font-medium dark:text-white">{product.name_ar}</td>
                  <td className="py-4 text-slate-600 dark:text-slate-400">
                    {categories.find(c => c.id === product.categoryId)?.name_ar || 'غير محدد'}
                  </td>
                  <td className="py-4 text-slate-600 dark:text-slate-400">{product.price} ر.س</td>
                  <td className="py-4 text-slate-600 dark:text-slate-400">{product.stock} ق</td>
                  <td className="py-4">
                    <span className={cn(
                      "mx-auto flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium",
                      product.status === 'نشط' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                      product.status === 'نفذ' ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                    )}>
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">إدارة الفئات</h2>
          <p className="text-slate-500 dark:text-slate-400">إضافة وتعديل الأقسام الرئيسية للمنيو</p>
        </div>
        <button 
          onClick={() => { setEditingCategory(null); setIsCategoryModalOpen(true); }}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus size={18} />
          إضافة فئة جديدة
        </button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="relative max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن فئة..." 
              className="w-full rounded-lg border border-slate-200 py-2 pl-4 pr-10 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">اسم الفئة (بالعربية)</th>
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">الاسم بالإنجليزية</th>
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">عدد المنتجات</th>
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400 text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {categories.map((category: any) => (
                <tr key={category.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 font-medium dark:text-white">{category.name_ar}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono">{category.name_en}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      {products.filter((p: any) => p.categoryId === category.id).length} منتج
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3 text-left">
                      <button 
                        onClick={() => { setEditingCategory(category); setIsCategoryModalOpen(true); }}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => deleteCategory(category.id)}
                        className="text-rose-500 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)} 
        title={editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}
      >
        <form onSubmit={handleSaveCategory} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">الاسم بالعربية</label>
            <input name="name_ar" required defaultValue={editingCategory?.name_ar} className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">الاسم بالإنجليزية</label>
            <input name="name_en" required defaultValue={editingCategory?.name_en} className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 rounded-lg bg-orange-500 py-2.5 font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">حفظ</button>
            <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="flex-1 rounded-lg border border-slate-200 py-2.5 font-bold text-slate-600 dark:border-slate-700 dark:text-slate-400">إلغاء</button>
          </div>
        </form>
      </Modal>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">إدارة المنتجات</h2>
          <p className="text-slate-500 dark:text-slate-400">تحكم في محتوى المنيو، الأسعار، والمخزون</p>
        </div>
        <button 
          onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus size={18} />
          إضافة منتج جديد
        </button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن منتج..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2 pl-4 pr-10 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">المنتج</th>
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">الفئة</th>
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400 text-center">السعر</th>
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400 text-center">المخزون</th>
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400 text-center">الحالة</th>
                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400 text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {products
                .filter((p: any) => p.name_ar.includes(searchQuery))
                .map((product: any) => (
                <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-orange-100">
                        <img 
                          src={`https://api.dicebear.com/7.x/shapes/svg?seed=${product.id}&backgroundColor=f97316`} 
                          alt={product.name_ar} 
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="font-medium dark:text-white">{product.name_ar}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {categories.find((c: any) => c.id === product.categoryId)?.name_ar || 'غير محدد'}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-orange-500">{product.price} ر.س</td>
                  <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{product.stock} ق</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "mx-auto flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium",
                      product.status === 'نشط' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                      "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3 text-left">
                      <button 
                        onClick={() => { setEditingProduct(product); setIsProductModalOpen(true); }}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="text-rose-500 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isProductModalOpen} 
        onClose={() => setIsProductModalOpen(false)} 
        title={editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">اسم المنتج بالعربية</label>
            <input name="name_ar" required defaultValue={editingProduct?.name_ar} className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">الفئة</label>
            <select name="categoryId" required defaultValue={editingProduct?.categoryId} className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white">
              <option value="">اختر فئة</option>
              {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name_ar}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">السعر (ر.س)</label>
              <input name="price" type="number" required defaultValue={editingProduct?.price} className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">المخزون (قطعة)</label>
              <input name="stock" type="number" required defaultValue={editingProduct?.stock} className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white" />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 rounded-lg bg-orange-500 py-2.5 font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">حفظ المنتج</button>
            <button type="button" onClick={() => setIsProductModalOpen(false)} className="flex-1 rounded-lg border border-slate-200 py-2.5 font-bold text-slate-600 dark:border-slate-700 dark:text-slate-400">إلغاء</button>
          </div>
        </form>
      </Modal>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">الإعدادات</h2>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center py-6 text-center">
              <div className="relative">
                 <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md dark:border-slate-800">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                 </div>
                 <button className="absolute bottom-0 right-0 rounded-full bg-orange-500 p-2 text-white shadow-lg">
                   <Edit size={14} />
                 </button>
              </div>
              <h3 className="mt-4 text-xl font-bold dark:text-white">عبدالعزيز إمام</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">مدير النظام</p>
              
              <div className="mt-6 w-full space-y-3">
                 <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                    <span className="text-sm text-slate-500">حالة الحساب</span>
                    <span className="text-xs font-bold text-emerald-500">مفعل</span>
                 </div>
                 <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                    <span className="text-sm text-slate-500">آخر دخول</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">منذ ساعتين</span>
                 </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h3 className="mb-6 text-lg font-bold dark:text-white">المعلومات الشخصية</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">الاسم الكامل</label>
                <input type="text" defaultValue="عبدالعزيز إمام" className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">البريد الإلكتروني</label>
                <input type="email" defaultValue="admin@qunaif.com" className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">رقم الجوال</label>
                <input type="tel" defaultValue="+966 50 123 4567" className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">الموقع</label>
                <input type="text" defaultValue="الرياض، السعودية" className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
            </div>
            <div className="mt-6">
               <button className="rounded-lg bg-orange-500 px-6 py-2 font-medium text-white shadow-md transition-opacity hover:opacity-90">حفظ التعديلات</button>
            </div>
          </Card>

          <Card>
            <h3 className="mb-6 text-lg font-bold dark:text-white">تغيير كلمة المرور</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">كلمة المرور الحالية</label>
                <input type="password" class="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">كلمة المرور الجديدة</label>
                  <input type="password" class="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">تأكيد كلمة المرور</label>
                  <input type="password" class="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
              </div>
            </div>
            <div className="mt-6">
               <button className="rounded-lg bg-slate-800 px-6 py-2 font-medium text-white shadow-md transition-opacity hover:opacity-90 dark:bg-orange-500">تحديث كلمة المرور</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div dir="rtl" className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans dark:bg-slate-950">
        <Card className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-500/30">
              <ShieldCheck size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold dark:text-white">دخول الإدارة</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">يرجى تسجيل الدخول للوصول إلى لوحة التحكم</p>
          
          <button 
            onClick={handleLogin}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            <LogIn size={20} />
            تسجيل الدخول بواسطة جوجل
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
             <AlertTriangle size={14} />
             <span>حصري لمدير النظام فقط</span>
          </div>
        </Card>
        <Toast isVisible={toast.show} message={toast.message} type={toast.type} />
      </div>
    );
  }

  return (
    <div dir="rtl" className="flex min-h-screen bg-slate-50 font-sans dark:bg-slate-950">
      {/* Toast Notification */}
      <Toast isVisible={toast.show} message={toast.message} type={toast.type} />

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && window.innerWidth < 1024 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 right-0 z-50 w-72 transform bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out dark:bg-slate-900 lg:static lg:block lg:translate-x-0 lg:shadow-none",
        !isSidebarOpen && "translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/30">
              <Package size={24} />
            </div>
            <h1 className="text-xl font-bold dark:text-white">لوحة قنيف</h1>
          </div>
          <button onClick={toggleSidebar} className="text-slate-500 hover:text-orange-500 lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="الرئيسية" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={Tags} 
            label="الفئات" 
            active={activeTab === 'categories'} 
            onClick={() => setActiveTab('categories')} 
          />
          <SidebarItem 
            icon={Package} 
            label="المنتجات" 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')} 
          />
          <SidebarItem 
            icon={Settings} 
            label="الإعدادات" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
           <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
           >
              <LogOut size={20} />
              <span className="font-medium">تسجيل الخروج</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main class="flex-1 overflow-auto">
        {/* Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-4">
             <button onClick={toggleSidebar} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden">
                <Menu size={24} />
             </button>
             <div className="hidden items-center gap-2 text-sm font-medium text-slate-500 md:flex">
                <span>لوحة التحكم</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 dark:text-white">
                   {activeTab === 'dashboard' ? 'الرئيسية' : 
                    activeTab === 'categories' ? 'الفئات' : 
                    activeTab === 'products' ? 'المنتجات' : 'الإعدادات'}
                </span>
             </div>
          </div>

          <div class="flex items-center gap-3">
             <button 
              onClick={toggleDarkMode}
              class="rounded-full p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
             >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button class="relative rounded-full p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                <Bell size={20} />
                <span class="absolute right-3 top-3 h-2 w-2 rounded-full bg-orange-500 border-2 border-white dark:border-slate-900"></span>
             </button>
             <div class="mr-2 flex items-center gap-3 border-r border-slate-200 pr-4 dark:border-slate-800">
                <div class="hidden text-left md:block">
                   <p class="text-sm font-bold dark:text-white">عبدالعزيز إمام</p>
                   <p class="text-xs text-slate-500 dark:text-slate-400">ادمن</p>
                </div>
                <div class="h-10 w-10 overflow-hidden rounded-full bg-orange-100 ring-2 ring-orange-500 ring-offset-2">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="User" referrerPolicy="no-referrer" />
                </div>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div class="p-6">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
             >
               {activeTab === 'dashboard' && renderDashboard()}
               {activeTab === 'categories' && renderCategories()}
               {activeTab === 'products' && renderProducts()}
               {activeTab === 'settings' && renderSettings()}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
