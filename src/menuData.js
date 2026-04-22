export const menuData = {
  categories: [
    { id: "all", en: "All", ar: "الكل" },
    { id: "fatayer", en: "Fatayer", ar: "الفطائر الشامية" },
    { id: "pizza", en: "Pizza", ar: "البيتزا" },
    { id: "juices", en: "Juices", ar: "العصائر" }
  ],
  items: [
    // --- Fatayer Section ---
    {
      id: 1,
      category: "fatayer",
      price: 12.000,
      en: { name: "Qunaif Fatayer", description: "Our signature Qunaif-style Levant pie." },
      ar: { name: "فطيرة شامية قنيف", description: "فطيرة قنيف الخاصة بالطعم الشامي الأصيل." },
      image: "https://images.unsplash.com/photo-1593504049359-74330189a355?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      category: "fatayer",
      price: 12.000,
      en: { name: "Hot Dog Fatayer", description: "Levant pie stuffed with savory hot dog slices." },
      ar: { name: "فطيرة شامية هوت دوغ", description: "فطيرة مميزة محشوة بقطع الهوت دوغ." },
      image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      category: "fatayer",
      price: 12.000,
      en: { name: "Chicken Fatayer", description: "Shami pie with tender chicken filling." },
      ar: { name: "فطيرة شامية فراخ (دجاج)", description: "فطيرة مميزة محشوة بقطع الدجاج المتبل." },
      image: "https://images.unsplash.com/photo-1619531043553-997782b13735?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 4,
      category: "fatayer",
      price: 12.000,
      en: { name: "Meat Fatayer", description: "Delicious pie stuffed with seasoned minced meat." },
      ar: { name: "فطيرة شامية لحمة", description: "فطيرة مميزة غنية باللحم المفروم والمبهر." },
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 5,
      category: "fatayer",
      price: 12.000,
      en: { name: "Vegetable Fatayer", description: "Healthy pie filled with a fresh vegetable mix." },
      ar: { name: "فطيرة شامية خضار", description: "فطيرة مميزة خفيفة محشوة بمشكل الخضروات." },
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop"
    },

    // --- Pizza Section ---
    // (Prices: M: 27.000, L: 30.000, F: 34.000)
    {
      id: 6,
      category: "pizza",
      price: 27.000,
      en: { name: "Qunaif Pizza", description: "Medium: 27,000 | Large: 30,000 | Family: 34,000" },
      ar: { name: "بيتزا قنيف", description: "وسط: 27,000 | كبيرة: 30,000 | عائلي: 34,000" },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 7,
      category: "pizza",
      price: 27.000,
      en: { name: "Hot Dog Pizza", description: "Medium: 27,000 | Large: 30,000 | Family: 34,000" },
      ar: { name: "بيتزا هوت دوغ", description: "وسط: 27,000 | كبيرة: 30,000 | عائلي: 34,000" },
      image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 8,
      category: "pizza",
      price: 27.000,
      en: { name: "Chicken Pizza", description: "Medium: 27,000 | Large: 30,000 | Family: 34,000" },
      ar: { name: "بيتزا فراخ", description: "وسط: 27,000 | كبيرة: 30,000 | عائلي: 34,000" },
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 9,
      category: "pizza",
      price: 27.000,
      en: { name: "Meat Pizza", description: "Medium: 27,000 | Large: 30,000 | Family: 34,000" },
      ar: { name: "بيتزا لحمة", description: "وسط: 27,000 | كبيرة: 30,000 | عائلي: 34,000" },
      image: "https://images.unsplash.com/photo-1544681280-d25a782adc9b?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 10,
      category: "pizza",
      price: 22.000,
      en: { name: "Vegetable Pizza", description: "Medium: 22,000 | Large: 24,000 | Family: 27,000" },
      ar: { name: "بيتزا خضار", description: "وسط: 22,000 | كبيرة: 24,000 | عائلي: 27,000" },
      image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 11,
      category: "pizza",
      price: 22.000,
      en: { name: "Margherita Pizza", description: "Medium: 22,000 | Large: 24,000 | Family: 27,000" },
      ar: { name: "بيتزا مارغريتا", description: "وسط: 22,000 | كبيرة: 24,000 | عائلي: 27,000" },
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=500&auto=format&fit=crop"
    },

    // --- Juices Section ---
    {
      id: 12,
      category: "juices",
      price: 5.000,
      en: { name: "Strawberry Juice", description: "Fresh and sweet chilled strawberry juice." },
      ar: { name: "عصير فراولة", description: "عصير فراولة طبيعي ومنعش." },
      image: "https://images.unsplash.com/photo-1591244222047-9759d5757d54?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 13,
      category: "juices",
      price: 5.000,
      en: { name: "Strawberry Banana", description: "A delicious blend of strawberry and banana." },
      ar: { name: "فراولة بالموز", description: "مزيج لذيذ من الفراولة والموز الطبيعي." },
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 14,
      category: "juices",
      price: 5.000,
      en: { name: "Mango Juice", description: "Chilled pure mango nectar." },
      ar: { name: "عصير مانجو", description: "عصير المانجو المركز والطبيعي." },
      image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 15,
      category: "juices",
      price: 3.500,
      en: { name: "Banana Milk", description: "Sweet banana mixed with cold milk." },
      ar: { name: "موز باللبن", description: "موز طازج مخلوط بالحليب المبرد." },
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 16,
      category: "juices",
      price: 5.000,
      en: { name: "Pineapple Juice", description: "Fresh pineapple juice for a tropical taste." },
      ar: { name: "عصير أناناس", description: "عصير الأناناس الطازج لمذاق استوائي." },
      image: "https://images.unsplash.com/photo-1611039066606-5a49479e0004?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 17,
      category: "juices",
      price: 6.000,
      en: { name: "Mixed Juice", description: "A refreshing blend of seasonal fruits." },
      ar: { name: "عصير مشكل", description: "مزيج منعش من فواكه الموسم الطازجة." },
      image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=500&auto=format&fit=crop"
    }
  ]
};
