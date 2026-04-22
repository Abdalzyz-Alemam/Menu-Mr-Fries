export const menuData = {
  categories: [
    { id: "all", en: "All", ar: "الكل" },
    { id: "fries", en: "Fries", ar: "الفرايز" },
    { id: "indomie", en: "Indomie", ar: "الاندومي" },
    { id: "meals", en: "Meals", ar: "وجبات" },
    { id: "drinks", en: "Drinks", ar: "المشروبات" },
    { id: "additions", en: "Add-ons", ar: "الاضافات" }
  ],
  items: [
    // --- Fries Section ---
    {
      id: 1,
      category: "fries",
      price: 8.500,
      en: { name: "Cheese Fries", description: "Golden fries topped with our signature melted cheese sauce." },
      ar: { name: "تشيز فرايز", description: "بطاطس مقرمشة مغطاة بصوص الجبن الذائب." },
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      category: "fries",
      price: 9.500,
      en: { name: "Hot Dog Fries", description: "Fries loaded with sliced hot dogs and sauces." },
      ar: { name: "فرايز هوت دوق", description: "بطاطس مع قطع هوت دوق وصوصات مميزة." },
      image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      category: "fries",
      price: 7.800,
      en: { name: "BBQ Fries", description: "Fries with smoky BBQ sauce and seasoning." },
      ar: { name: "فرايز باربكيو", description: "بطاطس مع صوص الباربكيو المدخن." },
      image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 4,
      category: "fries",
      price: 13.500,
      en: { name: "Chicken Fries", description: "Loaded fries with crispy chicken pieces." },
      ar: { name: "فرايز دجاج", description: "بطاطس مغطاة بقطع الدجاج المقرمشة." },
      image: "https://images.unsplash.com/photo-1594759077576-a00b8ee4fe7e?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 5,
      category: "fries",
      price: 6.500,
      en: { name: "Classic Fries", description: "Standard golden crispy salted fries." },
      ar: { name: "كلاسيك فرايز", description: "بطاطس مقلية مملحة كلاسيكية." },
      image: "https://images.unsplash.com/photo-1518013031637-61c45a80d5df?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 6,
      category: "fries",
      price: 14.000,
      en: { name: "Dr. Wadaha Fries", description: "Special mix fries named after Dr. Wadaha." },
      ar: { name: "فرايز دكتورة وضاحة", description: "خلطة فرايز خاصة للدكتورة وضاحة." },
      image: "https://images.unsplash.com/photo-1623238969302-674ac056f70a?q=80&w=500&auto=format&fit=crop"
    },

    // --- Indomie Section ---
    {
      id: 7,
      category: "indomie",
      price: 8.000,
      en: { name: "Sweet Corn & Cheese Indomie", description: "Indomie mixed with sweet corn and creamy cheese." },
      ar: { name: "اندومي ذرة حلوة مع الجبن", description: "اندومي مع ذرة حلوة وجبن كريمي." },
      image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 8,
      category: "indomie",
      price: 8.500,
      en: { name: "Hot Dog & Cheddar Indomie", description: "Indomie with hot dog pieces and cheddar sauce." },
      ar: { name: "اندومي هوت دوق مع شيدر", description: "اندومي مع قطع الهوت دوق وصوص الشيدر." },
      image: "https://images.unsplash.com/photo-1591814447921-72420996aef7?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 9,
      category: "indomie",
      price: 8.500,
      en: { name: "Spicy Jalapeno Indomie", description: "Spicy Indomie with jalapeno and cheddar cheese." },
      ar: { name: "اندومي سبايسي هالبينو", description: "اندومي حار مع الهالبينو وجبن الشيدر." },
      image: "https://images.unsplash.com/photo-1547928509-98ee3e99d972?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 10,
      category: "indomie",
      price: 7.900,
      en: { name: "Cheetos & Cheese Indomie", description: "Indomie with a crunchy Cheetos topping and cheese mix." },
      ar: { name: "اندومي شيتوس مع الاجبان", description: "اندومي مع طبقة شيتوس مقرمشة ومزيج الأجبان." },
      image: "https://images.unsplash.com/photo-1543083115-638c32cd3d58?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 11,
      category: "indomie",
      price: 10.500,
      en: { name: "Chicken Indomie", description: "Classic chicken flavored Indomie with extra chicken bits." },
      ar: { name: "اندومي دجاج", description: "اندومي بنكهة الدجاج مع قطع دجاج إضافية." },
      image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 12,
      category: "indomie",
      price: 5.500,
      en: { name: "Classic Indomie", description: "Simple and delicious classic Indomie." },
      ar: { name: "اندومي كلاسيك", description: "اندومي كلاسيك بسيطة ولذيذة." },
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 13,
      category: "indomie",
      price: 11.000,
      en: { name: "Mixed Indomie with Fries", description: "A unique blend of Indomie and crunchy fries." },
      ar: { name: "اندومي ميكس مع فرايز", description: "مزيج فريد بين الاندومي والبطاطس المقرمشة." },
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 14,
      category: "indomie",
      price: 12.500,
      en: { name: "Dr. Wadaha Mix", description: "The famous special mix inspired by Dr. Wadaha." },
      ar: { name: "ميكس دكتورة وضاحة", description: "الميكس الشهير الخاص بالدكتورة وضاحة." },
      image: "https://images.unsplash.com/photo-1612927608282-b280ff175941?q=80&w=500&auto=format&fit=crop"
    },

    // --- Meals (Crispy) Section ---
    {
      id: 15,
      category: "meals",
      price: 12.000,
      en: { name: "Crispy Sandwich", description: "Tender crispy chicken in a fresh bun with veggies." },
      ar: { name: "سندوتش كريسبي", description: "سندوتش دجاج كريسبي طري مع الخضروات." },
      image: "https://images.unsplash.com/photo-1513185158878-8d8c196b7cd8?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 16,
      category: "meals",
      price: 10.000,
      en: { name: "3 Pcs Crispy", description: "Three pieces of our signature crispy chicken." },
      ar: { name: "كريسبي 3 قطع", description: "3 قطع من دجاجنا الكريسبي المميز." },
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 17,
      category: "meals",
      price: 18.000,
      en: { name: "6 Pcs Crispy", description: "Six pieces of juicy crispy chicken with dipping sauce." },
      ar: { name: "كريسبي 6 قطع", description: "6 قطع دجاج كريسبي مع صوصات للتغميس." },
      image: "https://images.unsplash.com/photo-1626082896492-766af4eb6501?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 18,
      category: "meals",
      price: 25.000,
      en: { name: "9 Pcs Crispy", description: "Family size crispy chicken feast (9 pieces)." },
      ar: { name: "كريسبي 9 قطع", description: "وجبة عائلية من دجاج كريسبي (9 قطع)." },
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=500&auto=format&fit=crop"
    },

    // --- Drinks Section ---
    {
      id: 19,
      category: "drinks",
      price: 1.500,
      en: { name: "Mineral Water", description: "Pure chilled mineral water." },
      ar: { name: "مياه معدنية", description: "مياه معدنية نقية مبردة." },
      image: "https://images.unsplash.com/photo-1548919973-5dea585f396a?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 20,
      category: "drinks",
      price: 2.500,
      en: { name: "Soft Drink", description: "Refreshing carbonated soft drink." },
      ar: { name: "مشروب غازي", description: "مشروب غازي منعش." },
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 21,
      category: "drinks",
      price: 5.000,
      en: { name: "Strawberry Mojito", description: "Cool strawberry flavored mojito with mint." },
      ar: { name: "موهيتو فراولة", description: "موهيتو فراولة بارد مع النعناع." },
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 22,
      category: "drinks",
      price: 5.000,
      en: { name: "Berry Mojito", description: "Refreshing mixed berry mojito." },
      ar: { name: "موهيتو توت", description: "موهيتو توت مشكل منعش." },
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 23,
      category: "drinks",
      price: 5.000,
      en: { name: "Peach Mojito", description: "Sweet peach flavored chilled mojito." },
      ar: { name: "موهيتو خوخ", description: "موهيتو بنكهة الخوخ اللذيذة." },
      image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 24,
      category: "drinks",
      price: 5.000,
      en: { name: "Mixed Mojito", description: "A vibrant blend of various seasonal fruits." },
      ar: { name: "موهيتو ميكس", description: "مزيج منعش من نكهات الفواكه المختلفة." },
      image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=500&auto=format&fit=crop"
    },

    // --- Add-ons Section ---
    {
      id: 25,
      category: "additions",
      price: 1.500,
      en: { name: "Extra Hot Dog", description: "Additional hot dog topping." },
      ar: { name: "هوت دوق", description: "إضافة قطعة هوت دوق." },
      image: "https://images.unsplash.com/photo-1541288097918-742ff294e157?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 26,
      category: "additions",
      price: 1.500,
      en: { name: "Sweet Corn", description: "Add sweet corn to your meal." },
      ar: { name: "ذرة حلوة", description: "إضافة ذرة حلوة." },
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 27,
      category: "additions",
      price: 1.500,
      en: { name: "Jalapeno", description: "Add a spicy kick with jalapenos." },
      ar: { name: "هلابينو", description: "إضافة قطع الهالبينو الحارة." },
      image: "https://images.unsplash.com/photo-1563203433-a3d8206f1577?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 28,
      category: "additions",
      price: 1.000,
      en: { name: "Cheetos", description: "Add crunchy Cheetos topping." },
      ar: { name: "شيتوس", description: "إضافة شيتوس مقرمش." },
      image: "https://images.unsplash.com/photo-1543083115-638c32cd3d58?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 29,
      category: "additions",
      price: 3.000,
      en: { name: "Mozzarella", description: "Extra mozzarella cheese." },
      ar: { name: "موزيلا", description: "إضافة جبن موزاريلا." },
      image: "https://images.unsplash.com/photo-1523371052044-672ce003666b?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 30,
      category: "additions",
      price: 1.500,
      en: { name: "Olives", description: "Add sliced black or green olives." },
      ar: { name: "زيتون", description: "إضافة قطع زيتون." },
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 31,
      category: "additions",
      price: 2.500,
      en: { name: "Cheddar Sauce", description: "Extra cup of creamy cheddar sauce." },
      ar: { name: "صوص شيدر", description: "إضافة صوص جبن شيدر." },
      image: "https://images.unsplash.com/photo-1563599175592-c58dc214deff?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 32,
      category: "additions",
      price: 3.500,
      en: { name: "Extra Chicken", description: "Add more crispy chicken pieces." },
      ar: { name: "إضافة دجاج", description: "قطع دجاج كريسبي إضافية." },
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 33,
      category: "additions",
      price: 1.500,
      en: { name: "BBQ Sauce", description: "Extra side of BBQ sauce." },
      ar: { name: "صوص باربكيو", description: "إضافة صوص باربكيو." },
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=500&auto=format&fit=crop"
    }
  ]
};
