export type CategoryId =
  | "grill"
  | "steam"
  | "oven"
  | "sides"
  | "dessert"
  | "drinks";

export type Tag = "bestseller" | "new" | "spicy" | "veg" | "gf";

export type Dish = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  category: CategoryId;
  price: number;
  /** extra charge to turn the dish into a full meal (side + drink) */
  mealUpgrade?: number;
  image?: string;
  shortAr: string;
  longAr: string;
  tags: Tag[];
  kcal?: number;
  prepMin: number;
  spice: 0 | 1 | 2 | 3;
  allergens: string[];
  ingredients: string[];
  pairsWith: string[];
};

export type Category = {
  id: CategoryId;
  label: string;
  counter: string;
  blurb: string;
  image?: string;
};

export const categories: Category[] = [
  {
    id: "grill",
    label: "المنقل",
    counter: "counter 01",
    blurb:
      "لحمة وفراخ على الفحم. بنسيبها تستريح دقيقتين قبل ما تتلف، عشان العصارة ترجع جوه.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "steam",
    label: "البخار",
    counter: "counter 02",
    blurb:
      "دامبلنغ ورامن، معمولين في نفس اليوم. العجين رقيق عشان الحشو يبان من أول قضمة.",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "oven",
    label: "الكوشة",
    counter: "counter 03",
    blurb:
      "عجين بيتخمّر ٢٤ ساعة في التلاجة، وبيتخبز على ٣٠٠ درجة. القاعدة رقيقة والطرف مقرمش.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sides",
    label: "على الجنب",
    counter: "counter 04",
    blurb: "حاجات صغيرة بتكمّل السفرة: حمص، بطاطس، وسلطات بتتعمل طازة.",
  },
  {
    id: "dessert",
    label: "حلو",
    counter: "counter 05",
    blurb: "حاجة واحدة بس، عشان تتعمل صح.",
  },
  {
    id: "drinks",
    label: "بار المشروبات",
    counter: "counter 06",
    blurb: "ليموناضة بتتعصر عند الطلب، ومياه.",
  },
];

const IMG = "https://images.unsplash.com/";

export const dishes: Dish[] = [
  {
    id: "d01",
    slug: "double-beef-burger",
    nameAr: "برجر اللحمة المزدوج",
    nameEn: "Double Beef Burger",
    category: "grill",
    price: 185,
    mealUpgrade: 45,
    image: `${IMG}photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "قطعتين لحم ١٦٠ جرام، شيدر، ومخلل بلدي.",
    longAr:
      "لحم بقري مفروم ١٦٠ جرام على المنقل، بيتقلّب مرة واحدة بس عشان يفضل طري. شيدر مسيح فوقه، مخلل بلدي، بصل مكرمل، وصوص المنقل اللي فيه دخان خفيف. العيش بريوش بيتحمّص على نفس المنقل.",
    tags: ["bestseller"],
    kcal: 640,
    prepMin: 14,
    spice: 0,
    allergens: ["جلوتين", "ألبان", "بيض", "خردل"],
    ingredients: ["لحم بقري", "شيدر", "بصل مكرمل", "مخلل", "صوص المنقل", "عيش بريوش"],
    pairsWith: ["d13", "d17"],
  },
  {
    id: "d02",
    slug: "crispy-chicken-burger",
    nameAr: "برجر فراخ مقرمش",
    nameEn: "Crispy Chicken Burger",
    category: "grill",
    price: 165,
    mealUpgrade: 45,
    image: `${IMG}photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "صدور فراخ متبّلة ٤ ساعات، وبقسماط خشن.",
    longAr:
      "صدر فرخة متبّل ٤ ساعات في اللبن والبهارات، بياخد بقسماط خشن وبيتحمّر لحد ما يبقى مقرمش من برّه وطري من جوّه. مايونيز حار خفيف، خس آيسبرج، ومخلل. مش حار أوي — بس بيسيب حرارة صغيرة.",
    tags: ["spicy"],
    kcal: 610,
    prepMin: 13,
    spice: 1,
    allergens: ["جلوتين", "ألبان", "بيض"],
    ingredients: ["فراخ", "بقسماط", "مايونيز حار", "خس", "مخلل"],
    pairsWith: ["d13", "d18"],
  },
  {
    id: "d03",
    slug: "charcoal-kofta",
    nameAr: "كفتة على الفحم",
    nameEn: "Charcoal Kofta",
    category: "grill",
    price: 175,
    mealUpgrade: 35,
    image: `${IMG}photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "لحم مفروم مع بقدونس وبصل، ٥ أسياخ.",
    longAr:
      "لحم مفروم يدوي مع بقدونس وبصل مفروم ناعم وبهارات كفتة. ٥ أسياخ صغيرة على الفحم، بتتقدم مع طحينة وليمون. بنفرم البصل على وشك قبل الخلط عشان مايسيبش مية.",
    tags: ["spicy"],
    kcal: 520,
    prepMin: 16,
    spice: 1,
    allergens: ["سمسم"],
    ingredients: ["لحم مفروم", "بقدونس", "بصل", "طحينة", "ليمون"],
    pairsWith: ["d12", "d14"],
  },
  {
    id: "d04",
    slug: "lamb-ribs",
    nameAr: "ريش ضاني",
    nameEn: "Lamb Ribs",
    category: "grill",
    price: 320,
    mealUpgrade: 40,
    image: `${IMG}photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "ريش مستوية على الفحم، ملح وفلفل أسود بس.",
    longAr:
      "ريش ضاني بتتتبّل ملح وفلفل أسود وروزماري بس — مفيش حاجة تانية تغطي على طعم اللحمة. بتتقفل على نار عالية وبعدين تستريح ٥ دقايق. بتتقدم مع ليمون مشوي وملح خشن.",
    tags: [],
    kcal: 780,
    prepMin: 22,
    spice: 0,
    allergens: [],
    ingredients: ["ريش ضاني", "ملح", "فلفل أسود", "روزماري", "ليمون"],
    pairsWith: ["d14", "d16"],
  },
  {
    id: "d05",
    slug: "half-grilled-chicken",
    nameAr: "نص فرخة مشوية",
    nameEn: "Half Grilled Chicken",
    category: "grill",
    price: 240,
    mealUpgrade: 35,
    image: `${IMG}photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "نص فرخة بلدي متبّلة زبادي وليمون.",
    longAr:
      "نص فرخة بلدي بتتتبّل يوم كامل في زبادي وليمون وثوم وبابريكا. بتتشوى على الفحم على مراحل عشان الجلد يبقى مقرمش واللحم ماينشفش. بتتقدم مع صوص ثوم وليمون.",
    tags: [],
    kcal: 690,
    prepMin: 20,
    spice: 0,
    allergens: ["ألبان"],
    ingredients: ["فراخ بلدي", "زبادي", "ليمون", "ثوم", "بابريكا"],
    pairsWith: ["d13", "d15"],
  },
  {
    id: "d06",
    slug: "ribeye-steak",
    nameAr: "ستيك ريب آي",
    nameEn: "Ribeye Steak",
    category: "grill",
    price: 395,
    mealUpgrade: 45,
    image: `${IMG}photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "٣٠٠ جرام، مستوى medium، زبدة روزماري.",
    longAr:
      "ريب آي ٣٠٠ جرام، بيتقفل على نار عالية وبعدين يكمّل على حرارة أقل لحد medium. زبدة روزماري وثوم بتتسكب فوقه وهو لسه سخن. بنسيبه ٦ دقايق قبل التقطيع — لو استعجلت عليه العصارة هتطلع على الطبق.",
    tags: ["new"],
    kcal: 820,
    prepMin: 24,
    spice: 0,
    allergens: ["ألبان"],
    ingredients: ["ريب آي", "زبدة", "روزماري", "ثوم", "ملح خشن"],
    pairsWith: ["d15", "d16"],
  },
  {
    id: "d07",
    slug: "beef-dumplings",
    nameAr: "دامبلنغ لحم",
    nameEn: "Beef Dumplings",
    category: "steam",
    price: 145,
    mealUpgrade: 40,
    image: `${IMG}photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "٦ حبات، عجين رقيق وحشو لحم وصويا.",
    longAr:
      "٦ حبات، العجين بتاعها بيتفرد رقيق أوي عشان يبان الحشو من برّه. الحشو لحم مفروم مع صويا وزنجبيل وبصل أخضر. بتتبخّر ٧ دقايق وبتتقدم مع صوص الصويا والخل الحار.",
    tags: ["bestseller"],
    kcal: 380,
    prepMin: 12,
    spice: 0,
    allergens: ["جلوتين", "صويا", "سمسم"],
    ingredients: ["لحم مفروم", "عجين", "صويا", "زنجبيل", "بصل أخضر"],
    pairsWith: ["d08", "d17"],
  },
  {
    id: "d08",
    slug: "vegetable-ramen",
    nameAr: "رامن خضار",
    nameEn: "Vegetable Ramen",
    category: "steam",
    price: 165,
    mealUpgrade: 30,
    image: `${IMG}photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "شوربة ١٢ ساعة، نودلز، وبيض مسلوق.",
    longAr:
      "شوربة خضار بتتسلق ١٢ ساعة مع كومبو وشيتاكي وزنجبيل. نودلز طازة، بيض مسلوق نصفين، ذرة، وبصل أخضر. الشوربة غامقة وحلوة من غير أي لحم — الحلاوة كلها من الخضار.",
    tags: ["new", "spicy"],
    kcal: 520,
    prepMin: 10,
    spice: 1,
    allergens: ["جلوتين", "صويا", "بيض", "سمسم"],
    ingredients: ["شوربة خضار", "نودلز", "بيض", "ذرة", "شيتاكي", "زنجبيل"],
    pairsWith: ["d07", "d12"],
  },
  {
    id: "d09",
    slug: "margherita",
    nameAr: "بيتزا مارغريتا",
    nameEn: "Margherita",
    category: "oven",
    price: 175,
    mealUpgrade: 40,
    image: `${IMG}photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "عجين ٢٤ ساعة، صلصة طماطم، وموتزاريلا.",
    longAr:
      "عجين بيتخمّر ٢٤ ساعة في التلاجة، بيتفرد رقيق وبيتخبز ٤ دقايق على ٣٠٠ درجة. صلصة طماطم مطبوخة بزيت زيتون وريحان، وموتزاريلا طازة بتسيح في الآخر. مفيش حاجة زيادة.",
    tags: ["bestseller", "veg"],
    kcal: 720,
    prepMin: 15,
    spice: 0,
    allergens: ["جلوتين", "ألبان"],
    ingredients: ["عجين", "طماطم", "موتزاريلا", "ريحان", "زيت زيتون"],
    pairsWith: ["d14", "d17"],
  },
  {
    id: "d10",
    slug: "pepperoni",
    nameAr: "بيتزا بيبروني",
    nameEn: "Pepperoni",
    category: "oven",
    price: 215,
    mealUpgrade: 40,
    image: `${IMG}photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "بيبروني حار، عسل، وموتزاريلا.",
    longAr:
      "نفس العجين، بيبروني حار بيتقطع رقيق، ورشة عسل في الآخر بتوازن الحرارة. الموتزاريلا بتتحط قبل الخبز والنار من فوق بتعمل بقع بنية على الطرف. حار بس مش مؤلم.",
    tags: ["spicy"],
    kcal: 860,
    prepMin: 15,
    spice: 2,
    allergens: ["جلوتين", "ألبان"],
    ingredients: ["عجين", "بيبروني", "موتزاريلا", "عسل", "فلفل حار"],
    pairsWith: ["d13", "d18"],
  },
  {
    id: "d11",
    slug: "rosemary-focaccia",
    nameAr: "فوكاتشيا روزماري",
    nameEn: "Rosemary Focaccia",
    category: "oven",
    price: 95,
    mealUpgrade: 0,
    image: `${IMG}photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "عجين مبلول زيت زيتون وملح خشن.",
    longAr:
      "قطعة فوكاتشيا من نفس عجين البيتزا، مدهونة زيت زيتون ومرشوشة روزماري وملح خشن. بتتقدم دافية، وبتنفع تتغمس في طحينة أو صوص الطماطم.",
    tags: ["veg"],
    kcal: 320,
    prepMin: 10,
    spice: 0,
    allergens: ["جلوتين"],
    ingredients: ["عجين", "زيت زيتون", "روزماري", "ملح خشن"],
    pairsWith: ["d12", "d15"],
  },
  {
    id: "d12",
    slug: "hummus",
    nameAr: "حمص بالطحينة",
    nameEn: "Hummus",
    category: "sides",
    price: 55,
    image: `${IMG}photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "حمص مسلوق يومه، ليمون، وكمون.",
    longAr:
      "حمص بيتسلق من الصبح، بيتضرب مع طحينة وليمون وكمون. زيت زيتون ورشة بابريكا على الوش. بيتقدم مع خبز بلدي.",
    tags: ["veg", "gf"],
    kcal: 240,
    prepMin: 5,
    spice: 0,
    allergens: ["سمسم"],
    ingredients: ["حمص", "طحينة", "ليمون", "كمون", "زيت زيتون"],
    pairsWith: ["d03", "d11"],
  },
  {
    id: "d13",
    slug: "rosemary-fries",
    nameAr: "بطاطس بالروزماري",
    nameEn: "Rosemary Fries",
    category: "sides",
    price: 65,
    image: `${IMG}photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "بطاطس مقطعة بالسكينة، روزماري، وملح بحري.",
    longAr:
      "بطاطس بتتقطع بالسكينة مش بالمقص، بتتسلق ٤ دقايق وبتقلي مرتين عشان تبقى مقرمشة من برّه وطرية من جوّه. روزماري طازة وملح بحري في الآخر.",
    tags: ["veg", "gf"],
    kcal: 310,
    prepMin: 8,
    spice: 0,
    allergens: [],
    ingredients: ["بطاطس", "روزماري", "ملح بحري", "زيت"],
    pairsWith: ["d01", "d02"],
  },
  {
    id: "d14",
    slug: "tomato-basil-salad",
    nameAr: "سلطة طماطم وريحان",
    nameEn: "Tomato & Basil",
    category: "sides",
    price: 70,
    image: `${IMG}photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "طماطم بلدي، ريحان، وزيت زيتون.",
    longAr:
      "طماطم بلدي بتتقطع باليد، ريحان طازة، وبصل أحمر رقيق. زيت زيتون وليمون وملح. بنعملها على آخر لحظة عشان الطماطم ماتسيبش مية.",
    tags: ["veg", "gf"],
    kcal: 120,
    prepMin: 5,
    spice: 0,
    allergens: [],
    ingredients: ["طماطم", "ريحان", "بصل أحمر", "زيت زيتون", "ليمون"],
    pairsWith: ["d04", "d09"],
  },
  {
    id: "d15",
    slug: "green-salad",
    nameAr: "سلطة خضراء بالليمون",
    nameEn: "Green Salad",
    category: "sides",
    price: 60,
    image: `${IMG}photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "خس، خيار، وليمون متبل في الآخر.",
    longAr:
      "خس آيسبرج وخيار وبروكلي نيء رقيق. التتبيلة ليمون وزيت زيتون وخردل بحبة صغيرة. خفيفة، وبتنفع مع الستيك والريش.",
    tags: ["veg", "gf"],
    kcal: 110,
    prepMin: 5,
    spice: 0,
    allergens: ["خردل"],
    ingredients: ["خس", "خيار", "بروكلي", "ليمون", "زيت زيتون", "خردل"],
    pairsWith: ["d06", "d04"],
  },
  {
    id: "d16",
    slug: "basque-cheesecake",
    nameAr: "تشيز كيك",
    nameEn: "Basque Cheesecake",
    category: "dessert",
    price: 95,
    image: `${IMG}photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80`,
    shortAr: "وش محروق، جوّه سايل شوية.",
    longAr:
      "تشيز كيك على الطريقة الباسكية: بيتخبز على حرارة عالية عشان الوش يغمق، والوسط يفضل سايل شوية. كريمي ومالح خفيف، مش حلو زيادة.",
    tags: ["veg"],
    kcal: 420,
    prepMin: 5,
    spice: 0,
    allergens: ["ألبان", "بيض", "جلوتين"],
    ingredients: ["جبنة كريمية", "بيض", "سكر", "كريمة"],
    pairsWith: ["d17"],
  },
  {
    id: "d17",
    slug: "mint-lemonade",
    nameAr: "ليموناضة نعناع",
    nameEn: "Mint Lemonade",
    category: "drinks",
    price: 45,
    shortAr: "ليمون بلدي ونعناع طازة، بتتعصر عند الطلب.",
    longAr:
      "ليمون بلدي بيتعصر عند الطلب مع نعناع طازة وسكر خفيف. بتتقدم في كوب ٤٠٠ مل مع تلج.",
    tags: ["veg", "gf"],
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1200&q=80",
    prepMin: 3,
    spice: 0,
    allergens: [],
    ingredients: ["ليمون", "نعناع", "سكر"],
    pairsWith: ["d01", "d09"],
  },
  {
    id: "d18",
    slug: "cola",
    nameAr: "كولا",
    nameEn: "Cola",
    category: "drinks",
    price: 30,
    shortAr: "٣٣٠ مل، بتتقدم ساقعة مع تلج.",
    longAr: "كولا ٣٣٠ مل، بتتقدم ساقعة.",
    tags: [],
    image:
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1200&q=80",
    prepMin: 1,
    spice: 0,
    allergens: [],
    ingredients: ["كولا"],
    pairsWith: ["d02", "d10"],
  },
  {
    id: "d19",
    slug: "water",
    nameAr: "مياه معدنية",
    nameEn: "Water",
    category: "drinks",
    price: 20,
    shortAr: "٦٠٠ مل مياه معدنية ساقعة.",
    longAr: "مياه معدنية ٦٠٠ مل.",
    tags: [],
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80",
    prepMin: 1,
    spice: 0,
    allergens: [],
    ingredients: ["مياه"],
    pairsWith: [],
  },
];

export const getDish = (slug: string) => dishes.find((d) => d.slug === slug);

export const getDishesByCategory = (category: string) =>
  dishes.filter((d) => d.category === category);

export const bestsellers = dishes.filter((d) => d.tags.includes("bestseller"));

export const featured = ["d01", "d07", "d09", "d13"].map(
  (id) => dishes.find((d) => d.id === id)!,
);

export const counterDishes = (category: CategoryId) =>
  dishes.filter((d) => d.category === category).length;

export const menuCounts = categories.map((c) => ({
  ...c,
  count: dishes.filter((d) => d.category === c.id).length,
}));
