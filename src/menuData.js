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
      image: "/images/fries_cheese.jpg"
    },
    {
      id: 2,
      category: "fries",
      price: 9.500,
      en: { name: "Hot Dog Fries", description: "Fries loaded with sliced hot dogs and sauces." },
      ar: { name: "فرايز هوت دوق", description: "بطاطس مع قطع هوت دوق وصوصات مميزة." },
      image: "/images/fries_hotdog.jpg"
    },
    {
      id: 3,
      category: "fries",
      price: 7.800,
      en: { name: "BBQ Fries", description: "Fries with smoky BBQ sauce and seasoning." },
      ar: { name: "فرايز باربكيو", description: "بطاطس مع صوص الباربكيو المدخن." },
      image: "/images/fries_bbq.jpg"
    },
    {
      id: 4,
      category: "fries",
      price: 13.500,
      en: { name: "Chicken Fries", description: "Loaded fries with crispy chicken pieces." },
      ar: { name: "فرايز دجاج", description: "بطاطس مغطاة بقطع الدجاج المقرمشة." },
      image: "/images/fries_chicken.jpg"
    },
    {
      id: 5,
      category: "fries",
      price: 6.500,
      en: { name: "Classic Fries", description: "Standard golden crispy salted fries." },
      ar: { name: "كلاسيك فرايز", description: "بطاطس مقلية مملحة كلاسيكية." },
      image: "/images/fries_classic.jpg"
    },
    {
      id: 6,
      category: "fries",
      price: 14.000,
      en: { name: "Dr. Wadaha Fries", description: "Special mix fries named after Dr. Wadaha." },
      ar: { name: "فرايز دكتورة وضاحة", description: "خلطة فرايز خاصة للدكتورة وضاحة." },
      image: "/images/fries_wadaha.jpg"
    },

    // --- Indomie Section ---
    {
      id: 7,
      category: "indomie",
      price: 8.000,
      en: { name: "Sweet Corn & Cheese Indomie", description: "Indomie mixed with sweet corn and creamy cheese." },
      ar: { name: "اندومي ذرة حلوة مع الجبن", description: "اندومي مع ذرة حلوة وجبن كريمي." },
      image: "/images/indomie_corn.jpg"
    },
    {
      id: 8,
      category: "indomie",
      price: 8.500,
      en: { name: "Hot Dog & Cheddar Indomie", description: "Indomie with hot dog pieces and cheddar sauce." },
      ar: { name: "اندومي هوت دوق مع شيدر", description: "اندومي مع قطع الهوت دوق وصوص الشيدر." },
      image: "/images/indomie_hotdog.jpg"
    },
    {
      id: 9,
      category: "indomie",
      price: 8.500,
      en: { name: "Spicy Jalapeno Indomie", description: "Spicy Indomie with jalapeno and cheddar cheese." },
      ar: { name: "اندومي سبايسي هالبينو", description: "اندومي حار مع الهالبينو وجبن الشيدر." },
      image: "/images/indomie_jalapeno.jpg"
    },
    {
      id: 10,
      category: "indomie",
      price: 7.900,
      en: { name: "Cheetos & Cheese Indomie", description: "Indomie with a crunchy Cheetos topping and cheese mix." },
      ar: { name: "اندومي شيتوس مع الاجبان", description: "اندومي مع طبقة شيتوس مقرمشة ومزيج الأجبان." },
      image: "/images/indomie_cheetos.jpg"
    },
    {
      id: 11,
      category: "indomie",
      price: 10.500,
      en: { name: "Chicken Indomie", description: "Classic chicken flavored Indomie with extra chicken bits." },
      ar: { name: "اندومي دجاج", description: "اندومي بنكهة الدجاج مع قطع دجاج إضافية." },
      image: "/images/indomie_chicken.jpg"
    },
    {
      id: 12,
      category: "indomie",
      price: 5.500,
      en: { name: "Classic Indomie", description: "Simple and delicious classic Indomie." },
      ar: { name: "اندومي كلاسيك", description: "اندومي كلاسيك بسيطة ولذيذة." },
      image: "/images/indomie_classic.jpg"
    },
    // ... paths updated relative to /public/
    {
      id: 13,
      category: "indomie",
      price: 11.000,
      en: { name: "Mixed Indomie with Fries", description: "A unique blend of Indomie and crunchy fries." },
      ar: { name: "اندومي ميكس مع فرايز", description: "مزيج فريد بين الاندومي والبطاطس المقرمشة." },
      image: "/images/indomie_mix.jpg"
    },
    {
      id: 14,
      category: "indomie",
      price: 12.500,
      en: { name: "Dr. Wadaha Mix", description: "The famous special mix inspired by Dr. Wadaha." },
      ar: { name: "ميكس دكتورة وضاحة", description: "الميكس الشهير الخاص بالدكتورة وضاحة." },
      image: "/images/indomie_wadaha.jpg"
    },

    // --- Meals (Crispy) Section ---
    {
      id: 15,
      category: "meals",
      price: 12.000,
      en: { name: "Crispy Sandwich", description: "Tender crispy chicken in a fresh bun with veggies." },
      ar: { name: "سندوتش كريسبي", description: "سندوتش دجاج كريسبي طري مع الخضروات." },
      image: "/images/crispy_sandwich.jpg"
    },
    {
      id: 16,
      category: "meals",
      price: 10.000,
      en: { name: "3 Pcs Crispy", description: "Three pieces of our signature crispy chicken." },
      ar: { name: "كريسبي 3 قطع", description: "3 قطع من دجاجنا الكريسبي المميز." },
      image: "/images/crispy_3pcs.jpg"
    },
    {
      id: 17,
      category: "meals",
      price: 18.000,
      en: { name: "6 Pcs Crispy", description: "Six pieces of juicy crispy chicken with dipping sauce." },
      ar: { name: "كريسبي 6 قطع", description: "6 قطع دجاج كريسبي مع صوصات للتغميس." },
      image: "/images/crispy_6pcs.jpg"
    },
    {
      id: 18,
      category: "meals",
      price: 25.000,
      en: { name: "9 Pcs Crispy", description: "Family size crispy chicken feast (9 pieces)." },
      ar: { name: "كريسبي 9 قطع", description: "وجبة عائلية من دجاج كريسبي (9 قطع)." },
      image: "/images/crispy_9pcs.jpg"
    },

    // --- Drinks Section ---
    {
      id: 19,
      category: "drinks",
      price: 1.500,
      en: { name: "Mineral Water", description: "Pure chilled mineral water." },
      ar: { name: "مياه معدنية", description: "مياه معدنية نقية مبردة." },
      image: "/images/drink_water.jpg"
    },
    {
      id: 20,
      category: "drinks",
      price: 2.500,
      en: { name: "Soft Drink", description: "Refreshing carbonated soft drink." },
      ar: { name: "مشروب غازي", description: "مشروب غازي منعش." },
      image: "/images/drink_soda.jpg"
    },
    {
      id: 21,
      category: "drinks",
      price: 5.000,
      en: { name: "Strawberry Mojito", description: "Cool strawberry flavored mojito with mint." },
      ar: { name: "موهيتو فراولة", description: "موهيتو فراولة بارد مع النعناع." },
      image: "/images/drink_mojito_strawberry.jpg"
    },
    {
      id: 22,
      category: "drinks",
      price: 5.000,
      en: { name: "Berry Mojito", description: "Refreshing mixed berry mojito." },
      ar: { name: "موهيتو توت", description: "موهيتو توت مشكل منعش." },
      image: "/images/drink_mojito_berry.jpg"
    },
    {
      id: 23,
      category: "drinks",
      price: 5.000,
      en: { name: "Peach Mojito", description: "Sweet peach flavored chilled mojito." },
      ar: { name: "موهيتو خوخ", description: "موهيتو بنكهة الخوخ اللذيذة." },
      image: "/images/drink_mojito_peach.jpg"
    },
    {
      id: 24,
      category: "drinks",
      price: 5.000,
      en: { name: "Mixed Mojito", description: "A vibrant blend of various seasonal fruits." },
      ar: { name: "موهيتو ميكس", description: "مزيج منعش من نكهات الفواكه المختلفة." },
      image: "/images/drink_mojito_mix.jpg"
    },

    // --- Add-ons Section ---
    {
      id: 25,
      category: "additions",
      price: 1.500,
      en: { name: "Extra Hot Dog", description: "Additional hot dog topping." },
      ar: { name: "هوت دوق", description: "إضافة قطعة هوت دوق." },
      image: "/images/addon_hotdog.jpg"
    },
    {
      id: 26,
      category: "additions",
      price: 1.500,
      en: { name: "Sweet Corn", description: "Add sweet corn to your meal." },
      ar: { name: "ذرة حلوة", description: "إضافة ذرة حلوة." },
      image: "/images/addon_corn.jpg"
    },
    {
      id: 27,
      category: "additions",
      price: 1.500,
      en: { name: "Jalapeno", description: "Add a spicy kick with jalapenos." },
      ar: { name: "هلابينو", description: "إضافة قطع الهالبينو الحارة." },
      image: "/images/addon_jalapeno.jpg"
    },
    {
      id: 28,
      category: "additions",
      price: 1.000,
      en: { name: "Cheetos", description: "Add crunchy Cheetos topping." },
      ar: { name: "شيتوس", description: "إضافة شيتوس مقرمش." },
      image: "/images/addon_cheetos.jpg"
    },
    {
      id: 29,
      category: "additions",
      price: 3.000,
      en: { name: "Mozzarella", description: "Extra mozzarella cheese." },
      ar: { name: "موزيلا", description: "إضافة جبن موزاريلا." },
      image: "/images/addon_mozzarella.jpg"
    },
    {
      id: 30,
      category: "additions",
      price: 1.500,
      en: { name: "Olives", description: "Add sliced black or green olives." },
      ar: { name: "زيتون", description: "إضافة قطع زيتون." },
      image: "/images/addon_olives.jpg"
    },
    {
      id: 31,
      category: "additions",
      price: 2.500,
      en: { name: "Cheddar Sauce", description: "Extra cup of creamy cheddar sauce." },
      ar: { name: "صوص شيدر", description: "إضافة صوص جبن شيدر." },
      image: "/images/addon_cheddar.jpg"
    },
    {
      id: 32,
      category: "additions",
      price: 3.500,
      en: { name: "Extra Chicken", description: "Add more crispy chicken pieces." },
      ar: { name: "إضافة دجاج", description: "قطع دجاج كريسبي إضافية." },
      image: "/images/addon_chicken.jpg"
    },
    {
      id: 33,
      category: "additions",
      price: 1.500,
      en: { name: "BBQ Sauce", description: "Extra side of BBQ sauce." },
      ar: { name: "صوص باربكيو", description: "إضافة صوص باربكيو." },
      image: "/images/addon_bbq.jpg"
    }
  ]
};
