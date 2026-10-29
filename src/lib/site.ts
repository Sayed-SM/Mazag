export const site = {
  nameAr: "أكله بمزاج",
  nameEn: "Mazag",
  tagline: "تلات مناقل. مطبخ واحد.",
  descriptor: "مطبخ توصيل · المهندسين",
  phoneDisplay: "0100 123 4567",
  phone: "201001234567",
  email: "hello@mazag.eg",
  address: "١٢ شارع سوريا، المهندسين، الجيزة",
  addressShort: "المهندسين · الجيزة",
  hours: "كل يوم من ١٢ الظهر لـ ٢ بعد منتصف الليل",
  kitchenNote: "بنطبخ بعد ما تطلب — مفيش فريزر ولا تسخين.",
  minOrder: 150,
  freeDeliveryFrom: 400,
  social: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },
};

export type DeliveryZone = {
  id: "near" | "giza" | "cairo" | "far";
  label: string;
  areas: string;
  fee: number;
  eta: string;
};

export const deliveryZones: DeliveryZone[] = [
  {
    id: "near",
    label: "المهندسين والزمالك",
    areas: "المهندسين، الزمالك، العجوزة، الدقي",
    fee: 30,
    eta: "٣٠–٤٠ دقيقة",
  },
  {
    id: "giza",
    label: "الجيزة ووسط البلد",
    areas: "الجيزة، وسط البلد، جاردن سيتي، السيدة زينب",
    fee: 45,
    eta: "٣٥–٤٥ دقيقة",
  },
  {
    id: "cairo",
    label: "القاهرة الكبرى",
    areas: "مدينة نصر، مصر الجديدة، المعادي، شبرا، المقطم",
    fee: 60,
    eta: "٤٥–٦٠ دقيقة",
  },
  {
    id: "far",
    label: "الأطراف",
    areas: "٦ أكتوبر، الشيخ زايد، القاهرة الجديدة، حلوان",
    fee: 75,
    eta: "٥٠–٧٠ دقيقة",
  },
];

export const nav = [
  { href: "/menu", label: "المنيو" },
  { href: "/offers", label: "عروض الوجبات" },
  { href: "/about", label: "المطبخ" },
  { href: "/journal", label: "دفتر المطبخ" },
  { href: "/faq", label: "أسئلة" },
];
